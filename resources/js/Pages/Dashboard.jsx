import BaseLayout from '../Layout/BaseLayout.jsx';
import { Head, usePage } from '@inertiajs/react';
import Panel from '../Components/Panel.jsx';
import TitleBar from '../Components/TitleBar.jsx';

function Dashboard() {
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

Dashboard.layout = (page) => <BaseLayout children={page} />;

export default Dashboard;
