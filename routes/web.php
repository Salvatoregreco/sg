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
    Route::get('/users', [UserController::class, 'index']);
    Route::get('/modules', [ModulesController::class, 'index']);
});
