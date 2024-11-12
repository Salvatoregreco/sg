import BaseLayout from '@Layout/BaseLayout.jsx';
import { Head, usePage, useForm, router } from '@inertiajs/react';
import Panel from '@components/Panel.jsx';
import TitleBar from '@components/TitleBar.jsx';
import Alert from '@components/Alert.jsx';
import Switch from '@components/Form/Switch.jsx';
import TextInput from '@components/Form/TextInput.jsx';
import EmailInput from '@components/Form/EmailInput.jsx';
import SelectInput from '@components/Form/SelectInput.jsx';
import Form from '@components/Form/Form.jsx';
import HiddenInput from '@/Components/Form/HiddenInput';

function Edit() {
    const { user, roles, permissions, flash } = usePage().props;

    // Stato e handler per il primo form (dati utente)
    const {
        put: putUserData,
        processing: processingUserData,
        errors: errorsUserData,
        clearErrors: clearErrorsUserData,
        data: userData,
        setData: setUserData,
    } = useForm({
        op: 'userData',
        name: user.name || '',
        lastname: user.lastname || '',
        email: user.email || '',
        phone: user.phone || '',
        status: user.status || false,
    });

    // Stato e handler per il secondo form (ruoli e permessi)
    const {
        put: putRoleData,
        processing: processingRoleData,
        errors: errorsRoleData,
        clearErrors: clearErrorsRoleData,
        data: roleData,
        setData: setRoleData,
    } = useForm({
        op: 'roleData',
        role_id: user.role_id || '',
        permissions: user.permissions || [],
    });

    function handleUserDataSubmit(e) {
        e.preventDefault();
        clearErrorsUserData();
        putUserData(route('users.update', user));
    }

    function handleRoleDataSubmit(e) {
        e.preventDefault();
        clearErrorsRoleData();
        putRoleData(route('users.update', user));
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

                {/* Primo Form: Dati Utente */}
                <Form
                    onSubmit={handleUserDataSubmit}
                    errors={errorsUserData}
                    processing={processingUserData}
                    onCancel={handleCancel}>
                    <TextInput
                        label='Name'
                        name='name'
                        value={userData.name}
                        onChange={setUserData}
                    />
                    <TextInput
                        label='Lastname'
                        name='lastname'
                        value={userData.lastname}
                        onChange={setUserData}
                    />
                    <EmailInput
                        label='Email'
                        name='email'
                        value={userData.email}
                        onChange={setUserData}
                    />
                    <TextInput
                        label='Phone'
                        name='phone'
                        value={userData.phone}
                        onChange={setUserData}
                    />
                    <Switch
                        label='Status'
                        name='status'
                        value={userData.status}
                        onChange={setUserData}
                    />
                </Form>
            </Panel>

            {/* Secondo Form: Ruoli e Permessi */}
            <Panel>
                <Form
                    onSubmit={handleRoleDataSubmit}
                    errors={errorsRoleData}
                    processing={processingRoleData}
                    onCancel={handleCancel}>
                    <SelectInput
                        label='Role'
                        name='role_id'
                        value={roleData.role_id}
                        options={roles}
                        onChange={setRoleData}
                    />
                    <SelectInput
                        label='Permissions'
                        name='permissions'
                        value={roleData.permissions}
                        options={permissions}
                        onChange={setRoleData}
                        multiple={true}
                    />
                </Form>
            </Panel>
        </>
    );
}

Edit.layout = (page) => <BaseLayout children={page} />;

export default Edit;
