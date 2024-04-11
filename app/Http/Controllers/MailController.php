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
        $mailbox = MailBox::find('user_id', $request->staff_id);
        if (is_null($mailbox)) {
            return $this->sendNotFound("Mailbox not found!");
        } else {
            Mail::create([
                'mail_box_id' => $mailbox->id,
                'title' => "Pay the Prepayment",
                'text' => sprintf("The employer paid the project %s advance payment.", $request->prjTitle),
                'isRead' => false,
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ]);
            $mailbox->total += 1;
            $mailbox->unread += 1;
            $mailbox->save();
            return response()->json(['status' => 200, 'data' => 'Message was sent successfully.'], 200);
        }
    }

    public function readMail(Request $request, $id)
    {
        $mail = Mail::find($id);
        if (is_null($mail)) {
            return $this->sendNotFound("Mail not found!");
        } else {
            $mail->isRead = true;
            $mailbox = Mailbox::find($mail->mail_box_id);
            if (!is_null($mailbox)) {
                $mailbox->unread -= 1;
                $mailbox->read += 1;
                $mailbox->save();
            }
            $mail->save();
        }
        return response()->json(['status' => 200, 'data' => "Mail has been read."], 200);
    }

    public function showSystemMails(Request $request)
    {
        $userId = $request->user()->id;
        $mailbox = MailBox::where('user_id', $userId)->first();
        if (is_null($mailbox)) {
            return $this->sendNotFound("User has not mailbox.");
        }
        $mails = Mail::where('mail_box_id', $mailbox->id)->where('sender_name', 'SystemAdmin')->get();
        return response()->json(['status' => 200, 'data' => $mails], 200);
    }
}
