import BaseLayout from '@Layout/BaseLayout.jsx';
import { Head, usePage, Link } from '@inertiajs/react';
import Panel from '@components/Panel.jsx';
import DataTable from '@components/Table/DataTable.jsx';
import TitleBar from '@components/TitleBar.jsx';
import Alert from '@components/Alert.jsx';

function Submodules() {
    const {
        DataTable: { data: submodules, columns, filters, formAction },
        flash,
    } = usePage().props;

    return (
        <>
            <Head title='Sotto moduli' />
            <TitleBar>Sotto moduli</TitleBar>

            <Panel>
                <Alert type={flash} />
                <DataTable
                    data={submodules}
                    columns={columns}
                    filters={filters}
                    formAction={formAction}
                />
            </Panel>
        </>
    );
}

Submodules.layout = (page) => <BaseLayout children={page} />;

export default Submodules;
