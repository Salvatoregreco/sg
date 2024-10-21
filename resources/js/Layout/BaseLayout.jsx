import { Link, usePage } from '@inertiajs/react';
import Sidebar from '@components/Sidebar/Sidebar.jsx';
import SidebarToggle from '@components/Sidebar/SidebarToggle.jsx';
import { useState } from 'react';

export default function BaseLayout({ children }) {
    const { auth } = usePage().props;
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <div className='relative flex h-screen overflow-hidden'>
            <Sidebar isOpen={isSidebarOpen} />

            <div
                className={`flex-1 flex flex-col transition-all duration-300 ${
                    isSidebarOpen ? 'ml-64' : 'ml-0'
                }`}>
                <header className='bg-sg shadow-md px-6 py-4 text-sg-50'>
                    <div className='flex justify-between items-center gap-5 mx-auto'>
                        <SidebarToggle onClick={toggleSidebar} />
                        <div className='flex items-center gap-3'>
                            {auth.user ? <p>Logged in as: {auth.user.name}</p> : null}
                            {auth.user ? (
                                <Link href='/logout'>Logout</Link>
                            ) : (
                                <Link href='/login'>Login</Link>
                            )}
                        </div>
                    </div>
                </header>
                <main className='flex-1 bg-slate-200 p-2 min-h-0 overflow-y-auto'>
                    <div
                        id='page-content'
                        className='min-h-full'>
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
