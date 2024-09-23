import React from 'react';
import { Link } from '@inertiajs/react';
import Logo from './Logo.jsx';

const Sidebar = ({ isOpen }) => {
    const menuItems = [
        { name: 'Dashboard', href: '/', icon: 'home' },
        { name: 'Modules', href: '/modules' },
        { name: 'Users', href: '/users' },
    ];

    return (
        <aside
            className={`fixed inset-y-0 left-0 z-30 w-64 bg-sg text-sg_secondary-600 font-normal shadow-right transform transition-transform duration-300 ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>
            <nav>
                <div className='px-4 py-2 text-center'>
                    <Logo
                        link={'/'}
                        imgPath='https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg'
                        alt='Laravel Logo'
                        width={180}
                    />
                </div>
                {menuItems.map((item) => (
                    <Link
                        href={item.href}
                        key={item.name}
                        className='block px-4 py-2 text-sm'>
                        {item.name}
                    </Link>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
