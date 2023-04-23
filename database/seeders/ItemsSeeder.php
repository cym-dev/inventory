<?php

namespace Database\Seeders;

use Illuminate\Database\Console\Seeds\WithoutModelEvents;
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
            'updatedBy'     => 1,
            'qnty'          => 3,
            'unit'          => "pinch/es",
            ],
            [
            'name'          =>'paminta',
            'category'      =>'seassoning',
            'updatedBy'     => 1,
            'qnty'          => 3,
            'unit'          => "pinch/es",
            ],
        ]);
    }
}
