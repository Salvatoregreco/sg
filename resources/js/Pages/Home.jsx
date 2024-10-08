import BaseLayout from '../Layout/BaseLayout';
import { Head, usePage } from '@inertiajs/react';
import Panel from '../Components/Panel.jsx';
import TitleBar from '../Components/TitleBar.jsx';

function Home() {
    const { auth } = usePage().props;

    return (
        <>
            <Head title='Dashboard' />
            <TitleBar>Dashboard</TitleBar>
            <Panel>
                <h1 className='text-3xl'>Welcome</h1>
                {auth.user ? <p>Hi, {auth.user.name}</p> : null}
            </Panel>
        </>
    );
}

Home.layout = (page) => <BaseLayout children={page} />;

export default Home;
