<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\HomeController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\LoginController;
use App\Http\Controllers\ModulesController;

Route::match(['get', 'post'], '/login', function (Request $request) {
    if ($request->isMethod('get')) return app(LoginController::class)->login($request);
    if ($request->isMethod('post')) return app(LoginController::class)->authenticate($request);
})->name('login');

Route::middleware('auth')->group(function () {
    Route::get('/logout', [LoginController::class, 'logout']);
    Route::get('/', [HomeController::class, 'index']);

    // Users routes
    Route::get('/users', [UserController::class, 'index'])->name('users.index');
    Route::get('/users/{user}/edit', [UserController::class, 'edit'])->name('users.edit');
    Route::put('/users/{user}', [UserController::class, 'update'])->name('users.update');
    Route::delete('/users/{user}', [UserController::class, 'destroy'])->name('users.destroy');

    // Modules routes
    Route::get('/modules', [ModulesController::class, 'index']);
    Route::get('/modules/{module}/edit', [ModulesController::class, 'edit'])->name('modules.edit');
    Route::put('/modules/{module}', [ModulesController::class, 'update'])->name('modules.update');
    Route::delete('/modules/{module}', [ModulesController::class, 'destroy'])->name('modules.destroy');
});
