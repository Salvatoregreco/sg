<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Modules;
use Illuminate\Http\Request;
use App\Services\DataTableConfig;

class ModulesController extends Controller
{
    protected DataTableConfig $dataTableConfig;

    public function __construct()
    {
        $this->dataTableConfig = new DataTableConfig([
            'tableColumns' => [
                [
                    'field' => 'id',
                    'label' => 'ID',
                    'sortable' => true,
                    'searchable' => true,
                    'width' => '1px',
                    'align' => 'center',
                    'className' => 'justify-center'
                ],
                ['field' => 'label', 'label' => 'Label', 'sortable' => false, 'searchable' => true],
                [
                    'field' => 'status',
                    'label' => 'Status',
                    'sortable' => true,
                    'searchable' => true,
                    'width' => '1px',
                    'align' => 'center',
                    'className' => 'justify-center'
                ],
                ['field' => 'created_at', 'label' => 'Creation Date', 'sortable' => true, 'searchable' => true],
                [
                    'field' => 'actions',
                    'label' => '',
                    'sortable' => false,
                    'searchable' => false,
                    'width' => '100px',
                    'align' => 'center',
                    'className' => 'justify-center'
                ],
            ],
            'searchBy' => 'label',
            'formAction' => '/modules',
        ]);
    }

    public function index(Request $request)
    {
        $query = Modules::query();
        $trustedParams = $request->only(['search', 'search_by', 'sort_key', 'sort_direction', 'per_page', 'page']);

        // Filtraggio per ricerca
        if (!empty($trustedParams['search']) && !empty($trustedParams['search_by'])) {
            $query->where(
                $trustedParams['search_by'],
                'like',
                '%' . $trustedParams['search'] . '%'
            );
        }

        // Ordinamento
        if (!empty($trustedParams['sort_key']) && !empty($trustedParams['sort_direction'])) {
            $query->orderBy($trustedParams['sort_key'], $trustedParams['sort_direction']);
        }

        // Elementi per pagina
        $itemsPerPage = $trustedParams['per_page'] ?? $this->dataTableConfig->itemsPerPage;

        $modules = $query->paginate($itemsPerPage)->appends($trustedParams);

        // dd($query->toSql(), $query->getBindings());

        return Inertia::render(
            'Modules/Modules.index',
            [
                'DataTable' => [
                    'data' => $modules,
                    'columns' => $this->dataTableConfig->tableColumns,
                    'formAction' => $this->dataTableConfig->formAction,
                    'editRoute' => 'modules.edit',
                    'destroyRoute' => 'modules.destroy',
                    'filters' => $trustedParams,
                    'perPageOptions' => $this->dataTableConfig->perPageOptions,
                    'perPageDefault' => $this->dataTableConfig->itemsPerPage,
                    'searchByOptions' => array_map(fn($column) => [
                        'field' => $column['field'],
                        'label' => $column['label']
                    ], $this->dataTableConfig->tableColumns),
                    'searchByDefault' => $this->dataTableConfig->searchBy,
                ],
            ]
        );
    }

    public function edit(Modules $module)
    {
        dd($module);
    }

    public function destroy(Modules $module)
    {
        $module->delete();

        return redirect()->back()->with('success', 'Module deleted successfully!');
    }
}
