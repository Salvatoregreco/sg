import BaseLayout from '../../Layout/BaseLayout.jsx';
import { Head, usePage, useForm, router } from '@inertiajs/react';
import Panel from '@components/Panel.jsx';
import TitleBar from '@components/TitleBar.jsx';
import Alert from '@components/Alert.jsx';
import Switch from '@components/Form/Switch.jsx';
import TextInput from '@components/Form/TextInput.jsx';
import Form from '@components/Form/Form.jsx';

function Edit() {
    const { module, flash } = usePage().props;

    const { put, processing, errors, clearErrors, data, setData } = useForm({
        name: module.name || '',
        label: module.label || '',
        icon: module.icon || '',
        base_path: module.base_path || '',
        status: module.status || false,
        position: module.position || 0,
        permission_name: module.permission_name || '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        clearErrors();
        put(route('modules.update', module));
    }

    function handleCancel(e) {
        e.preventDefault();
        router.get(route('modules.index'));
    }

    return (
        <>
            <Head title={`${module.label}`} />
            <TitleBar>{`${module.label}`}</TitleBar>
            <Panel>
                <Alert type={flash} />

                <Form
                    onSubmit={handleSubmit}
                    errors={errors}
                    processing={processing}
                    onCancel={handleCancel}>
                    <TextInput
                        label='Name'
                        name='name'
                        value={data.name}
                        onChange={setData}
                    />
                    <TextInput
                        label='Label'
                        name='label'
                        value={data.label}
                        onChange={setData}
                    />
                    <TextInput
                        label='Icon (eg: fa fa-user)'
                        name='icon'
                        value={data.icon}
                        onChange={setData}
                    />
                    <TextInput
                        label='Base Path (eg: modules)'
                        name='base_path'
                        value={data.base_path}
                        onChange={setData}
                    />
                    <Switch
                        label='Status'
                        name='status'
                        value={data.status}
                        onChange={setData}
                    />
                    {/* TODO: creare componente per la gestione della posizione */}
                    <TextInput
                        label='Position'
                        name='position'
                        value={data.position}
                        onChange={setData}
                    />
                    <TextInput
                        label='Permission Name'
                        name='permission_name'
                        value={data.permission_name}
                        onChange={setData}
                    />
                </Form>
            </Panel>
        </>
    );
}

Edit.layout = (page) => <BaseLayout children={page} />;

export default Edit;
