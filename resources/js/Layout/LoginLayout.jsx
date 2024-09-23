export default function LoginLayout({ children }) {
    return (
        <>
            <div className='flex flex-col justify-center bg-slate-100 p-4 min-h-screen text-center align-middle'>
                <main>
                    <div className='mx-auto py-6 container'>{children}</div>
                </main>
            </div>
        </>
    );
}
