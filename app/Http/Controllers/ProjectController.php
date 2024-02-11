<?php

namespace App\Http\Controllers;

use App\Models\MailBox;
use App\Models\Message;
use \Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\Project;
use Carbon\Carbon;

class ProjectController extends Controller
{
    public function create(Request $request)
    {
        $validator = Validator::make($request->all(),[
            'title'=>'required|string|max:50',
            'description'=>'string|max:16200',
            'price'=>'required|decimal',
            'duration'=>'required|integer'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'data' => $validator->messages()
            ], 422);
        }else{
            $staff = $request->user();
            if($staff->isStaff==0){
                return response()->json(['status'=>403,'data'=>'Your are not staff!'],403);
            }
            $validatedData = $validator->validate();
            $project = Project::create([
                'user'=>$request->user_id,
                'staff'=>$staff->id,
                'title'=>$validatedData['title'],
                'description'=>$validatedData['description'],
                'price'=>$validatedData['price'],
                'category'=>$request->category,
                'duration'=>$validatedData['duration'],
                'rate'=>1,
                'isPain'=>false,
                'isFinished'=>false,
                'created_at'=>Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at'=>Carbon::now()->format('Y-m-d H:i:s')
            ]);
            if(is_null($project)){
                return response()->json(['status'=>400,'data'=>'Unfortunately, project was not created.'],400);
            }else{
                $mailboxId = MailBox::where('user_id',$request->user_id);
                Message::create([
                    'mail_box_id'=>$mailboxId,
                    'title'=>"Project Acceptance",
                    'text'=>sprintf('Your order with the title %s has been successfully accepted by %s.
                        You can see more information in the projects section.',$project->title,$staff->name),
                    'isRead'=>false,                
                    'created_at'=>Carbon::now()->format('Y-m-d H:i:s'),
                    'updated_at'=>Carbon::now()->format('Y-m-d H:i:s')
                ]);
                $data = [
                'id'=>$project->id,
                'user'=>$project->user,
                'staff'=>$project->staff,
                'title'=>$project->title,
                'price'=>$project->price,
                'duration'=>$project->duration];
                return response()->json(['status'=>200,'data'=>$data],200);
            }
        }
    }

    public function completeProject(Request $request,$id,$rate)
    {
        $decodeId = base64_decode($id);
        $project = Project::find($decodeId);
        if(is_null($project)){
            return response()->json(['status'=>404,'data'=>'Project not found!'],404);
        }else{
            $project->isFinished = true;
            if(is_null($rate))
                $project->rate = $rate;
            $project->save();
            return response()->json(['status'=>200,'data'=>'The project was successfully completed.'],200);
        }
    }
}
