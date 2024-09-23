import BaseLayout from '../Layout/BaseLayout';
import { Head, usePage } from '@inertiajs/react';
import Panel from '../Components/Panel.jsx';
import DataTable from '../Components/Table/DataTable.jsx';

function Modules() {
    const {
        DataTable: { data: modules, columns, filters, formAction },
    } = usePage().props;

    return (
        <>
            <Head title='Modules' />
            <Panel>
                <h2 className='mb-3 text-2xl'>Modules</h2>
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
