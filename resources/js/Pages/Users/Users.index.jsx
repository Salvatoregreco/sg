import BaseLayout from '@Layout/BaseLayout.jsx';
import { Head, usePage } from '@inertiajs/react';
import Panel from '@components/Panel.jsx';
import DataTable from '@components/Table/DataTable.jsx';
import TitleBar from '@components/TitleBar.jsx';
import Alert from '@components/Alert.jsx';

function Users() {
    const {
        DataTable: { data: users, columns, filters, formAction },
        flash,
    } = usePage().props;

    return (
        <>
            <Head title='Users' />
            <TitleBar>Users</TitleBar>
            <Panel>
                <Alert type={flash} />
                <DataTable
                    data={users}
                    columns={columns}
                    filters={filters}
                    formAction={formAction}
                />
            </Panel>
        </>
    );
}

Users.layout = (page) => <BaseLayout children={page} />;

export default Users;
