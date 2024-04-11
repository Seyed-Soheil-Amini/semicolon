<?php

namespace App\Http\Controllers;

use App\Models\MailBox;
use App\Models\Mail;
use App\Models\Order;
use \Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;
use App\Models\Project;
use Carbon\Carbon;

class ProjectController extends Controller
{
    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:50',
            'description' => 'string|max:16200',
            'price' => 'required|numeric|between:50000,10000000',
            'duration' => 'required|integer'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'data' => $validator->messages()
            ], 422);
        } else {
            $staff = $request->user();
            if ($staff->isStaff == 0) {
                return response()->json(['status' => 403, 'data' => 'Your are not staff!'], 403);
            }
            $validatedData = $validator->validate();
            $project = Project::create([
                'user' => $request->user_id,
                'staff' => $staff->id,
                'title' => $validatedData['title'],
                'description' => $validatedData['description'],
                'price' => $validatedData['price'],
                'category' => $request->category,
                'duration' => $validatedData['duration'],
                'rate' => 1,
                'isPain' => false,
                'isFinished' => false,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ]);
            if (is_null($project)) {
                return response()->json(['status' => 400, 'data' => 'Unfortunately, project was not created.'], 400);
            } else {
                $mailboxId = MailBox::where('user_id', $request->user_id)->first()->id;
                $order = Order::where('id', $request->order_id)->first();
                $order->isAccept = true;
                $order->save();
                $notifData = array(
                    'projectName' => $project->title,
                    'projectId' => $project->id,
                    'status' => 1,
                );
                Mail::create([
                    'mail_box_id' => $mailboxId,
                    'title' => "Project Acceptance",
                    'text' => sprintf(
                        'Your order with the title %s has been successfully accepted by %s.
                        You can see more information in the projects section.',
                        $project->title,
                        $staff->name
                    ),
                    'data' => $notifData,
                    'isRead' => false,
                    'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                    'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
                ]);
                $data = [
                    'id' => $project->id,
                    'user' => $project->user,
                    'staff' => $project->staff,
                    'title' => $project->title,
                    'price' => $project->price,
                    'duration' => $project->duration
                ];
                return response()->json(['status' => 200, 'data' => $data], 200);
            }
        }
    }

    public function destroy(Request $request, $id)
    {
        $project = Project::find($id);
        if (is_null($project)) {
            return $this->sendNotFound("Project not found!");
        } else {
            if ($project->isPaid) return response()->json(['status' => 422, 'data' => 'The paid prject can not be cancled.'], 422);
            $project->delete();
            return response()->json(['status' => 200, 'data' => "Project was deleted successfully."], 200);
        }
    }

    public function getAll(Request $request)
    {
        $projects = Project::query()
            ->orderBy('updated_at', 'desc')
            ->select('id', 'title', 'price', 'category', 'rate')
            ->with('user', 'staff')
            ->where('isFinished', true)
            ->cursorPaginate(4);
        return response()->json(['status' => 200, 'data' => $projects], 200);
    }

    public function completeProject(Request $request, $id, $rate)
    {
        $decodeId = base64_decode($id);
        $project = Project::find($decodeId);
        if (is_null($project)) {
            return $this->sendNotFound("Project not found!");
        } else {
            $project->isFinished = true;
            if (is_null($rate))
                $project->rate = $rate;
            $project->save();
            return response()->json(['status' => 200, 'data' => 'The project was successfully completed.'], 200);
        }
    }

    public function paidPrePayment(Request $request, $id)
    {
        $project = Project::find(base64_decode($id));
        if (is_null($project)) {
            return $this->sendNotFound("Project not found!");
        } else {
            $project->isPaid = true;
            $project->updated_at = Carbon::now()->format('Y-m-d H:i:s');
            $project->started_at = Carbon::now()->format('Y-m-d H:i:s');
            $project->must_finished_date = Carbon::now()->addDays($project->duration)->format('Y-m-d H:i:s');
            $project->save();
            return response()->json(['status' => 200, 'data' => 'PrePayment of project was paid successfully.'], 200);
        }
    }

    public function checkRemainingTime(Request $request, $id)
    {
        $project = Project::find(base64_decode($id));
        if (is_null($project)) {
            return $this->sendNotFound("Project not found!");
        } else {
            if ($project->isPaid == true) {
                $nowTime = Carbon::parse(Carbon::now()->format('Y-m-d H:i:s'));
                $mustBeFinished = Carbon::parse($project->must_finished_date);
                if ($nowTime->greaterThan($mustBeFinished)) {
                    return response()->json(['status' => 204, 'data' => "The time for the project is over."], 204);
                }
                $remainingTime = $nowTime->diff($mustBeFinished);
                return response()->json(['status' => 200, 'data' => $remainingTime], 200);
            } else {
                return response()->json(['status' => 422, 'data' => "The advance payment for the project has not yet been paid."], 422);
            }
        }
    }
}
