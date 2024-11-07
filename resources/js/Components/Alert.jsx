import {
    ExclamationCircleIcon,
    CheckCircleIcon,
    InformationCircleIcon,
    ExclamationTriangleIcon,
} from '@heroicons/react/16/solid';
import { useState, useEffect } from 'react';
import { usePage } from '@inertiajs/react';
import 'animate.css';

const Alert = ({ type }) => {
    const [visible, setVisible] = useState(false);
    const [animationClass, setAnimationClass] = useState('');
    const [alertData, setAlertData] = useState(null);
    const { errors } = usePage().props;

    useEffect(() => {
        let currentAlert = { ...type };

        // Controlla se ci sono errori
        if (errors && Object.keys(errors).length > 0) {
            currentAlert = {
                ...currentAlert,
                errors,
            };
        }

        // Determina il tipo di alert e il messaggio
        let t = null;
        let msg = '';

        if (currentAlert.errors) {
            t = 'error';
            msg = processErrors(currentAlert.errors);
        } else if (currentAlert.success) {
            t = 'success';
            msg = currentAlert.success;
        } else if (currentAlert.warning) {
            t = 'warning';
            msg = currentAlert.warning;
        } else if (currentAlert.info) {
            t = 'info';
            msg = currentAlert.info;
        }

        if (t && msg) {
            setAlertData({ type: t, message: msg });
            setVisible(true);

            const timer = setTimeout(() => {
                setAnimationClass('animate__fadeOut');
            }, 3000);

            const removeTimer = setTimeout(() => {
                setVisible(false);
                setAnimationClass('');
                setAlertData(null);
            }, 3500);

            return () => {
                clearTimeout(timer);
                clearTimeout(removeTimer);
            };
        }
    }, [type, errors]);

    const processErrors = (errors) => {
        return Object.values(errors).map((error, index) => <div key={index}>{error}</div>);
    };

    if (!alertData || !visible) {
        return null;
    }

    const { type: alertType, message } = alertData;

    const typeClasses = {
        error: 'bg-red-200 mb-2 p-4 border border-red-600 rounded max-w-[350px] text-red-700',
        success:
            'bg-green-200 mb-2 p-4 border border-green-600 rounded max-w-[350px] text-green-700',
        warning:
            'bg-yellow-200 mb-2 p-4 border border-yellow-600 rounded max-w-[350px] text-yellow-700',
        info: 'bg-blue-200 mb-2 p-4 border border-blue-600 rounded max-w-[350px] text-blue-700',
    };

    const typeIcons = {
        error: ExclamationCircleIcon,
        success: CheckCircleIcon,
        warning: ExclamationTriangleIcon,
        info: InformationCircleIcon,
    };

    const IconComponent = typeIcons[alertType] || null;

    return (
        <div
            className={`${typeClasses[alertType]} absolute right-2 top-2 flex items-center animate__animated ${animationClass} z-10`}>
            {IconComponent && (
                <IconComponent
                    width={20}
                    height={20}
                    className='inline mr-2'
                />
            )}
            <span>{message}</span>
        </div>
    );
};

export default Alert;
