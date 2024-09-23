<?php

namespace App\Http\Controllers;

use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Http\RedirectResponse;

class LoginController extends Controller
{
    public function login()
    {
        if (Auth::check()) {
            return redirect()->intended('/');
        }

        return Inertia::render('Login');
    }

    public function authenticate(Request $request): RedirectResponse
    {
        if (Auth::check()) return redirect()->intended('/');

        $credentials = $request->validate([
            'email' => ['required', 'email'],
            'password' => ['required'],
        ]);

        if (Auth::attempt($credentials)) {
            if (Auth::user()->status !== 'Y') {
                Auth::logout();
                return back()->withErrors(['error' => 'Your account is not active.'])->onlyInput('email');
            }

            $request->session()->regenerate();

            return redirect()->intended('/');
        }

        return back()->withErrors(['error' => 'The provided credentials do not match our records.'])->onlyInput('email');
    }


    public function logout(Request $request): RedirectResponse
    {
        Auth::logout();
        $request->session()->invalidate();
        $request->session()->regenerateToken();
        return redirect('/login');
    }
}
