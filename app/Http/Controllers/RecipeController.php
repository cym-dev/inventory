<?php

namespace App\Http\Controllers;

use App\Models\Recipe;
use Illuminate\Http\Request;
use Response;

class RecipeController extends Controller
{
     public function index(Request $request)
    {
        $recipe=Recipe::whereNull('deleted_at')
                        //    ->where('name', 'like', "%{$request->key}%")
                            ->get();
        return response()->json($recipe);
    }

    public function save(Request $request)
    {
        $recipe=Recipe::create($request->all());
        return Response::json($recipe, 200);
    }

    public function update(Request $request, Recipe $recipe)
    {
        $input=$request->all();
        $recipe->update($input);
        return Response::json($recipe, 201);
    }

    public function destroy(Recipe $recipe)
    {
        $recipe->deleted_at=now();
        $recipe->update();
        return Response::json(array('success'=>true));
    }
}
