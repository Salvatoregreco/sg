import React from 'react';
import { Link } from '@inertiajs/react';
import SidebarSubmodule from './SidebarSubmodule';

const SidebarModule = ({ module, isOpen, handleModuleClick }) => {
    const hasSubmodules = module.submodules && module.submodules.length > 0;

    return (
        <div>
            <div
                className={`flex items-center gap-3 px-4 py-2 cursor-pointer`}
                onClick={() => handleModuleClick(module)}>
                <div className='flex items-center'>
                    {module.icon && <i className={`${module.icon} mr-2`}></i>}
                    {hasSubmodules ? (
                        <span className='font-medium text-sm'>{module.label}</span>
                    ) : (
                        <Link
                            href={module.base_path}
                            className='font-medium text-sm'>
                            {module.label}
                        </Link>
                    )}
                </div>
                {hasSubmodules && (
                    <i
                        className={`bi bi-caret-right-fill transform transition-transform ${
                            isOpen ? 'rotate-90' : ''
                        }`}></i>
                )}
            </div>
            {isOpen && hasSubmodules && (
                <div className='pl-6'>
                    {module.submodules.map((submodule) => (
                        <SidebarSubmodule
                            key={submodule.id}
                            submodule={submodule}
                            moduleBasePath={module.base_path}
                        />
                    ))}
                </div>
            )}
        </div>
    );
};

export default SidebarModule;
