import React, { useState } from 'react';
import { Link, usePage, router } from '@inertiajs/react';
import Logo from './Logo.jsx';

const Sidebar = ({ isOpen }) => {
    const logo = `https://raw.githubusercontent.com/laravel/art/master/logo-lockup/5%20SVG/2%20CMYK/1%20Full%20Color/laravel-logolockup-cmyk-red.svg`;
    const { navigation } = usePage().props.auth;
    const [openModuleId, setOpenModuleId] = useState(null);

    const handleModuleClick = (module) => {
        if (module.submodules && module.submodules.length > 0) {
            if (openModuleId === module.id) {
                setOpenModuleId(null);
            } else {
                setOpenModuleId(module.id);
            }
        } else {
            setOpenModuleId(null);
            router.visit(module.base_path);
        }
    };

    return (
        <aside
            className={`fixed inset-y-0 left-0 z-30 w-64 bg-sg text-sg_secondary-600 font-normal shadow-right transform transition-transform duration-300 ${
                isOpen ? 'translate-x-0' : '-translate-x-full'
            }`}>
            <nav>
                <div className='px-4 py-2 text-center'>
                    <Logo
                        link={'/'}
                        imgPath={logo}
                        alt='Logo'
                        width={180}
                    />
                </div>
                {navigation.map((module) => (
                    <div key={module.id}>
                        <div
                            className='flex items-center gap-3 px-4 py-2 cursor-pointer'
                            onClick={() => handleModuleClick(module)}>
                            <div className='flex items-center'>
                                {module.icon && <i className={`${module.icon} mr-2`}></i>}
                                <span className='font-medium text-sm'>{module.label}</span>
                            </div>
                            {module.submodules && module.submodules.length > 0 && (
                                <i
                                    className={`bi bi-caret-right-fill transform transition-transform ${
                                        openModuleId === module.id ? 'rotate-90' : ''
                                    }`}></i>
                            )}
                        </div>
                        {openModuleId === module.id &&
                            module.submodules &&
                            module.submodules.length > 0 && (
                                <div className='pl-6'>
                                    {module.submodules.map((submodule) => (
                                        <Link
                                            href={module.base_path + '/' + submodule.path}
                                            key={submodule.id}
                                            className='block px-4 py-2 text-sm'>
                                            {submodule.label}
                                        </Link>
                                    ))}
                                </div>
                            )}
                    </div>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
