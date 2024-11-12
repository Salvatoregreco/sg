import BaseLayout from '@Layout/BaseLayout.jsx';
import { Head, usePage, useForm, router } from '@inertiajs/react';
import Panel from '@components/Panel.jsx';
import TitleBar from '@components/TitleBar.jsx';
import Alert from '@components/Alert.jsx';
import Switch from '@components/Form/Switch.jsx';
import TextInput from '@components/Form/TextInput.jsx';
import Form from '@components/Form/Form.jsx';
import EmailInput from '@/Components/Form/EmailInput';
import PasswordInput from '@/Components/Form/PasswordInput';

function Create() {
    const { flash } = usePage().props;

    const { post, processing, errors, clearErrors, data, setData } = useForm({
        name: '',
        lastname: '',
        email: '',
        phone: '',
        status: false,
    });

    function handleSubmit(e) {
        e.preventDefault();
        clearErrors();
        post(route('users.store'));
    }

    function handleCancel(e) {
        e.preventDefault();
        router.get(route('users.index'));
    }

    return (
        <>
            <Head title='Create User' />
            <TitleBar>Create User</TitleBar>
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
                    <PasswordInput
                        label='Password'
                        name='password'
                        value={data.password}
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

Create.layout = (page) => <BaseLayout children={page} />;

export default Create;
