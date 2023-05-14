<?php

namespace App\Http\Controllers;

use App\Models\Items;
use Illuminate\Http\Request;
use Response;

class ItemsController extends Controller
{
    public function index(Request $request)
    {
        $item=Items::whereNull('deleted_at')
                        //    ->where('name', 'like', "%{$request->key}%")
                            ->get();
        return response()->json($item);
    }

    public function save(Request $request)
    {
        $item=Items::create($request->all());
        return Response::json($item, 200);
    }
    public function recipe(Request $request)
    {
        $total =0;
        foreach ($request->items as $key => $value) {      
            $enc    = json_encode($value); 
            $item   = json_decode($enc);
            $stock  =  Items::whereId($item->id)->first()->qnty;
           $total   = Items::whereId($item->id)->update(["qnty"=> $stock - ($item->qnty * $request->servings) ]);
        }
        return Response::json( $total );
        // $item=Items::create($request->all());
    }

    public function update(Request $request, Items $item)
    {
        $input=$request->all();
        $item->update($input);
        return Response::json($item, 201);
    }

    public function destroy(Items $item)
    {
        $item->deleted_at=now();
        $item->update();
        return Response::json(array('success'=>true));
    }
}
