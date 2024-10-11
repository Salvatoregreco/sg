import React, { useState } from 'react';
import { usePage } from '@inertiajs/react';
import SidebarLogo from './SidebarLogo';
import SidebarModule from './SidebarModule';

const Sidebar = ({ isOpen }) => {
    const logo = `https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg`;
    const { navigation } = usePage().props.auth;
    const [openModuleId, setOpenModuleId] = useState(null);

    const handleModuleClick = (module) => {
        if (openModuleId === module.id) {
            setOpenModuleId(null);
        } else {
            setOpenModuleId(module.id);
        }
    };

    const handleLogoClick = () => {
        setOpenModuleId(null);
    };

    return (
        <aside
            className={`fixed inset-y-0 left-0 z-30 w-64 bg-sg text-sg-50 font-normal shadow-right transform transition-transform duration-300 ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>
            <nav>
                <SidebarLogo
                    link={'/'}
                    imgPath={logo}
                    alt='Logo'
                    width={180}
                    onClick={handleLogoClick}
                />
                {navigation.map((module) => (
                    <SidebarModule
                        key={module.id}
                        module={module}
                        isOpen={openModuleId === module.id}
                        handleModuleClick={handleModuleClick}
                    />
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
