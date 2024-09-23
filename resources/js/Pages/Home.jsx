import BaseLayout from '../Layout/BaseLayout';
import { Head, usePage } from '@inertiajs/react';
import Panel from '../Components/Panel.jsx';

function Home() {
    const { auth } = usePage().props;

    return (
        <>
            <Head title='Home' />
            <Panel>
                <h1 className='text-3xl'>Welcome</h1>
                {auth.user ? (
                    <p>Hi {auth.user.name}</p>
                ) : (
                    <p>No authenticated user, please login</p>
                )}
            </Panel>
        </>
    );
}

Home.layout = (page) => <BaseLayout children={page} />;

export default Home;
