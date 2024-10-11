<?php

namespace Database\Seeders;

use App\Models\Role;
use App\Models\User;
use Illuminate\Support\Str;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Creo i ruoli
        Role::create([
            'name' => 'admin',
            'label' => 'Admin',
        ]);
        Role::create([
            'name' => 'editor',
            'label' => 'Editor',
        ]);

        $adminRole = Role::where('name', 'admin')->first();
        $editorRole = Role::where('name', 'editor')->first();

        // Creo gli utenti e relativi ruoli        
        User::create([
            'email' => 'admin@sg.com',
            'phone' => fake()->phoneNumber(),
            'password' => Hash::make('password'),
            'remember_token' => Str::random(10),
            'name' => 'Salvatore',
            'lastname' => 'Greco',
            'status' => 'Y',
            'email_verified_at' => fake()->dateTimeBetween('-1 year', 'now'),
            'created_at' => fake()->dateTimeBetween('-1 year', 'now'),
            'updated_at' => fake()->dateTimeBetween('-1 year', 'now'),
        ])->assignRole($adminRole->id);

        User::create([
            'email' => 'user@sg.com',
            'phone' => fake()->phoneNumber(),
            'password' => Hash::make('password'),
            'remember_token' => Str::random(10),
            'name' => 'Test',
            'lastname' => 'User',
            'status' => 'Y',
            'email_verified_at' => fake()->dateTimeBetween('-1 year', 'now'),
            'created_at' => fake()->dateTimeBetween('-1 year', 'now'),
            'updated_at' => fake()->dateTimeBetween('-1 year', 'now'),
        ])->assignRole($editorRole->id);
    }
}
