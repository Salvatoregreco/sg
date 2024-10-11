<?php

namespace App\Http\Controllers;

use App\Models\User;
use App\Models\Modules;
use App\Models\Permission;
use Illuminate\Support\Facades\Auth;

class NavigationController extends Controller
{
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

            // Se il modulo non ha sottomoduli dopo il filtro, puoi decidere se escluderlo
            // return !$module->submodules->isEmpty();

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

        return response()->json($navigation);
    }

    public function testPermissions()
    {
        $user = User::find(1);
        $permission = Permission::where('name', 'access_special_feature')->first();
        $user->permissions()->attach($permission->id);
    }
}
