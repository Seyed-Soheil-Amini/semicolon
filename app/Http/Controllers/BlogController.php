<?php

namespace App\Http\Controllers;

use App\Enums\BlogStatusEnum;
use App\Models\Blog;
use App\Models\Category;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Storage;
use \Illuminate\Support\Facades\Validator;
use Carbon\Carbon;

class BlogController extends Controller
{

    public function index()
    {
        $blogs = Blog::with('category')->all();
        if ($blogs->count() > 0) {
            return response()->json([
                "status" => 200,
                'data' => $blogs
            ], 200);
        } else {
            return response()->json([
                'status' => 404,
                'message' => "No Records Found"
            ], 404);
        }
    }
    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'body' => 'string|max:1500',
            'image' => 'nullable|image|mimes:jpeg,jpg,png,bmp,gif,svg,webp',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'data' => $validator->messages()
            ], 422);
        } else {
            $path = null;
            $userId = $request->user()->id;
            if ($request->hasFile('image')) {
                $destinationPath = "public/blogs/$userId";
                $image = $request->file('image');
                $imageName = $image->getClientOriginalName();
                $path = $request->file('image')->storeAs($destinationPath, $imageName);
                $path = substr($path, 7);
            }
            $blog = Blog::create([
                'title' => $request->title,
                'body' => $request->body,
                'image' => $path,
                'labels' => $request->labels,
                'published_at' => null,
                'user_id' => $userId,
                'status' => BlogStatusEnum::pending(),
                'like' => 0,
                'likkers' => null,
                'view' => 0,
                'viewers' => null,
            ]);
            if ($blog) {
                $categoryId = $request->input('categoryId');
                if (!is_null($categoryId)) {
                    $category = Category::find($categoryId);
                    $blog->category()->associate($category);
                    $blog->save();
                }
                return response()->json([
                    'status' => 201,
                    'data' => $blog
                ], 201);
            } else {
                return response()->json([
                    'status' => 400,
                    'data' => 'blog was not created successfuly'
                ], 400);
            }
        }
    }

    public function update(Request $request, $id)
    {
        $blog = Blog::with('category')->find($id);
        if (!$blog) {
            return response()->json([
                'status' => 404,
                'data' => 'blog not found'
            ], 404);
        }
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:255',
            'body' => 'string|max:500',
            'image' => 'nullable|image|mimes:jpeg,jpg,png,bmp,gif,svg,webp',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'data' => $validator->messages()
            ], 422);
        } else {
            $blog->title = $request->title;
            $blog->body = $request->body;
            $blog->labels = json_decode($request->labels);
            $userId = $request->user()->id;
            $blog->status = BlogStatusEnum::pending();
            if ($request->hasFile('image')) {
                $oldImage = '/public/' . $blog->image;
                Storage::delete($oldImage);
                $image = $request->file('image');
                $destinationPath = "public/blogs/$userId";
                $imageName = $image->getClientOriginalName();
                $path = $request->file('image')->storeAs($destinationPath, $imageName);
                $path = substr($path, 7);
                $blog->image = $path;
            }
            $categoryId = $request->categoryId;
            if (!is_null($categoryId)) {
                $category = Category::find($categoryId);
                $blog->category()->associate($category);
            }
            $blog->save();
            $blog->touch();
            return response()->json([
                'status' => 200,
                'data' => $blog,
            ], 200);
        }
    }

    public function destroy($id)
    {
        $blog = Blog::find($id);
        if (!$blog) {
            return response()->json([
                'status' => 404,
                'message' => 'Blog not found'
            ], 404);
        }
        if (!is_null($blog->image)) {
            $pathImage = '/public/' . $blog->image;
            Storage::delete($pathImage);
        }
        $blog->delete();
        return response()->json([
            'status' => 200,
            'message' => 'Blog was deleted successfully'
        ], 200);
    }

    public function indexBadeOnUser(Request $request, $id)
    {
        $user = User::findOrFail($id);
        if ($user) {
            $blogs = Blog::where('user_id', $id)
                ->with('category')->get();
            if (!is_null($blogs)) {
                return response()->json(['status' => 200, 'data' => $blogs], 200);
            } else {
                return response()->json(['status' => 404, 'data' => 'User has not any blog.'], 404);
            }
        } else {
            return response()->json(['status' => 404, 'data' => 'User not found'], 404);
        }
    }
    public function indexPublishedBlogOfUser(Request $request, $id)
    {
        $user = User::findOrFail($id);
        if ($user) {
            $blogs = Blog::where('user_id', $id)
                ->where('status', BlogStatusEnum::publish())
                ->with('category')->get();
            if (!is_null($blogs)) {
                return response()->json(['status' => 200, 'data' => $blogs], 200);
            } else {
                return response()->json(['status' => 404, 'data' => 'User has not any blog.'], 404);
            }
        } else {
            return response()->json(['status' => 404, 'data' => 'User not found'], 404);
        }
    }

    public function indexBlockedBlogOfUser(Request $request, $id)
    {
        $user = User::findOrFail($id);
        if ($user) {
            $blogs = Blog::where('user_id', $id)
                ->where('status', BlogStatusEnum::block())
                ->with('category')->get();
            if (!is_null($blogs)) {
                return response()->json(['status' => 200, 'data' => $blogs], 200);
            } else {
                return response()->json(['status' => 404, 'data' => 'User has not any blog.'], 404);
            }
        } else {
            return response()->json(['status' => 404, 'data' => 'User not found'], 404);
        }
    }

    public function togglePublishOfBlog(Request $request, $id)
    {
        $blog = Blog::where('id', $id)->with('category')->first();
        if ($blog && $blog->where('status', BlogStatusEnum::publish())) {
            if (!is_null($blog->published_at)) {
                $blog->published_at = null;
                $message = 'Your blog has been successfully unpublished.';
            } else {
                $blog->published_at = Carbon::now()->format('Y-m-d H:i:s');
                $message = 'Your blog has been successfully published.';
            }
            $blog->save();
            return response()->json(['status' => 200, 'data' => $message, 'blog' => $blog], 200);
        } else {
            return response()->json(['status' => 404, 'data' => 'Blog not found'], 404);
        }
    }

    public function indexPendingBlogs(Request $request)
    {
        $blogs = Blog::where('status', BlogStatusEnum::pending())->with('category')->with('user')->get();
        if (!is_null($blogs)) {
            return response()->json(['status' => 200, 'data' => $blogs], 200);
        } else
            return response()->json(['status' => 404, 'data' => 'No blog found'], 404);
    }

    public function verifyBlogs(Request $request)
    {
        $blogIds = $request->blogIds;
        if (!is_null($blogIds)) {
            foreach ($blogIds as $blogId) {
                $blog = Blog::findOrFail($blogId);
                $blog->status = BlogStatusEnum::publish();
                $blog->save();
            }
            return response()->json(['status' => 200, 'data' => 'Blogs are verified successfully']);
        } else
            return response()->json(['status' => 400, 'data' => 'There is not any blogs'], 400);
    }

    public function blockBlogs(Request $request)
    {
        $blogIds = $request->blogIds;
        if (!is_null($blogIds)) {
            foreach ($blogIds as $blogId) {
                $blog = Blog::findOrFail($blogId);
                $blog->status = BlogStatusEnum::block();
                $blog->save();
            }
            return response()->json(['status' => 200, 'data' => 'Blogs are blocked successfully']);
        } else
            return response()->json(['status' => 400, 'data' => 'There is not any blogs'], 400);
    }

    public function indexRandomBlogs(Request $request, $filter)
    {
        switch ($filter) {
            case 'popular':
                $blogs = Blog::query()
                    ->orderBy('like', 'desc')
                    ->orderBy('view', 'desc')
                    ->select('id', 'title', 'body', 'image', 'like', 'view', 'created_at', 'user_id', 'category_id')
                    ->with('category', 'user')
                    ->cursorPaginate(4);
                break;
            case 'newest':
                $blogs = Blog::query()
                    ->orderBy('created_at', 'desc')
                    ->select('id', 'title', 'body', 'image', 'like', 'view', 'created_at', 'user_id', 'category_id')
                    ->with('category', 'user')
                    ->cursorPaginate(4);
                break;
            case 'oldest':
                $blogs = Blog::query()
                    ->orderBy('created_at', 'asc')
                    ->select('id', 'title', 'body', 'image', 'like', 'view', 'created_at', 'user_id', 'category_id')
                    ->with('category', 'user')
                    ->cursorPaginate(4);
                break;
            default:
                $blogs = Blog::query()
                    ->select('id', 'title', 'body', 'image', 'like', 'view', 'created_at', 'updated_at', 'user_id', 'category_id')
                    ->with('category', 'user')
                    ->orderBy('updated_at', 'desc')
                    ->cursorPaginate(4);
                break;
        }
        return response()->json(['status' => 200, 'data' => $blogs]);
    }
}
