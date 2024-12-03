import BaseLayout from '@Layout/BaseLayout.jsx';
import { Head, usePage, Link } from '@inertiajs/react';
import Panel from '@components/Panel.jsx';
import DataTable from '@components/Table/DataTable.jsx';
import TitleBar from '@components/TitleBar.jsx';
import Alert from '@components/Alert.jsx';
import Toolbar from '@components/Toolbar.jsx';

function Modules() {
    const {
        DataTable: { data: modules, columns, filters, formAction },
        flash,
    } = usePage().props;

    return (
        <>
            <Head title='Moduli' />
            <TitleBar>Moduli</TitleBar>

            <Toolbar>
                <Link
                    title='Sottomoduli'
                    className='bg-sg-600 hover:opacity-75 px-2 py-1 rounded-md text-white transition-opacity'
                    href={route('submodules.index')}
                    method='get'
                    as='button'>
                    Sottomoduli
                </Link>
                <Link
                    title='Nuovo sotto modulo'
                    className='bg-green-600 hover:opacity-75 px-2 py-1 rounded-md text-white transition-opacity'
                    href={route('submodules.create')}
                    method='get'
                    as='button'>
                    Nuovo sotto modulo
                </Link>
            </Toolbar>

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
