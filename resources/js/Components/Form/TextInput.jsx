function TextInput({ label, name, value, onChange }) {
    return (
        <div className='mb-4 px-2 w-full md:w-1/2 lg:w-1/4'>
            <label
                htmlFor={name}
                className='block mb-2 font-medium text-gray-700 text-sm'>
                {label}
            </label>
            <input
                type='text'
                name={name}
                id={name}
                value={value}
                onChange={(e) => onChange(e.target.name, e.target.value)}
                className='border-gray-300 focus:border-sg-500 shadow-sm px-3 py-2 border rounded-md focus:ring-sg-500 w-full focus:outline-none'
            />
        </div>
    );
}

export default TextInput;
