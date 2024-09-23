<?php

namespace App\Http\Controllers;

use App\Models\Modules;
use Inertia\Inertia;
use Illuminate\Http\Request;

class ModulesController extends Controller
{
    const TABLE_COLUMNS = [
        [
            'field' => 'id',
            'label' => 'ID',
            'sortable' => true,
            'width' => '1px',
            'align' => 'center',
            'className' => 'justify-center'
        ],
        ['field' => 'label', 'label' => 'Label', 'sortable' => false],
        [
            'field' => 'status',
            'label' => 'Status',
            'sortable' => true,
            'width' => '1px',
            'align' => 'center',
            'className' => 'justify-center'
        ],
        ['field' => 'created_at', 'label' => 'Creation Date', 'sortable' => true],
    ];
    const ITEMS_PER_PAGE = 10;
    const PER_PAGE_OPTIONS = [5, 10, 20, 50, 100];
    const SEARCH_BY = 'label';
    const FORM_ACTION = '/modules';

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
        $itemsPerPage = $trustedParams['per_page'] ?? self::ITEMS_PER_PAGE;

        $modules = $query->paginate($itemsPerPage)->appends($trustedParams);

        // dd($query->toSql(), $query->getBindings());

        return Inertia::render(
            'Modules',
            [
                'DataTable' => [
                    'data' => $modules,
                    'columns' => self::TABLE_COLUMNS,
                    'formAction' => self::FORM_ACTION,
                    'filters' => $trustedParams,
                    'perPageOptions' => self::PER_PAGE_OPTIONS,
                    'perPageDefault' => self::ITEMS_PER_PAGE,
                    'searchByOptions' => array_map(fn($column) => [
                        'field' => $column['field'],
                        'label' => $column['label']
                    ], self::TABLE_COLUMNS),
                    'searchByDefault' => self::SEARCH_BY,
                ],
            ]
        );
    }
}
