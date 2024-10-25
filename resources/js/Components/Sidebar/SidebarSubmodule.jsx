import { Link } from '@inertiajs/react';

const SidebarSubmodule = ({ submodule, moduleBasePath }) => {
    return (
        <Link
            href={`/${moduleBasePath}/${submodule.path}`}
            className='block px-4 py-2 text-sm'>
            {submodule.label}
        </Link>
    );
};

export default SidebarSubmodule;
