<?php

// app/Http/Controllers/NavigationController.php

namespace App\Http\Controllers;

use App\Models\Modules;

class NavigationController extends Controller
{
    public function getNavigation()
    {
        $modules = Modules::where('status', 'Y')
            ->orderBy('position', 'ASC')
            ->with('submodules')
            ->get();

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
}
