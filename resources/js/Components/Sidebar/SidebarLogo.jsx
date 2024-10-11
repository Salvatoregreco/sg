import React from 'react';
import { Link } from '@inertiajs/react';

const SidebarLogo = ({ link, imgPath, alt, width, onClick }) => {
    return (
        <div className='px-4 py-2 text-center'>
            <Link
                href={link}
                onClick={onClick}>
                <img
                    src={imgPath}
                    alt={alt}
                    width={width}
                />
            </Link>
        </div>
    );
};

export default SidebarLogo;
