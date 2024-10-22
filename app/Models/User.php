<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use App\Casts\StatusCast;
use Illuminate\Support\Facades\Auth;
use Illuminate\Notifications\Notifiable;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;

class User extends Authenticatable
{
    use HasFactory, Notifiable, SoftDeletes;

    protected $table = 'sg_users';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'name',
        'lastname',
        'email',
        'phone',
        'password',
        'status',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime:Y-m-d H:i:s',
            'password' => 'hashed',
            'created_at' => 'datetime:Y-m-d H:i:s',
            'updated_at' => 'datetime:Y-m-d H:i:s',
            'deleted_at' => 'datetime:Y-m-d H:i:s',
            'status' => StatusCast::class,
        ];
    }

    /**
     * The roles that belong to the User
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany<\App\Models\Role>
     */
    public function roles()
    {
        return $this->belongsToMany(Role::class, 'sg_role_user');
    }

    /**
     * The permissions that belong to the User
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsToMany<\App\Models\Permission>
     */
    public function permissions()
    {
        return $this->belongsToMany(Permission::class, 'sg_permission_user');
    }

    /**
     * Assigns a role to the user.
     *
     * @param mixed $role The role to assign.
     */
    public function assignRole($role)
    {
        return $this->roles()->attach($role);
    }

    /**
     * Checks if the user has a specified role.
     *
     * This method determines whether the user has been assigned a role
     * with the given name.
     *
     * @param string $role The name of the role to check.
     * @return bool True if the user has the role, false otherwise.
     */
    public function hasRole($role)
    {
        return $this->roles()->where('name', $role)->exists();
    }


    /**
     * Check if the user has a specific permission.
     *
     * This method checks if the user has the specified permission by
     * verifying if it is assigned through roles or directly to the user.
     *
     * @param string $permission The name of the permission to check.
     * @return bool True if the user has the permission, false otherwise.
     */
    public function hasPermission($permission)
    {
        // Permessi assegnati tramite i ruoli
        if ($this->roles()->whereHas('permissions', function ($query) use ($permission) {
            $query->where('name', $permission);
        })->exists()) {
            return true;
        }

        // Permessi assegnati direttamente all'utente
        if ($this->permissions()->where('name', $permission)->exists()) {
            return true;
        }

        return false;
    }


    /**
     * Retrieve all permissions assigned to the user.
     *
     * This method aggregates both role-based and directly-assigned permissions
     * for the user. It combines permissions assigned through the user's roles
     * and those directly assigned to the user, ensuring uniqueness.
     *
     * @return \Illuminate\Support\Collection A collection of unique permission names.
     */
    public function getAllPermissions()
    {
        // Permessi di ruolo
        $rolePermissions = $this->roles()
            ->with('permissions')
            ->get()
            ->pluck('permissions')
            ->flatten()
            ->pluck('name')
            ->unique();

        // Permessi utente
        $directPermissions = $this->permissions()->pluck('name');

        // Permessi totali = permessi di ruolo + permessi utente
        return $rolePermissions->merge($directPermissions)->unique()->values();
    }

    /**
     * Retrieves the navigation menu for the current user.
     *
     * This method retrieves the activated modules and their submodules and
     * filters them based on the user's permissions. It returns a collection of
     * navigation items, each containing the module/submodule details.
     *
     * @return \Illuminate\Support\Collection A collection of navigation items.
     */
    public function getNavigation()
    {
        $user = Auth::user();

        $modules = Modules::where('status', 'Y')
            ->orderBy('position', 'ASC')
            ->with('submodules')
            ->get();
        // dd($modules);

        // Filtro i moduli in base ai permessi
        $modules = $modules->filter(function ($module) use ($user) {
            $permissionName = $module->permission_name;

            if ($permissionName) { // Se il modulo ha un permesso associato
                if (!$user->hasPermission($permissionName)) return false;
            }

            // Filtro i sottomoduli
            $module->submodules = $module->submodules->filter(function ($submodule) use ($user) {
                $permissionName = $submodule->permission_name;
                if ($permissionName) { // Se il sottomodulo ha un permesso associato
                    if (!$user->hasPermission($permissionName)) return false;
                }
                return true;
            })->values();

            return true;
        })->values();

        $navigation = $modules->map(function ($module) {
            return [
                'id' => $module->id,
                'name' => $module->name,
                'label' => $module->label,
                'icon' => $module->icon,
                'base_path' => $module->base_path,
                'position' => $module->position,
                'submodules' => $module->submodules->map(function ($submodule) {
                    return [
                        'id' => $submodule->id,
                        'module_id' => $submodule->module_id,
                        'label' => $submodule->label,
                        'path' => $submodule->path,
                        'position' => $submodule->position,
                    ];
                })->values()->all(),
            ];
        })->values()->all();

        return $navigation;
    }
}
