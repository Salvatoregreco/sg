import { Link } from '@inertiajs/react';

const DeleteButton = ({
    method = 'delete',
    destroyRoute,
    item,
    title = 'Delete',
    className = '',
    headers = { 'X-Inertia-Partial-Component': 'true' },
    onBefore = () => {},
    onSuccess = () => {},
}) => {
    if (className === '')
        className = 'bg-red-600 hover:opacity-75 p-1 rounded-full transition-opacity';

    return (
        <Link
            title={title}
            className={className}
            href={route(destroyRoute, item)}
            method={method}
            as='button'
            headers={headers}
            onBefore={onBefore}
            onSuccess={onSuccess}>
            <i className='inline-block w-6 bi-trash-fill h-6 text-white bi'></i>
        </Link>
    );
};

export default DeleteButton;
