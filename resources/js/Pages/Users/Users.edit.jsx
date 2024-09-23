import BaseLayout from '../../Layout/BaseLayout.jsx';
import { Head, usePage } from '@inertiajs/react';
import Panel from '../../Components/Panel.jsx';

function Edit() {
    const { user } = usePage().props;

    return (
        <>
            <Head title={`Edit ${user.name} ${user.lastname}`} />
            <Panel>
                <h2 className='mb-3 text-2xl'>
                    User: {user.name} {user.lastname}
                </h2>
            </Panel>
        </>
    );
}

Edit.layout = (page) => <BaseLayout children={page} />;

export default Edit;
