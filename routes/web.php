<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

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
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/about', function () {
    return Inertia::render('About', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register')
    ]);
});

Route::get('/blog', function () {
    return Inertia::render('Blog', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register')
    ]);
})->name('allBlogs');

Route::get('/contactus', function () {
    return Inertia::render('ContactUs', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register')
    ]);
})->name('contactus');

Route::get('/blog/{id}', 'App\Http\Controllers\BlogController@get')->name('showBlog');
Route::get('/user/page/{id}','App\Http\Controllers\UserController@get')->name('showUser');

Route::prefix('/user')->group(function () {
    Route::get('/dashboard', function () {
        return Inertia::render('Dashboard');
    })->middleware(['auth', 'verified'])->name('dashboard');
    Route::get('/blogs', function () {
        return Inertia::render('Blogs');
    })->middleware(['auth', 'verified'])->name('blogs');
    Route::get('/verification', function () {
        return Inertia::render('Verification');
    })->middleware(['auth', 'verified', 'admin'])->name('verification');
    Route::get('/usersmanagment', function () {
        return Inertia::render('UserManagment');
    })->middleware(['auth', 'verified', 'admin'])->name('userManagment');
    Route::get('/messagebox', function () {
        return Inertia::render('MessageBox');
    })->middleware(['auth', 'verified', 'admin'])->name('messageBox');
    Route::get('/services', function () {
        return Inertia::render('Services');
    })->middleware(['auth', 'verified'])->name('services');
    Route::get('/orders','App\Http\Controllers\OrderController@showOrderOfUser')
    ->middleware(['auth','verified'])->name('orders');
    Route::get('/staff/orders','App\Http\Controller\OrderController@getBasedOnStaff')
    ->middleware(['auth','verified','staff'])->name('allorders');
});

Route::middleware(['auth','verified'])->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__ . '/auth.php';
