<?php

namespace App\Http\Controllers;

use App\Models\Items;
use Illuminate\Http\Request;

class ItemsController extends Controller
{
    public function index(Request $request)
    {
        $items=Items::whereNull('deleted_at')
                        //    ->where('name', 'like', "%{$request->key}%")
                            ->get();
        return response()->json($items);
    }

    public function save(Request $request)
    {
        $items=Items::create($request->all());
        return Response::json($items, 200);
    }

    public function update(Request $request, Items $items)
    {
        $input=$request->all();
        $items->update($input);
        return Response::json($items, 201);
    }

    public function destroy(Items $items)
    {
        $items->deleted_at=now();
        $items->update();
        return Response::json(array('success'=>true));
    }
}
