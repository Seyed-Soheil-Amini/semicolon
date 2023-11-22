<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MessageController;

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
Route::get('/randomBlogs/{filter}', 'App\Http\Controllers\BlogController@indexRandomBlogs')->middleware(['checkSession']);
Route::get('/blog/view/{id}', 'App\Http\Controllers\BlogController@addViewer')->middleware(['checkSession']);
Route::get('/blog/like/{id}', 'App\Http\Controllers\BlogController@toggleLike')->middleware(['checkSession']);

Route::prefix('/categories')->middleware(['auth:sanctum'])->namespace('App\Http\Controllers')->group(function () {
    Route::get('/', 'CategoryController@index');
});

Route::prefix('/blogs')->middleware(['auth:sanctum'])->namespace('App\Http\Controllers')->group(function () {
    Route::post('/store', 'BlogController@create');
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

Route::prefix('/user')->middleware(['auth:sanctum'])->namespace('App\Http\Controllers')->group(function () {
    Route::get('/activity/{id}', 'UserController@getShortActivityInfo');
    Route::patch('/update', [ProfileController::class, 'update'])->name('user.update');
});

Route::prefix('/admin')->middleware(['auth:sanctum', 'admin'])->namespace('App\Http\Controllers')->group(function () {
    Route::get('/users', 'UserController@indexUsersForAdmin');
    Route::delete('/delete/user', 'UserController@deleteUser');
});

Route::prefix('/message')->middleware(['checkSession'])->group(function (){
    Route::post('/store',[MessageController::class,'create']);
    Route::get('/index',[MessageController::class,'indexMessages'])->middleware(['auth:sanctum','admin']);
    Route::delete('/delete',[MessageController::class,'delete'])->middleware(['auth:sanctum','admin']);
});

Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth');
