import { useState, useEffect } from 'react';
import 'animate.css';

const Modal = ({
    trigger,
    triggerClasses,
    size = 'medium',
    customSizeClass,
    children,
    remoteContentUrl,
    fetchContent,
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isClosing, setIsClosing] = useState(false);
    const [animationEndCount, setAnimationEndCount] = useState(0);
    const [remoteContent, setRemoteContent] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const openModal = (e) => {
        e.stopPropagation();
        setIsOpen(true);
    };

    const closeModal = () => {
        setIsClosing(true);
        setAnimationEndCount(0);
    };

    // Mappa delle dimensioni
    const sizeClasses = {
        small: 'w-1/4 h-1/4',
        medium: 'w-1/2 h-1/2',
        large: 'w-3/4 h-3/4',
        full: 'w-[90%] h-[90%]',
    };

    const modalSizeClass = customSizeClass || sizeClasses[size] || sizeClasses['medium'];

    // Determina le classi di animazione
    const animationClass = isClosing
        ? 'animate__animated animate__zoomOut animate__faster'
        : 'animate__animated animate__zoomIn animate__faster';

    const overlayAnimationClass = isClosing
        ? 'animate__animated animate__fadeOut animate__faster'
        : 'animate__animated animate__fadeIn animate__faster';

    // Renderizza il modale solo se è aperto o in fase di chiusura
    const showModal = isOpen || isClosing;

    const handleAnimationEnd = () => {
        if (isClosing) {
            setAnimationEndCount((prevCount) => {
                const newCount = prevCount + 1;
                if (newCount >= 2) {
                    setIsOpen(false);
                    setIsClosing(false);
                }
                return newCount;
            });
        }
    };

    // Effettua il fetch del contenuto remoto quando il modale viene aperto
    useEffect(() => {
        if (isOpen && (remoteContentUrl || fetchContent)) {
            setLoading(true);
            setError(null);

            const fetchData = async () => {
                try {
                    let data;
                    if (fetchContent) {
                        data = await fetchContent();
                    } else {
                        const response = await fetch(remoteContentUrl);
                        if (!response.ok) {
                            throw new Error(`Errore ${response.status}: ${response.statusText}`);
                        }
                        data = await response.text();
                    }
                    setRemoteContent(data);
                } catch (err) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            };

            fetchData();
        }
    }, [isOpen, remoteContentUrl, fetchContent]);

    return (
        <>
            {/* Elemento che apre il modale */}
            <div
                onClick={openModal}
                className={`cursor-pointer ${triggerClasses}`}>
                {trigger}
            </div>

            {/* Overlay e Modale */}
            {showModal && (
                <>
                    {/* Overlay */}
                    <div
                        className={`fixed inset-0 bg-black bg-opacity-50 z-40 ${overlayAnimationClass}`}
                        onClick={closeModal}
                        onAnimationEnd={handleAnimationEnd}></div>

                    {/* Il Modale */}
                    <div className='z-50 fixed inset-0 flex justify-center items-center'>
                        <div
                            className={`relative bg-white shadow-lg p-5 rounded-lg ${modalSizeClass} overflow-auto ${animationClass}`}
                            onClick={(e) => e.stopPropagation()}
                            onAnimationEnd={handleAnimationEnd}>
                            <button
                                className='top-2 right-2 absolute text-gray-600 hover:text-gray-800'
                                onClick={closeModal}>
                                <i className='text-2xl bi bi-x-circle'></i>
                            </button>
                            {loading && <p>Caricamento in corso...</p>}
                            {error && <p>Errore: {error}</p>}
                            {!loading && !error && remoteContent && (
                                <div dangerouslySetInnerHTML={{ __html: remoteContent }} />
                            )}
                            {!loading && !error && !remoteContent && children}
                        </div>
                    </div>
                </>
            )}
        </>
    );
};

export default Modal;
