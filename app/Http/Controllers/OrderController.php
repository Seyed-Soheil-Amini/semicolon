<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Order;
use Illuminate\Http\Request;
use Inertia\Inertia;
use \Illuminate\Support\Facades\Validator;
use App\Models\User;

class OrderController extends Controller
{

    public function create(Request $request){
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
            if($order){
                return response()->json(['status'=>201,'data'=>"Your order sent successfully."],201);
            }else{
                return response()->json(['status'=>400,"data"=>"Your Order was not sent."],400);
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
            return response()->json(['status'=>404,"data"=>"Order not found!"],404);
        }
    }

    public function destroy(Request $request,$id)
    {
        $order = Order::find($id);
        if(is_null($order))
        {
            return response()->json(['status'=>404,'data'=>'Order not found!'],404);
        }else{
            $order->delete();
            return response()->json(['status'=>200,'data'=>'Order was deleted successfully.'],200);
        }
    }
    public function showOrderOfUser(Request $request)
    {
        $user = User::find($request->user())[0];
        if(is_null($user)){
            return response()->json(['status'=>404,'data'=>"User not found!"],404);
        }
        $orders = Order::where('user_id',$user->id)->select('id','title','category')->get();
        return Inertia::render('Orders',[
            'orders'=> $orders,
        ]);
    }

    public function getBasedOnCategory(Request $request,$expertise)
    {
        $orders = Order::query()
        ->orderBy('updated_at', 'desc')
        ->select('id','title','duration','minimumPrice','maximumPrice')
        ->where('category',$expertise)
        ->where('isAccept',false)
        ->cursorPaginate(4);
        if(is_null($orders))
        {
            return response()->json(['status'=>404,'data'=>"There is no any orders!"],404);
        }else{
            return response()->json(['status'=>200,'data'=>$orders],200);
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
            return response()->json(['status'=>404,'data'=>"There is no any orders!"],404);
        }else{
            return response()->json(['status'=>200,'data'=>$orders],200);
        }
    }

    public function checkIsAccept(Request $request,$id){
        $decodedId = base64_decode($id);
        $order = Order::find($decodedId);
        if(is_null($order)){
            return response()->json(['status'=>404,'data'=>'Order not found!'],404);
        }else{
            if($order->isAccept) return response()->json(['status'=>409,'data'=>"The order has already been accepted."],409);
            else return response()->json(['status'=>200,'data'=>'The order is open.'],200);
        }
    }

}
