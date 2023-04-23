<?php

use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');

Route::get('/admin/inventory', function(){return view('pages.admin.inventories.index');})->name('admin/inventory');
Route::get('/admin', function(){return view('pages.admin.dashboard.index');})->name('admin/dashboard');

Route::get('/employee', function(){return view('pages.employee.inventories.index');})->name('employee/dashboard');
