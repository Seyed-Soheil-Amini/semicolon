<?php

namespace App\Http\Controllers;

use App\Models\MailBox;
use App\Models\Mail;
use Carbon\Carbon;
use Illuminate\Http\Request;

class MailController extends Controller
{
    public function paidMail(Request $request)
    {
        $mailbox = MailBox::find('user_id',$request->staff_id);
        if(is_null($mailbox)){
            return response()->json(['status'=>404,'data'=>'Mailbox not found!'],404);
        }else{
            Mail::create([
                'mail_box_id'=>$mailbox->id,
                'title'=>"Pay the Prepayment",
                'text'=>sprintf("The employer paid the project %s advance payment.",$request->prjTitle),
                'isRead'=>false,
                'created_at'=>Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at'=>Carbon::now()->format('Y-m-d H:i:s')
            ]);
            return response()->json(['status'=>200,'data'=>'Message was sent successfully.'],200);
        }
    }

    public function readMail(Request $request,$id)
    {
        $mail = Mail::find($id);
        if(is_null($mail)){
            return response()->json(['status'=>404,'data'=>"Mail not found!"],404);
        }else{
            $mail->isRead = true;
            $mail->save();
        }
        return response()->json(['status'=>200,'data'=>"Mail has been read."],200);
    }
}
