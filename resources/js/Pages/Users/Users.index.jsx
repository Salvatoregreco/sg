import BaseLayout from '../../Layout/BaseLayout.jsx';
import { Head, usePage } from '@inertiajs/react';
import Panel from '../../Components/Panel.jsx';
import DataTable from '../../Components/Table/DataTable.jsx';
import TitleBar from '../../Components/TitleBar.jsx';
import Alert from '../../Components/Alert.jsx';

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
