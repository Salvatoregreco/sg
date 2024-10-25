import BaseLayout from '@Layout/BaseLayout.jsx';
import { Head, usePage } from '@inertiajs/react';
import Panel from '@components/Panel.jsx';
import DataTable from '@components/Table/DataTable.jsx';
import TitleBar from '@components/TitleBar.jsx';
import Alert from '@components/Alert.jsx';

function Modules() {
    const {
        DataTable: { data: modules, columns, filters, formAction },
        flash,
    } = usePage().props;

    return (
        <>
            <Head title='Modules' />
            <TitleBar>Modules</TitleBar>
            <Panel>
                <Alert type={flash} />
                <DataTable
                    data={modules}
                    columns={columns}
                    filters={filters}
                    formAction={formAction}
                />
            </Panel>
        </>
    );
}

Modules.layout = (page) => <BaseLayout children={page} />;

export default Modules;
