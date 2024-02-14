<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProfileUpdateRequest;
use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Redirect;
use Illuminate\Support\Facades\Storage;
use Inertia\Inertia;
use Inertia\Response;

class ProfileController extends Controller
{
    /**
     * Display the user's profile form.
     */
    public function edit(Request $request): Response
    {
        return Inertia::render('Profile/Edit', [
            'mustVerifyEmail' => $request->user() instanceof MustVerifyEmail,
            'status' => session('status'),
        ]);
    }

    /**
     * Update the user's profile information.
     */
    public function update(ProfileUpdateRequest $request)
    {
        $validated = $request->validated();
        $user = $request->user();
        if(is_null($user)){
            return $this->sendNotFound("User not found!");;
        }
        $user->name = $validated['name'];
        $user->email = $validated['email'];
        $user->job_title = $validated['jobTitle'];
        $user->about = $validated['about'];
        $userId = $user->id;
        if ($request->hasFile('image')) {
            $destinationPath = "public/users/$userId";
            $image = $request->file('image');
            $imageName = $image->getClientOriginalName();
            $path = $request->file('image')->storeAs($destinationPath, $imageName);
            $path = substr($path, 7);
            $oldImage = $user->image;
            if(!is_null($oldImage)){
                $oldImagePath = '/public/' . $oldImage;
                Storage::delete($oldImagePath);
            }
            $user->image = $path;
        }else if(!$request->has('image') && !$request->has('noChangeImage')){
            if(!is_null($user->image)){
                $oldImage = $user->image;
                $oldImagePath = '/public/' . $oldImage;
                Storage::delete($oldImagePath);
                $user->image = null;
            }
        }
        if ($request->user()->isDirty('email')) {
            $request->user()->email_verified_at = null;
        }

        $user->save();
        return response()->json(['status'=>200,
        'data'=>[
        'name'=>$user->name,
        'email'=>$user->email,
        'jobTitle'=>$user->job_title,
        'about'=>$user->about,
        'image'=>$user->image]],200);
    }

    /**
     * Delete the user's account.
     */
    public function destroy(Request $request): RedirectResponse
    {
        $request->validate([
            'password' => ['required', 'current_password'],
        ]);

        $user = $request->user();

        Auth::logout();

        $user->delete();

        $request->session()->invalidate();
        $request->session()->regenerateToken();

        return Redirect::to('/');
    }
}
