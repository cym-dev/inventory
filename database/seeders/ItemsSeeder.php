<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Support\Facades\DB;
use Illuminate\Database\Seeder;

class ItemsSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        DB::table('items')->insert([
            [
            'name'          =>'Manok',
            'category'      =>'seassoning',
            'qnty'          => 90,
            'unit'          => "kg/s",
            ],
            [
            'name'          =>'Toyo',
            'category'      =>'seassoning',
            'qnty'          => 34,
            'unit'          => "L",
            ],
        ]);
    }
}
