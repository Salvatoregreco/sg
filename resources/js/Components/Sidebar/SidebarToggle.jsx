const SidebarToggle = ({ onClick }) => {
    return (
        <button
            onClick={onClick}
            className='p-2 focus:outline-none'>
            <div className='relative flex flex-col justify-center items-center w-6 h-6'>
                <span className='absolute bg-sg-50 rounded w-full h-0.5 -translate-y-1.5'></span>
                <span className='absolute bg-sg-50 rounded w-4 h-0.5 self-start'></span>
                <span className='absolute bg-sg-50 rounded w-full h-0.5 translate-y-1.5'></span>
            </div>
        </button>
    );
};

export default SidebarToggle;
