import './bootstrap';
import '../css/app.css';
import { createInertiaApp, router } from '@inertiajs/react';
import { createRoot } from 'react-dom/client';
import { useState, useEffect } from 'react';
import PageLoading from '@components/PageLoding.jsx';

createInertiaApp({
    resolve: (name) => {
        const pages = import.meta.glob('./Pages/**/*.jsx', { eager: true });
        return pages[`./Pages/${name}.jsx`];
    },
    setup({ el, App, props }) {
        const Root = () => {
            const [isPageLoading, setIsPageLoading] = useState(false);

            useEffect(() => {
                const handleStart = (event) => {
                    const { visit } = event.detail;
                    const isPartialReload =
                        visit.headers && visit.headers['X-Inertia-Partial-Component'];
                    if (!isPartialReload) setIsPageLoading(true);
                };

                const handleFinish = () => {
                    setIsPageLoading(false);
                };

                router.on('start', handleStart);
                router.on('finish', handleFinish);

                return () => {
                    router.off('start', handleStart);
                    router.off('finish', handleFinish);
                };
            }, []);

            return (
                <>
                    <App {...props} />
                    <PageLoading isPageLoading={isPageLoading} />
                </>
            );
        };

        createRoot(el).render(<Root />);
    },
    progress: false,
});
