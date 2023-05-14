<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use App\Models\Items;

class Recipe extends Model
{
    use HasFactory;
    protected $fillable = [
        'name',
        'items',
    ];
    protected $appends = [
        'list',
    ];
    protected $casts = [
        'items' => 'array',
    ];
    public function getListAttribute()
        {
            $val = [];
            foreach ($this->items as $key => $value) {
                 $r=json_encode($value);
                 $item =Items::whereId(json_decode($r)->id)->first();
                $val[$key]["id"]=$item->id;  
                $val[$key]["qnty"]=json_decode($r)->qnty;  
                $val[$key]["name"]=$item->name;  
            }
            return $val;
        }
}
