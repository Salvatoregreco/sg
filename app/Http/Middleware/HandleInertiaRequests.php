<?php

namespace App\Http\Middleware;

use Inertia\Middleware;
use Tighten\Ziggy\Ziggy;
use Illuminate\Http\Request;

class HandleInertiaRequests extends Middleware
{
    /**
     * The root template that's loaded on the first page visit.
     *
     * @see https://inertiajs.com/server-side-setup#root-template
     *
     * @var string
     */
    protected $rootView = 'app';

    /**
     * Determines the current asset version.
     *
     * @see https://inertiajs.com/asset-versioning
     */
    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * Define the props that are shared by default.
     *
     * @see https://inertiajs.com/shared-data
     *
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        return array_merge(parent::share($request), [
            'ziggy' => fn() => [
                (new Ziggy)->toArray(),
                'location' => $request->url(),
            ],
            'auth' => [
                'user' => $request->user() ?? null,
                'permissions' => $request->user() ? $request->user()->getAllPermissions() : [],
                'navigation' => $request->user() ? $request->user()->getNavigation() : [],
            ],
            'flash' => [
                'error' => fn() => $request->session()->get('error') ?? null,
                'success' => fn() => $request->session()->get('success') ?? null,
                'warning' => fn() => $request->session()->get('warning') ?? null,
                'info' => fn() => $request->session()->get('info') ?? null,
            ]
        ]);
    }
}
