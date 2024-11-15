import BaseLayout from '@Layout/BaseLayout.jsx';
import { Head, usePage, useForm, router } from '@inertiajs/react';
import Panel from '@components/Panel.jsx';
import TitleBar from '@components/TitleBar.jsx';
import Alert from '@components/Alert.jsx';
import Switch from '@components/Form/Switch.jsx';
import TextInput from '@components/Form/TextInput.jsx';
import Checkbox from '@/Components/Form/Checkbox.jsx';
import Form from '@components/Form/Form.jsx';

function Edit() {
    const { module, all_submodules, module_submodules, flash } = usePage().props;

    const { put, processing, errors, clearErrors, data, setData } = useForm({
        op: 'module',
        name: module.name || '',
        label: module.label || '',
        icon: module.icon || '',
        base_path: module.base_path || '',
        status: module.status || false,
        position: module.position || 0,
        permission_name: module.permission_name || '',
    });

    const {
        put: putSubmodules,
        processing: processingSubmodules,
        errors: errorsSubmodules,
        clearErrors: clearErrorsSubModules,
        data: subModulesData,
        setData: setSubModulesData,
    } = useForm({
        op: 'submodules',
        module_id: module.id,
        submodules: module_submodules || [],
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

    function handleSubmitSubmodules(e) {
        e.preventDefault();
        clearErrorsSubModules();
        putSubmodules(route('modules.update', module));
    }

    function handleCancelSubmodules(e) {
        e.preventDefault();
        router.get(route('modules.index'));
    }

    console.log('subModulesData.submodules:', subModulesData.submodules);

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

            <Panel>
                <Alert type={flash} />
                <Form
                    onSubmit={handleSubmitSubmodules}
                    errors={errorsSubmodules}
                    processing={processingSubmodules}
                    onCancel={handleCancelSubmodules}>
                    <div className='mb-4 px-2 w-full'>
                        <label className='block mb-2 font-medium text-gray-700 text-sm'>
                            Sotto moduli
                        </label>
                        <div
                            className='column-count-container'
                            style={{
                                columnCount: Math.ceil(all_submodules.length / 5),
                                columnGap: '1rem',
                            }}>
                            {all_submodules.map((submodule) => (
                                <div
                                    key={submodule.id}
                                    className='mb-2 break-inside-avoid'>
                                    <Checkbox
                                        label={submodule.label}
                                        name={submodule.id}
                                        checked={subModulesData.submodules.includes(submodule.id)}
                                        onChange={setSubModulesData}
                                    />
                                </div>
                            ))}
                        </div>
                    </div>
                </Form>
            </Panel>
        </>
    );
}

Edit.layout = (page) => <BaseLayout children={page} />;

export default Edit;
