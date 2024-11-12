function SelectInput({ label, name, value, options, onChange, multiple = false }) {
    return (
        <div className='mb-4 px-2 w-full md:w-1/2 lg:w-1/4'>
            <label
                htmlFor={name}
                className='block mb-2 font-medium text-gray-700 text-sm'>
                {label}
            </label>
            <select
                name={name}
                id={name}
                value={value}
                onChange={(e) => {
                    const selectedValues = multiple
                        ? Array.from(e.target.selectedOptions, (option) => option.value)
                        : e.target.value;
                    onChange(e.target.name, selectedValues);
                }}
                className='border-gray-300 focus:border-sg-500 shadow-sm px-3 py-2 border rounded-md focus:ring-sg-500 w-full focus:outline-none bg-white'
                multiple={multiple}>
                {options.map((option) => (
                    <option
                        key={option.id}
                        value={option.id}>
                        {option.label}
                    </option>
                ))}
            </select>
        </div>
    );
}

export default SelectInput;
