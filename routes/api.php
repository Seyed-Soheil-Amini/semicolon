<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::get('blogs/', 'App\Http\Controllers\BlogController@index');

Route::prefix('/categories')->middleware(['auth:sanctum'])->namespace('App\Http\Controllers')->group(function () {
    Route::get('/', 'CategoryController@index');
});

Route::prefix('/blogs')->middleware(['auth:sanctum'])->namespace('App\Http\Controllers')->group(function () {
    Route::post('/', 'BlogController@create');
    Route::put('/{id}', 'BlogController@update');
    Route::delete('/{id}', 'BlogController@destroy');
    Route::get('/user/{id}', 'BlogController@indexBadeOnUser');
    Route::get('/published/user/{id}', 'BlogController@indexPublishedBlogOfUser');
    Route::get('/blocked/user/{id}', 'BlogController@indexBlockedBlogOfUser');
    Route::get('/publish/toggle/{id}', 'BlogController@togglePublishOfBlog');
    Route::prefix('/admin')->middleware(['admin'])->group(function () {
        Route::get('/verification', 'BlogController@indexPendingBlogs');
        Route::post('/verify', 'BlogController@verifyBlogs');
        Route::post('/block', 'BlogController@blockBlogs');
    });
});

Route::post('/login', [AuthController::class, 'login']);
Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth');
