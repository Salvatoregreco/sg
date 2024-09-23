<?php

namespace Database\Seeders;

use App\Models\User;
use Nette\Utils\Random;
use Illuminate\Support\Arr;
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
        User::factory(30)->create([
            'email' => function () {
                return fake()->unique()->safeEmail();
            },
            'password' => Hash::make('password'),
            'remember_token' => function () {
                return Str::random(10);
            },
            'name' => function () {
                return fake()->firstName();
            },
            'lastname' => function () {
                return fake()->lastName();
            },
            'status' => function () {
                return Arr::random(['N', 'Y']);
            },
            'email_verified_at' => function () {
                return fake()->dateTimeBetween('-1 year', 'now');
            },
            'created_at' => function () {
                return fake()->dateTimeBetween('-1 year', 'now');
            },
            'updated_at' => function () {
                return fake()->dateTimeBetween('-1 year', 'now');
            },
            'deleted_at' => null,
        ]);
    }
}
