const Form = ({ children, className = '', onSubmit, onCancel, errors, processing }) => {
    return (
        <form
            className={`space-y-6 ${className}`}
            autoComplete='off'
            onSubmit={onSubmit}>
            <div className='flex flex-wrap -mx-2'>{children}</div>
            <div className='flex justify-end gap-2'>
                <button
                    disabled={processing}
                    className='bg-sg px-4 py-2 rounded-md text-white'
                    type='submit'>
                    {processing ? 'Saving...' : 'Save'}
                </button>
                <button
                    onClick={onCancel}
                    disabled={processing}
                    className='bg-slate-500 px-4 py-2 rounded-md text-white'
                    type='button'>
                    Cancel
                </button>
            </div>
        </form>
    );
};

export default Form;
