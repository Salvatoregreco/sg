const Toolbar = ({ children }) => {
    return (
        <div
            className='flex justify-center'
            style={{ marginTop: '1px' }}>
            <div className='inline-flex gap-2 bg-white shadow-sm px-2 py-2'>{children}</div>
        </div>
    );
};

export default Toolbar;
