<?php

namespace App\Http\Controllers;

use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;

class UserController extends Controller
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
        ['field' => 'name', 'label' => 'Name', 'sortable' => true],
        ['field' => 'lastname', 'label' => 'Lastname', 'sortable' => true],
        ['field' => 'email', 'label' => 'Email', 'sortable' => true],
        [
            'field' => 'status',
            'label' => 'Status',
            'sortable' => true,
            'width' => '1px',
            'align' => 'center',
            'className' => 'justify-center'
        ],
    ];
    const ITEMS_PER_PAGE = 10;
    const PER_PAGE_OPTIONS = [5, 10, 20, 50, 100];
    const SEARCH_BY = 'name';
    const FORM_ACTION = '/users';

    public function index(Request $request)
    {
        $query = User::query();
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

        $users = $query->paginate($itemsPerPage)->appends($trustedParams);

        // dd($query->toSql(), $query->getBindings());
        //dd($trustedParams);

        return Inertia::render(
            'Users',
            [
                'DataTable' => [
                    'data' => $users,
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
