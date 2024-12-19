function Checkbox({ label, name, checked, onChange, dataField }) {
    if (!dataField) throw new Error('The `dataField` prop is required.');

    const handleChange = (event) => {
        const isChecked = event.target.checked;

        onChange((prevData) => {
            const updatedArray = isChecked
                ? [...prevData[dataField], name]
                : prevData[dataField].filter((id) => id !== name);

            return {
                ...prevData,
                [dataField]: updatedArray,
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
