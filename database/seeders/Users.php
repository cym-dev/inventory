<?php

namespace Database\Seeders;

// use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;

class Users extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
         DB::table('users')->insert([
            [
            'name'    =>'superadmin',
            'role'    =>'admin',
            'email' =>'admin@gmail.com',
            'password'    => Hash::make('password'),
            ],
            [
            'name'    =>'employee',
            'role'    =>'employee',
            'email' =>'employee@gmail.com',
            'password'    => Hash::make('password'),
            ],
        ]);
    }
}
