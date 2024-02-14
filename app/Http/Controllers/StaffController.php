<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class StaffController extends Controller
{
    //
    public function getAboutStaff(Request $request,$id){
        $decodedId = base64_decode($id);
        $staff = User::find($decodedId);
        $isStaff = $staff->isStaff==1;
        if(is_null($staff) && $isStaff){
            return $this->sendNotFound("Staff not found!");
        }else{
            $userData = [
                'id'=>$staff->id,
                'name'=>$staff->name,
                'email'=>$staff->email,
                'job_title'=>$staff->job_title,
            ];
            return response()->json(['status'=>200,'data'=>$userData],200);
        }
    }
}
