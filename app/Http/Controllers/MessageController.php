<?php

namespace App\Http\Controllers;

use App\Models\Message;
use \Illuminate\Support\Facades\Validator;
use Illuminate\Http\Request;

class MessageController extends Controller
{
    public function create(Request $request){
        $validator = Validator::make($request->all(), [
            'senderName' => 'required|string|max:100',
            'email' => 'required|email',
            'subject'=>'required|string|max:255',
            'body' => 'nullable|string|max:16000',
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'data' => $validator->messages()
            ], 422);
        }else{
            $validatedData = $validator->validate();
            $message = Message::create([
                'sender_name'=> $validatedData['senderName'],
                'email'=>$validatedData['email'],
                'subject'=>$validatedData['subject'],
                'body'=>$validatedData['body']
            ]);
            if ($message) {
                return response()->json([
                    'status' => 201,
                    'data' => 'Your message has been saved successfully'
                ], 201);
            } else {
                return response()->json([
                    'status' => 400,
                    'data' => 'Message was not saved successfuly'
                ], 400);
            }
        }
    }

    public function indexMessages(Request $request){
        $messages = Message::query()
        ->orderBy('created_at', 'desc')
        ->select('id','sender_name', 'email', 'subject', 'body')
        ->cursorPaginate(10);
        return response()->json(['status' => 200, 'data' => $messages]);
    }
}
