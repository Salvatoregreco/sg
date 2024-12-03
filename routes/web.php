<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\UserController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ModulesController;
use App\Http\Controllers\DashboardController;
use App\Http\Controllers\NavigationController;
use App\Http\Controllers\SubModulesController;

/* 
    Nomenclature:
    - index:    GET
    - create    GET
    - store     POST
    - edit      GET
    - update    PUT
    - destroy   DELETE
*/

Route::match(['get', 'post'], '/login', function (Request $request) {
    if ($request->isMethod('get')) return app(LoginController::class)->login($request);
    if ($request->isMethod('post')) return app(LoginController::class)->authenticate($request);
})->name('login');

Route::middleware('auth')->group(function () {
    Route::get('/logout', [LoginController::class, 'logout']);
    Route::get('/', [DashboardController::class, 'index']);

    // Users routes
    Route::middleware('permission:access_users_module')->group(function () {
        Route::get('/users', [UserController::class, 'index'])->name('users.index');
        Route::get('/users/create', [UserController::class, 'create'])->name('users.create');
        Route::post('/users', [UserController::class, 'store'])->name('users.store');
        Route::get('/users/{user}/edit', [UserController::class, 'edit'])->name('users.edit');
        Route::put('/users/{user}', [UserController::class, 'update'])->name('users.update');
        Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('users.destroy');
    });

    // Modules routes
    Route::middleware('permission:access_modules_module')->group(function () {
        Route::get('/modules', [ModulesController::class, 'index'])->name('modules.index');
        Route::get('/modules/create', [ModulesController::class, 'create'])->name('modules.create');
        Route::post('/modules', [ModulesController::class, 'store'])->name('modules.store');
        Route::get('/modules/{module}/edit', [ModulesController::class, 'edit'])->name('modules.edit');
        Route::put('/modules/{module}', [ModulesController::class, 'update'])->name('modules.update');
        Route::delete('/modules/{module}', [ModulesController::class, 'destroyModule'])->name('modules.destroy');

        Route::get('/submodules', [SubModulesController::class, 'indexSubmodules'])->name('submodules.index');
        Route::get('/submodules/create', [SubModulesController::class, 'createSubmodule'])->name('submodules.create');
        Route::post('/submodules', [SubModulesController::class, 'storeSubmodule'])->name('submodules.store');
        Route::get('/submodules/{submodule}/edit', [SubModulesController::class, 'editSubmodule'])->name('submodules.edit');
        Route::put('/submodules/{submodule}', [SubModulesController::class, 'updateSubmodule'])->name('submodules.update');
        Route::delete('/submodules/{submodule}', [SubModulesController::class, 'destroySubmodule'])->name('submodules.destroy');
    });

    // Navigation routes
    Route::get('/navigation', [NavigationController::class, 'getNavigation']);
    Route::get('/test', [NavigationController::class, 'testPermissions']);
});
