import { useState } from 'react';

const Switch = ({ label, name, value, onChange }) => {
    const [status, setStatus] = useState(value);

    const handleToggle = () => {
        const newValue = !status;
        setStatus(newValue);
        onChange(name, newValue);
    };

    return (
        <div className='mb-4 px-2 w-full md:w-1/2 lg:w-1/4'>
            <label
                htmlFor={name}
                className='block mb-2 font-medium text-gray-700 text-sm'>
                {label}
            </label>
            <div
                onClick={handleToggle}
                className={`w-14 h-8 flex items-center rounded-full p-1 cursor-pointer ${
                    status ? 'bg-green-500' : 'bg-red-500'
                }`}>
                <div
                    className={`bg-white w-6 h-6 rounded-full shadow-md transform transition-transform ${
                        status ? 'translate-x-6' : 'translate-x-0'
                    }`}></div>
            </div>
        </div>
    );
};

export default Switch;
