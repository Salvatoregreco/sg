import BaseLayout from '@Layout/BaseLayout.jsx';
import { Head, usePage, useForm, router } from '@inertiajs/react';
import Panel from '@components/Panel.jsx';
import TitleBar from '@components/TitleBar.jsx';
import Alert from '@components/Alert.jsx';
import Switch from '@components/Form/Switch.jsx';
import TextInput from '@components/Form/TextInput.jsx';
import Checkbox from '@components/Form/Checkbox.jsx';
import Form from '@components/Form/Form.jsx';

function ModuleForm({ module, flash }) {
    const {
        put: putModules,
        processing: processingModules,
        errors: errorsModules,
        clearErrors: clearErrorsModules,
        data: modulesData,
        setData: setModulesData,
    } = useForm({
        op: 'module',
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
        clearErrorsModules();
        putModules(route('modules.update', module));
    }

    function handleCancel(e) {
        e.preventDefault();
        router.get(route('modules.index'));
    }

    return (
        <Panel>
            <Alert type={flash} />

            <Form
                onSubmit={handleSubmit}
                errors={errorsModules}
                processing={processingModules}
                onCancel={handleCancel}>
                <TextInput
                    label='Name'
                    name='name'
                    value={modulesData.name}
                    onChange={setModulesData}
                />
                <TextInput
                    label='Label'
                    name='label'
                    value={modulesData.label}
                    onChange={setModulesData}
                />
                <TextInput
                    label='Icon (e.g., fa fa-user)'
                    name='icon'
                    value={modulesData.icon}
                    onChange={setModulesData}
                />
                <TextInput
                    label='Base Path (e.g., modules)'
                    name='base_path'
                    value={modulesData.base_path}
                    onChange={setModulesData}
                />
                <Switch
                    label='Status'
                    name='status'
                    value={modulesData.status}
                    onChange={setModulesData}
                />
                {/* TODO: creare componente per la gestione della posizione */}
                <TextInput
                    label='Position'
                    name='position'
                    value={modulesData.position}
                    onChange={setModulesData}
                />
                <TextInput
                    label='Permission Name'
                    name='permission_name'
                    value={modulesData.permission_name}
                    onChange={setModulesData}
                />
            </Form>
        </Panel>
    );
}

function SubmodulesForm({ module, all_submodules, module_submodules }) {
    const {
        put: putSubmodules,
        processing: processingSubmodules,
        errors: errorsSubmodules,
        clearErrors: clearErrorsSubModules,
        data: subModulesData,
        setData: setSubModulesData,
    } = useForm({
        op: 'submodules',
        submodules: module_submodules || [],
    });

    function handleSubmit(e) {
        e.preventDefault();
        clearErrorsSubModules();
        putSubmodules(route('modules.update', module));
    }

    function handleCancel(e) {
        e.preventDefault();
        router.get(route('modules.index'));
    }

    return (
        <Panel>
            <Form
                onSubmit={handleSubmit}
                errors={errorsSubmodules}
                processing={processingSubmodules}
                onCancel={handleCancel}>
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
    );
}

function Edit() {
    const { module, all_submodules, module_submodules, flash } = usePage().props;

    return (
        <>
            <Head title={`${module.label}`} />
            <TitleBar>{`${module.label}`}</TitleBar>

            {/* Modulo */}
            <ModuleForm
                module={module}
                flash={flash}
            />

            {/* Sotto moduli */}
            <SubmodulesForm
                module={module}
                all_submodules={all_submodules}
                module_submodules={module_submodules}
            />
        </>
    );
}

Edit.layout = (page) => <BaseLayout children={page} />;

export default Edit;
