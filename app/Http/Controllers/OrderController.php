<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;
use \Illuminate\Support\Facades\Validator;
use App\Models\User;
use App\Models\Blog;
use App\Enums\BlogStatusEnum;

class OrderController extends Controller
{

    public function create(Request $request){
        $validator = Validator::make($request->all(),[
            'title'=>'required|string|max:60',
            'description'=>'string|max:16200',
            'minimumPrice'=>'required|numeric|between:50000,10000000',
            'maximumPrice'=>'required|numeric|between:50000,10000000',
            'duration'=>'required|integer'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'data' => $validator->messages()
            ], 422);
        }else{
            $validatedData = $validator->validate();
            $order = Order::create([
                'user_id'=>$request->user()->id,
                'title'=>$validatedData["title"],
                'description'=>$validatedData["description"],
                'category'=>$request->category,
                'minimumPrice'=>$validatedData['minimumPrice'],
                'maximumPrice'=>$validatedData['maximumPrice'],
                'duration'=>$validatedData['duration'],
                'created_at'=>Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at'=>Carbon::now()->format('Y-m-d H:i:s')
            ]);
            if(!is_null($order)){
                return response()->json(['status'=>200,'data'=>"Your order sent successfully."],200);
            }else{
                return response()->json(['status'=>400,'data'=>"Your Order was not sent."],400);
            }
        }
    }

    public function update(Request $request,$id)
    {
        $order = Order::find($id);
        if($order){
            $validator = Validator::make($request->all(),[
                'title'=>'required|string|max:50',
                'description'=>'string|max:16200',
                'minimumPrice'=>'required|decimal',
                'maximumPrice'=>'required|decimal',
                'duration'=>'required|integer'
            ]);
            if ($validator->fails()) {
                return response()->json([
                    'status' => 422,
                    'data' => $validator->messages()
                ], 422);
            }else{
               $validatedData = $validator->validate();
               $order->title = $validatedData['title'];
               $order->description = $validatedData['description'];
               $order->minimumPrice = $validatedData['minimumPrice'];
               $order->maximumPrice = $validatedData['maximumPrice'];
               $order->duration = $validatedData['duration'];
               $order->updated_at = Carbon::now()->format('Y-m-d H:i:s');
            }
            $order->save();
            $order->touch();
            return response()->json(['status'=>200,'date'=>$order],200);
        }else{
            return $this->sendNotFound("Order not found!");
        }
    }

    public function destroy(Request $request,$id)
    {
        $order = Order::find($id);
        if(is_null($order))
        {
            return $this->sendNotFound("Order not found!");
        }else{
            $order->delete();
            return response()->json(['status'=>200,'data'=>'Order was deleted successfully.'],200);
        }
    }

    public function showOrderOfUser(Request $request)
    {
        $user = User::find($request->user())->first();
        if(is_null($user)){
            return $this->sendNotFound("User not found!");;
        }
        $orders = Order::query()
                    ->orderBy('id', 'desc')
                    ->select('id', 'title', 'category', 'duration', 'maximumPrice','description','isAccept','created_at')
                    ->where('user_id',$user->id)
                    ->cursorPaginate(6);
        if(is_null($orders)){
            return response()->json(['status'=>404,'data'=>"There is no orders."],404);
        }
        return response()->json(['status'=>200,'data'=>$orders],200);
    }

    public function getBasedOnStaff(Request $request,$expertise)
    {
        $orders = Order::query()
        ->orderBy('updated_at', 'desc')
        ->select('id','title','duration','minimumPrice','maximumPrice')
        ->where('category',$expertise)
        ->where('isAccept',false)
        ->cursorPaginate(4)
        ->through(function ($order){
            return [
                'id'=>$order->id,
                'title'=>$order->title,
                'duration'=>$order->duration,
                'minimumPrice'=>$order->minimumPrice,
                'maximumPrice'=>$order->maximumPrice,
            ];
        });
        if(is_null($orders))
        {
            return $this->sendNotFound("There is no any orders!");
        }else{
            return Inertia::render('AllOrders',['orders'=>$orders]);
        }
    }

    public function getOrdersOfUser(Request $request)
    {
        $orders = Order::query()
        ->orderBy('updated_at', 'desc')
        ->select('id','title','duration','minimumPrice','maximumPrice')
        ->where('user_id',$request->user()->id)
        ->where('isAccept',false)
        ->cursorPaginate(4);
        if(is_null($orders))
        {
            return $this->sendNotFound("There is no any orders!");
        }else{
            return response()->json(['status'=>200,'data'=>$orders],200);
        }
    }

    public function checkIsAccept(Request $request,$id){
        $decodedId = base64_decode($id);
        $order = Order::find($decodedId);
        if(is_null($order)){
            return $this->sendNotFound("Order not found!");
        }else{
            if($order->isAccept) return response()->json(['status'=>409,'data'=>"The order has already been accepted."],409);
            else return response()->json(['status'=>200,'data'=>'The order is open.'],200);
        }
    }
}
