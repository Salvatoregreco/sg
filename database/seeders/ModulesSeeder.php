<?php

namespace Database\Seeders;

use App\Models\Modules;
use App\Models\Submodules;
use Illuminate\Database\Seeder;

class ModulesSeeder extends Seeder
{
    public function run()
    {
        // Moduli
        $modulePosition = 0;
        $submodulePosition = 0;

        Modules::create([
            'name' => 'modules',
            'label' => 'Modules',
            'icon' => 'bi bi-box-fill',
            'base_path' => 'modules',
            'status' => 'Y',
            'position' => $modulePosition,
            'permission_name' => 'access_modules_module'
        ]);
        Modules::create([
            'name' => 'users',
            'label' => 'Users',
            'icon' => 'bi bi-person-fill',
            'base_path' => 'users',
            'status' => 'Y',
            'position' => $modulePosition = $modulePosition + 1,
            'permission_name' => 'access_users_module'
        ]);
        Modules::create([
            'name' => 'blog',
            'label' => 'Blog',
            'icon' => 'bi bi-book-fill',
            'base_path' => 'blog',
            'status' => 'Y',
            'position' => $modulePosition = $modulePosition + 1,
            'permission_name' => 'access_blog_module'
        ]);

        // Sottomoduli
        Submodules::create([
            'module_id' => 3,
            'label' => 'Posts',
            'path' => 'posts',
            'status' => 'Y',
            'position' => $submodulePosition,
            'permission_name' => 'access_blog_posts'
        ]);
        Submodules::create([
            'module_id' => 3,
            'label' => 'Categories',
            'path' => 'categories',
            'status' => 'Y',
            'position' => $submodulePosition = $submodulePosition + 1,
            'permission_name' => 'access_blog_categories'
        ]);
        Submodules::create([
            'module_id' => 3,
            'label' => 'Tags',
            'path' => 'tags',
            'status' => 'Y',
            'position' => $submodulePosition = $submodulePosition + 1,
            'permission_name' => 'access_blog_tags'
        ]);
        Submodules::create([
            'module_id' => 3,
            'label' => 'Authors',
            'path' => 'authors',
            'status' => 'Y',
            'position' => $submodulePosition = $submodulePosition + 1,
            'permission_name' => 'access_blog_authors'
        ]);
    }
}
