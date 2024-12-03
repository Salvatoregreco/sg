import BaseLayout from '@Layout/BaseLayout.jsx';
import { Head, usePage, useForm, router } from '@inertiajs/react';
import Panel from '@components/Panel.jsx';
import TitleBar from '@components/TitleBar.jsx';
import Alert from '@components/Alert.jsx';
import Switch from '@components/Form/Switch.jsx';
import TextInput from '@components/Form/TextInput.jsx';
import Form from '@components/Form/Form.jsx';

function Create() {
    const { flash } = usePage().props;

    const { post, processing, errors, clearErrors, data, setData } = useForm({
        label: '',
        path: '',
        status: false,
        position: 0,
        permission_name: '',
    });

    function handleSubmit(e) {
        e.preventDefault();
        clearErrors();
        post(route('submodules.store')); // TODO
    }

    function handleCancel(e) {
        e.preventDefault();
        router.get(route('modules.index'));
    }

    return (
        <>
            <Head title='Nuovo sotto modulo' />
            <TitleBar>Nuovo sotto modulo</TitleBar>
            <Panel>
                <Alert type={flash} />

                <Form
                    onSubmit={handleSubmit}
                    errors={errors}
                    processing={processing}
                    onCancel={handleCancel}>
                    <TextInput
                        label='Label'
                        name='label'
                        value={data.label}
                        onChange={setData}
                    />
                    <TextInput
                        label='Path (eg: posts)'
                        name='path'
                        value={data.path}
                        onChange={setData}
                    />
                    {/* TODO: creare componente per la gestione della posizione */}
                    <TextInput
                        label='Posizione'
                        name='position'
                        value={data.position}
                        onChange={setData}
                    />
                    <TextInput
                        label='Permesso'
                        name='permission_name'
                        value={data.permission_name}
                        onChange={setData}
                    />
                    <Switch
                        label='Stato'
                        name='status'
                        value={data.status}
                        onChange={setData}
                    />
                </Form>
            </Panel>
        </>
    );
}

Create.layout = (page) => <BaseLayout children={page} />;

export default Create;
