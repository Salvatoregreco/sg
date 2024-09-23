import BaseLayout from '../Layout/BaseLayout.jsx';
import { Head, usePage } from '@inertiajs/react';
import Panel from '../Components/Panel.jsx';
import DataTable from '../Components/Table/DataTable.jsx';

function Users() {
    const {
        DataTable: { data: users, columns, filters, formAction },
    } = usePage().props;

    return (
        <>
            <Head title='Users' />
            <Panel>
                <h2 className='mb-3 text-2xl'>Users</h2>
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
