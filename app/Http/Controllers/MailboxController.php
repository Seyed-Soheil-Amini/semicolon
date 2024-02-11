<?php

namespace App\Http\Controllers;

use App\Models\MailBox;
use Illuminate\Http\Request;
use Carbon\Carbon;

class MailboxController extends Controller
{
    public function create(Request $request)
    {
        $mailbox = MailBox::create([
            'user_id'=>$request->user()->id,
            'total'=>0,
            'sent'=>0,
            'receive'=>0,
            'read'=>0,
            'unread'=>0,
            'created_at'=>Carbon::now()->format('Y-m-d H:i:s'),
            'updated_at'=>Carbon::now()->format('Y-m-d H:i:s')
        ]);
        if($mailbox)
            return response()->json(['status'=>200,'data'=>'Mailbox was created successfully.'],200);
        else
            return response()->json(['status'=>400,'data'=>"Mailbox was not created!"],400);
    }
}
