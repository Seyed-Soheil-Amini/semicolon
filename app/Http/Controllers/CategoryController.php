<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    public function index()
    {
        $categories = Category::all();
        if ($categories->count() == 0) {
            return response()->json([
                'status' => 204,
                'data' => 'none'
            ], 204);
        } else {
            return response()->json(['data' => $categories], 200);
        }
    }
}
