<?php

namespace App\Http\Controllers;

use Auth;
use App\Models\User;
use Inertia\Inertia;
use Illuminate\Http\Request;
use App\Services\DataTableConfig;

class UserController extends Controller
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
                ['field' => 'name', 'label' => 'Name', 'sortable' => true, 'searchable' => true],
                ['field' => 'lastname', 'label' => 'Lastname', 'sortable' => true, 'searchable' => true],
                ['field' => 'email', 'label' => 'Email', 'sortable' => true, 'searchable' => true],
                ['field' => 'phone', 'label' => 'Phone', 'sortable' => true, 'searchable' => true],
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
                    'field' => 'actions',
                    'label' => '',
                    'sortable' => false,
                    'searchable' => false,
                    'width' => '100px',
                    'align' => 'center',
                    'className' => 'justify-center'
                ],
            ],
            'searchBy' => 'name',
            'formAction' => '/users',
            'itemsPerPage' => 20,
        ]);
    }

    public function index(Request $request)
    {
        sleep(1);

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
        $itemsPerPage = $trustedParams['per_page'] ?? $this->dataTableConfig->itemsPerPage;

        $users = $query->paginate($itemsPerPage)->appends($trustedParams);

        // dd($query->toSql(), $query->getBindings());

        return Inertia::render(
            'Users/Users.index',
            [
                'DataTable' => [
                    'data' => $users,
                    'columns' => $this->dataTableConfig->tableColumns,
                    'formAction' => $this->dataTableConfig->formAction,
                    'editRoute' => 'users.edit',
                    'destroyRoute' => 'users.destroy',
                    'filters' => $trustedParams,
                    'perPageOptions' => $this->dataTableConfig->perPageOptions,
                    'perPageDefault' => $this->dataTableConfig->itemsPerPage,
                    'searchByOptions' => array_map(fn($column) => [
                        'field' => $column['field'],
                        'label' => $column['label']
                    ], array_filter($this->dataTableConfig->tableColumns, fn($column) => $column['searchable'] !== false)),
                    'searchByDefault' => $this->dataTableConfig->searchBy,
                ],
            ]
        );
    }

    public function edit(User $user)
    {
        return Inertia::render('Users/Users.edit', ['user' => $user]);
    }

    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name' => 'required|max:255',
            'lastname' => 'required|max:255',
            'email' => 'required|email|max:255|unique:sg_users,email,' . $user->id,
            'phone' => 'max:255',
            'status' => 'required|in:Y,N'
        ]);

        sleep(1);

        $user->update($validated);

        return to_route('users.index')->with('success', 'User updated successfully!');
    }

    public function destroy(User $user)
    {
        if (Auth::user()->id === $user->id) {
            return redirect()->back()->with('error', 'You cannot delete your own account!');
        }

        sleep(1);

        $user->delete();

        return to_route('users.index')->with('success', 'User deleted successfully!');
    }
}
