import { Link } from '@inertiajs/react';

const Logo = ({ link, imgPath, alt, width }) => {
    return (
        <Link href={link}>
            <img
                className='inline-block h-auto'
                src={imgPath}
                alt={alt}
                width={width}
            />
        </Link>
    );
};

export default Logo;
