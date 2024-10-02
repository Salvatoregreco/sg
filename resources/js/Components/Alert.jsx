import {
    ExclamationCircleIcon,
    CheckCircleIcon,
    InformationCircleIcon,
    ExclamationTriangleIcon,
} from '@heroicons/react/16/solid';
import { useState, useEffect } from 'react';
import 'animate.css';

const Alert = ({ type }) => {
    const [visible, setVisible] = useState(false);
    const [animationClass, setAnimationClass] = useState('');

    useEffect(() => {
        if (type && (type.error || type.success || type.warning || type.info)) {
            setVisible(true);

            const timer = setTimeout(() => {
                setAnimationClass('animate__fadeOut');
            }, 3000);

            const removeTimer = setTimeout(() => {
                setVisible(false);
                setAnimationClass('');
            }, 3500);

            return () => {
                clearTimeout(timer);
                clearTimeout(removeTimer);
            };
        }
    }, [type]);

    let t = null;
    let msg = '';

    if (type?.error) {
        t = 'error';
        msg = type.error;
    }
    if (type?.success) {
        t = 'success';
        msg = type.success;
    }
    if (type?.warning) {
        t = 'warning';
        msg = type.warning;
    }
    if (type?.info) {
        t = 'info';
        msg = type.info;
    }

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

    const IconComponent = typeIcons[t] || null;

    return (
        visible &&
        t && (
            <div
                className={`${typeClasses[t]} absolute right-2 top-2 flex items-center animate__animated ${animationClass}`}>
                {IconComponent && (
                    <IconComponent
                        width={20}
                        height={20}
                        className='inline mr-2'
                    />
                )}
                <span>{msg}</span>
            </div>
        )
    );
};

export default Alert;
