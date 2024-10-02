import BaseLayout from '../../Layout/BaseLayout.jsx';
import { Head, usePage } from '@inertiajs/react';
import Panel from '../../Components/Panel.jsx';
import DataTable from '../../Components/Table/DataTable.jsx';
import TitleBar from '../../Components/TitleBar.jsx';
import Alert from '../../Components/Alert.jsx';

/**
 * Users page
 *
 * @param {Object} props - Component props
 * @prop {Object} DataTable - Props for the DataTable component
 * @prop {Array} DataTable.data - Array of user data objects
 * @prop {Array} DataTable.columns - Array of column definitions
 * @prop {Object} DataTable.filters - Object containing filter state
 * @prop {String} DataTable.formAction - URL for submitting the filter form
 * @prop {String} flash - Type of flash message to show
 *
 * @returns {ReactElement} Page component
 */
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
