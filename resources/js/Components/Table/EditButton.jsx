import { Link } from '@inertiajs/react';

const EditButton = ({ method = 'get', editRoute, item, title = 'Edit', className = '' }) => {
    if (className === '')
        className = 'bg-sg-600 hover:opacity-75 p-1 rounded-full transition-opacity';

    return (
        <Link
            title={title}
            className={className}
            href={route(editRoute, item)}
            method={method}
            as='button'>
            <i className='inline-block w-6 h-6 text-white bi bi-pencil-fill'></i>
        </Link>
    );
};

export default EditButton;
