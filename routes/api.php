<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ItemsController;
use App\Http\Controllers\RecipeController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});
// Item
Route::prefix('/items')->group(function(){
    route::get('/', [ItemsController::class, 'index']);
    route::get('/list', [ItemsController::class, 'list']);
    route::put('/{item}/update', [ItemsController::class, 'update']);
    route::post('/save', [ItemsController::class, 'save']);
    route::post('/recipes/save', [ItemsController::class, 'recipe']);
    route::delete('/{item}/destroy', [ItemsController::class, 'destroy']);
});
// Recipe
Route::prefix('/recipes')->group(function(){
    route::get('/', [RecipeController::class, 'index']);
    route::get('/list', [RecipeController::class, 'list']);
    route::put('/{recipe}/update', [RecipeController::class, 'update']);
    route::post('/save', [RecipeController::class, 'save']);
    route::delete('/{recipe}/destroy', [RecipeController::class, 'destroy']);
});
