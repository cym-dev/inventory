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
            'name'          =>'paminta',
            'category'      =>'seassoning',
            'qnty'          => 3,
            'unit'          => "pinch/es",
            ],
            [
            'name'          =>'paminta',
            'category'      =>'seassoning',
            'qnty'          => 3,
            'unit'          => "pinch/es",
            ],
        ]);
    }
}
