import { Link } from '@inertiajs/react';

const CreateButton = ({ method = 'get', createRoute, title = 'Create', className = '' }) => {
    if (className === '')
        className = 'bg-green-600 hover:opacity-75 p-1 rounded-full transition-opacity';

    return (
        <Link
            title={title}
            className={className}
            href={route(createRoute)}
            method={method}
            as='button'>
            <i className='inline-block w-6 h-6 text-white bi bi-plus-lg'></i>
        </Link>
    );
};

export default CreateButton;
