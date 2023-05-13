<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ItemsController;

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
    route::delete('/{item}/destroy', [ItemsController::class, 'destroy']);
});
