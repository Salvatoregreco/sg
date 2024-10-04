import BaseLayout from '../../Layout/BaseLayout.jsx';
import { Head, usePage, useForm, router } from '@inertiajs/react';
import Panel from '../../Components/Panel.jsx';
import TitleBar from '../../Components/TitleBar.jsx';
import Alert from '../../Components/Alert.jsx';
import Switch from '../../Components/form/Switch.jsx';
import TextInput from '../../Components/form/TextInput.jsx';
import EmailInput from '../../Components/form/EmailInput.jsx';
import Form from '../../Components/form/Form.jsx';

function Edit() {
    const { user, flash } = usePage().props;

    const { put, processing, errors, clearErrors, data, setData } = useForm({
        name: user.name || '',
        lastname: user.lastname || '',
        email: user.email || '',
        phone: user.phone || '',
        status: user.status || 'N',
    });

    function handleSubmit(e) {
        e.preventDefault();
        clearErrors();
        put(route('users.update', user));
    }

    function handleCancel(e) {
        e.preventDefault();
        router.get(route('users.index'));
    }

    return (
        <>
            <Head title={`${user.name} ${user.lastname}`} />
            <TitleBar>{`${user.name} ${user.lastname}`}</TitleBar>
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
                        label='Lastname'
                        name='lastname'
                        value={data.lastname}
                        onChange={setData}
                    />
                    <EmailInput
                        label='Email'
                        name='email'
                        value={data.email}
                        onChange={setData}
                    />
                    <TextInput
                        label='Phone'
                        name='phone'
                        value={data.phone}
                        onChange={setData}
                    />
                    <Switch
                        label='Status'
                        name='status'
                        value={data.status}
                        onChange={setData}
                    />
                </Form>
            </Panel>
        </>
    );
}

Edit.layout = (page) => <BaseLayout children={page} />;

export default Edit;
