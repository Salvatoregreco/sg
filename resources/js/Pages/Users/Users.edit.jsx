import BaseLayout from '../../Layout/BaseLayout.jsx';
import { Head, usePage } from '@inertiajs/react';
import Panel from '../../Components/Panel.jsx';
import TitleBar from '../../Components/TitleBar.jsx';
import Alert from '../../Components/Alert.jsx';

function Edit() {
    const { user, flash } = usePage().props;

    return (
        <>
            <Head title={`${user.name} ${user.lastname}`} />
            <TitleBar>{`${user.name} ${user.lastname}`}</TitleBar>
            <Panel>
                <Alert type={flash} />
                TODO
            </Panel>
        </>
    );
}

Edit.layout = (page) => <BaseLayout children={page} />;

export default Edit;
