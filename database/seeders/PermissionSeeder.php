<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\Permission;
use Illuminate\Database\Seeder;

class PermissionSeeder extends Seeder
{
    public function run()
    {
        // Permessi per i moduli
        Permission::create(['name' => 'access_modules_module', 'label' => 'Accesso al modulo Moduli']);
        Permission::create(['name' => 'access_users_module', 'label' => 'Accesso al modulo Utenti']);
        Permission::create(['name' => 'access_blog_module', 'label' => 'Accesso al modulo Blog']);

        // Permessi per i sottomoduli
        Permission::create(['name' => 'access_blog_categories', 'label' => 'Accesso alle categorie del Blog']);
        Permission::create(['name' => 'access_blog_posts', 'label' => 'Accesso ai post del Blog']);
        Permission::create(['name' => 'access_blog_tags', 'label' => 'Accesso ai tag del Blog']);
        Permission::create(['name' => 'access_blog_authors', 'label' => 'Accesso ai autori del Blog']);

        // Permessi per i ruoli
        $adminRole = Role::where('name', 'admin')->first();
        $editorRole = Role::where('name', 'editor')->first();

        // Setto i permessi per il ruolo admin
        $allPermissions = Permission::all();
        $adminRole->permissions()->sync($allPermissions);

        // Setto i permessi per il ruolo editor
        $editorPermissions = Permission::whereIn('name', [
            'access_blog_module',
            'access_blog_posts',
            'access_blog_categories',
            'access_blog_tags',
            'access_blog_authors',
        ])->get();
        $editorRole->permissions()->sync($editorPermissions);
    }
}
