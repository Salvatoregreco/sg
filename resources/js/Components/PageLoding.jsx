import { SyncLoader } from 'react-spinners';

const PageLoading = ({ isPageLoading }) => {
    if (!isPageLoading) return null;

    return (
        <div className='z-50 fixed inset-0 flex justify-center items-center bg-white bg-opacity-75'>
            <SyncLoader
                color='#1D4ED8'
                size={15}
            />
        </div>
    );
};

export default PageLoading;
