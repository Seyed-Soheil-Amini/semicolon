<?php

namespace App\Http\Controllers;

use App\Models\Blog;
use App\Models\Category;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\DB;
use Inertia\Inertia;

class UserController extends Controller
{

    public function get(Request $request, $id){
        $id = base64_decode($id);
        $user = User::findOrFail($id);
        $favoriteCategory = $user->blogs()
        ->select('category_id', DB::raw('COUNT(*) as count'))
        ->groupBy('category_id')
        ->orderByDesc('count')
        ->first();
        return Inertia::render('User', [
            'user' => $user,
            'favoriteCategory' => is_null($favoriteCategory) ? ['name' => null] : Category::find($favoriteCategory->category_id),
        ]);
    }

    public function getShortActivityInfo(Request $request, $id)
    {
        $user = User::withCount('blogs')->find($id);
        if (is_null($user)) return response()->json(['status' => 404, 'data' => "User not found!"], 404);
        $averageViews = Blog::where('user_id', $id)->avg('view');
        $favoriteCategory = $user->blogs()
            ->select('category_id', DB::raw('COUNT(*) as count'))
            ->groupBy('category_id')
            ->orderByDesc('count')
            ->first();

        $activity = [
            'numberOfBlogs' => $user->blogs_count,
            'avgViews' => number_format($averageViews, 2),
            'favoriteCategory' => is_null($favoriteCategory) ? ['name' => 'Empty'] : Category::find($favoriteCategory->category_id),
        ];
        return response()->json([
            'status' => 200,
            'data' => $activity,
        ], 200);
    }

    public function indexUsersForAdmin(Request $request)
    {
        $users = User::select('id', 'name', 'email', 'isAdmin', 'image', 'job_title', 'about', DB::raw('(SELECT COUNT(*) FROM blogs WHERE user_id = users.id) as blog_count'))->get();
        if (is_null($users))
            return response()->json(['status' => 404, 'data' => 'There is no any user!']);
        foreach ($users as $user) {

            $lbt = Blog::where('user_id', $user->id)->orderBy('created_at', 'desc')->first();
            $user->last_blog_time = is_null($lbt) ? '_' : Carbon::parse($lbt->created_at)->diffForHumans();
        }
        return response()->json(['status' => 200, 'data' => $users]);
    }

    public function deleteUser(Request $request)
    {
        $usersId = json_decode($request->usersId);
        if (!is_null($usersId)) {
            foreach ($usersId as $userId) {
                $user = User::find($userId);
                if (!is_null($user))
                    $user->delete();
            }
        } else {
            return response()->json(['status' => 404, 'data' => 'User not found!']);
        }
        return response()->json(['status' => 200, 'data' => 'Users have been successfully deleted.']);
    }

}
