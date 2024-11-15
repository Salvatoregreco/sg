function Checkbox({ label, name, checked, onChange }) {
    const handleChange = (event) => {
        const isChecked = event.target.checked;

        onChange((prevData) => {
            const updatedSubmodules = isChecked
                ? [...prevData.submodules, name]
                : prevData.submodules.filter((id) => id !== name);

            return {
                ...prevData,
                submodules: updatedSubmodules,
            };
        });
    };

    return (
        <div className='flex items-center mb-2'>
            <input
                type='checkbox'
                id={name}
                checked={checked}
                onChange={handleChange}
                className='border-gray-300 focus:border-sg-500 shadow-sm rounded focus:ring-sg-500'
            />
            <label
                htmlFor={name}
                className='ml-2 text-gray-700'>
                {label}
            </label>
        </div>
    );
}

export default Checkbox;
