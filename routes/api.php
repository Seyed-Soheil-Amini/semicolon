<?php

use App\Http\Controllers\MailboxController;
use App\Http\Controllers\MailController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\MessageController;
use App\Http\Controllers\OrderController;
use App\Http\Controllers\ProjectController;

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
Route::get('/blog/view/{id}/{fingerprint}', 'App\Http\Controllers\BlogController@addViewer')->middleware(['checkSession']);
Route::get('/blog/like/{id}/{fingerprint}', 'App\Http\Controllers\BlogController@toggleLike')->middleware(['checkSession']);

// ---------------------------------------- CATEGORY -------------------------------------

Route::prefix('/categories')->middleware(['auth:sanctum'])->namespace('App\Http\Controllers')->group(function () {
    Route::get('/', 'CategoryController@index');
});

// ---------------------------------------------------------------------------------------

// ---------------------------------------- BLOG -------------------------------------

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

// ------------------------------------------------------------------------------------

// ----------------------------------- USERS --------------------------------------------

Route::prefix('/user')->middleware(['auth:sanctum'])->namespace('App\Http\Controllers')->group(function () {
    Route::get('/activity/{id}', 'UserController@getShortActivityInfo');
    Route::patch('/update', [ProfileController::class, 'update'])->name('user.update');
});

Route::prefix('/admin')->middleware(['auth:sanctum', 'admin'])->namespace('App\Http\Controllers')->group(function () {
    Route::get('/users', 'UserController@indexUsersForAdmin');
    Route::delete('/delete/user', 'UserController@deleteUser');
});

Route::prefix('/staff')->middleware(['auth:sanctum','staff'])->namespace('App\Http\Controllers')->group(function (){
    Route::get('/orders/{expertise}','OrderController@getBasedOnCategory');
});

// --------------------------------------------------------------------------------------

// ---------------------------------------- MESSAGE -------------------------------------

Route::prefix('/message')->middleware(['checkSession'])->group(function (){
    Route::post('/store',[MessageController::class,'create']);
    Route::get('/index',[MessageController::class,'indexMessages'])->middleware(['auth:sanctum','admin']);
    Route::delete('/delete',[MessageController::class,'delete'])->middleware(['auth:sanctum','admin']);
});

// --------------------------------------------------------------------------------------

// ---------------------------------------- ORDER -------------------------------------

Route::prefix('/order')->middleware(['auth:sanctum'])->namespace('App\Http\Controllers')->group(function (){
    Route::post('/',[OrderController::class,'create']);
    Route::put('/update',[OrderController::class,'update']);
    Route::delete('/remove',[OrderController::class,'destroy']);
    Route::get('/show',[OrderController::class,'getOrdersOfUser']);
});

// -------------------------------------------------------------------------------------

// ---------------------------------------- PROJECT -------------------------------------

Route::prefix('/project')->middleware(['auth:sanctum','staff'])->namespace('App\Http\Controller')->group(function (){
    Route::post('/',[ProjectController::class,'create']);
    Route::get('/complete/{id}/{rate}');
});

// --------------------------------------------------------------------------------------

// ---------------------------------------- MAILBOX -------------------------------------

Route::prefix('/mailbox')->middleware(['auth:sanctum'])->namespace('App\Http\Controller')->group(function (){
    Route::get('/',[MailboxController::class,'create']);
});

// --------------------------------------------------------------------------------------

// ---------------------------------------- MAIL ----------------------------------------

Route::prefix('/mail')->middleware(['auth:sanctum'])->namespace('App\Http\Controller')->group(function (){
    Route::post('/paid',[MailController::class,'paidMail']);
    Route::get('/read/{id}',[MailController::class,'readMail']);
});

// --------------------------------------------------------------------------------------

Route::post('/logout', [AuthController::class, 'logout'])->middleware('auth');
