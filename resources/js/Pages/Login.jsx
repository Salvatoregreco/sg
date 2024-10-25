import LoginLayout from '@Layout/LoginLayout.jsx';
import { Head, useForm } from '@inertiajs/react';

function Login() {
    const { data, setData, post, processing, errors, reset, clearErrors } = useForm({
        email: '',
        password: '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        clearErrors();
        post(route('login'), {
            onError: () => {
                reset('password');
            },
        });
    }

    return (
        <>
            <Head title='Login' />
            <div className='bg-white shadow-md mx-auto px-4 py-10 border rounded-lg max-w-lg text-gray-800'>
                <h1 className='mb-4 text-3xl'>Logo</h1>
                <form
                    autoComplete='off'
                    method='POST'
                    onSubmit={handleSubmit}>
                    <div>
                        <input
                            type='email'
                            name='email'
                            id='email'
                            placeholder='Enter your email'
                            className='border-gray-500 form-input px-4 py-3 border rounded-full w-[300px] text-gray-800'
                            value={data.email}
                            onChange={(e) => setData('email', e.target.value)}
                        />
                    </div>
                    <div className='py-3'></div>
                    <div>
                        <input
                            type='password'
                            name='password'
                            id='password'
                            placeholder='Enter your password'
                            className='border-gray-500 form-input px-4 py-3 border rounded-full w-[300px] text-gray-800'
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                        />
                    </div>
                    <div className='py-3'></div>
                    <div>
                        <button
                            type='submit'
                            className='bg-sg shadow-md px-4 py-3 rounded-full w-[300px] text-white'
                            disabled={processing}>
                            {processing ? 'Logging in...' : 'Login'}
                        </button>
                        {Object.keys(errors).length > 0 && (
                            <div className='mx-auto mt-5 w-[300px] text-left'>
                                {errors.error && (
                                    <div className='mt-2 font-bold text-red-500'>
                                        {errors.error}
                                    </div>
                                )}
                                {errors.password && (
                                    <div className='mt-2 font-bold text-red-500'>
                                        {errors.password}
                                    </div>
                                )}
                                {errors.email && (
                                    <div className='mt-2 font-bold text-red-500'>
                                        {errors.email}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </form>
            </div>
        </>
    );
}

Login.layout = (page) => <LoginLayout children={page} />;

export default Login;
