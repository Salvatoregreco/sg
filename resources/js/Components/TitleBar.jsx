const TitleBar = ({ children }) => {
    return (
        <div className='bg-white shadow-sm -mx-2 -mt-2 px-6 py-2'>
            <h1 className='text-xl'>{children}</h1>
        </div>
    );
};

export default TitleBar;
