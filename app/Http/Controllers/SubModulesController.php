<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use App\Models\Modules;
use App\Models\Submodules;
use App\Traits\HasDataTable;
use Illuminate\Http\Request;

class SubModulesController extends Controller
{
    use HasDataTable;

    public function __construct()
    {
        $this->setConfigTable([
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
                [
                    'field' => 'label',
                    'label' => 'Label',
                    'sortable' => false,
                    'searchable' => true
                ],
                [
                    'field' => 'status',
                    'label' => 'Status',
                    'sortable' => true,
                    'searchable' => true,
                    'width' => '1px',
                    'align' => 'center',
                    'className' => 'justify-center'
                ],
                [
                    'field' => 'created_at',
                    'label' => 'Creation Date',
                    'sortable' => true,
                    'searchable' => true
                ],
                [
                    'field' => 'position',
                    'label' => 'Position',
                    'sortable' => true,
                    'searchable' => false,
                    'width' => '1px',
                    'align' => 'center',
                ],
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
            'formAction' => '/submodules',
            'itemsPerPage' => 20,
        ]);
    }

    public function indexSubmodules(Request $request)
    {
        $query = Submodules::query();
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
        $itemsPerPage = $trustedParams['per_page'] ?? $this->getConfigTableKey('itemsPerPage');

        $submodules = $query->paginate($itemsPerPage)->appends($trustedParams);

        // dd($query->toSql(), $query->getBindings());
        // dd($submodules);

        return Inertia::render(
            'Modules/Submodules.index',
            [
                'DataTable' => [
                    'data' => $submodules,
                    'columns' => $this->getConfigTableKey('tableColumns'),
                    'formAction' => $this->getConfigTableKey('formAction'),
                    'createRoute' => 'submodules.create',
                    'editRoute' => 'submodules.edit',
                    'destroyRoute' => 'submodules.destroy',
                    'filters' => $trustedParams,
                    'perPageOptions' => $this->getConfigTableKey('perPageOptions'),
                    'perPageDefault' => $this->getConfigTableKey('itemsPerPage'),
                    'searchByOptions' => array_map(fn($column) => [
                        'field' => $column['field'],
                        'label' => $column['label']
                    ], array_filter($this->getConfigTableKey('tableColumns'), fn($column) => $column['searchable'] !== false)),
                    'searchByDefault' => $this->getConfigTableKey('searchBy'),
                ],
            ]
        );
    }

    public function createSubmodule()
    {

        return Inertia::render('Modules/Submodules.create');
    }

    public function storeSubmodule(Request $request)
    {
        $validated = $request->validate([
            'label' => 'required|max:255',
            'path' => 'required|max:255',
            'status' => 'required|boolean',
            'position' => 'required|numeric|min:0',
            'permission_name' => 'required|max:255',
        ]);

        Submodules::create($validated);

        return to_route('modules.index')->with('success', 'Sotto modulo creato con successo!');
    }
}
