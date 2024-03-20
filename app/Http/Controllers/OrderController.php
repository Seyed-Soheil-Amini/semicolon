<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Order;
use App\Models\Staff;
use Illuminate\Http\Request;
use Inertia\Inertia;
use \Illuminate\Support\Facades\Validator;
use App\Models\User;

class OrderController extends Controller
{

    public function create(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'title' => 'required|string|max:60',
            'description' => 'string|max:16200',
            'minimumPrice' => 'required|numeric|between:49000,10000000',
            'maximumPrice' => 'required|numeric|between:49000,10000000',
            'duration' => 'required|integer'
        ]);
        if ($validator->fails()) {
            return response()->json([
                'status' => 422,
                'data' => $validator->messages()
            ], 422);
        } else {
            $validatedData = $validator->validate();
            $order = Order::create([
                'user_id' => $request->user()->id,
                'title' => $validatedData["title"],
                'description' => $validatedData["description"],
                'category' => $request->category,
                'minimumPrice' => $validatedData['minimumPrice'],
                'maximumPrice' => $validatedData['maximumPrice'],
                'duration' => $validatedData['duration'],
                'created_at' => Carbon::now()->format('Y-m-d H:i:s'),
                'updated_at' => Carbon::now()->format('Y-m-d H:i:s')
            ]);
            if (!is_null($order)) {
                return response()->json(['status' => 200, 'data' => "Your order sent successfully."], 200);
            } else {
                return response()->json(['status' => 400, 'data' => "Your Order was not sent."], 400);
            }
        }
    }

    public function update(Request $request)
    {
        $order = Order::find($request->orderId);
        if (!is_null($order)) {
            $validator = Validator::make($request->all(), [
                'title' => 'required|string|max:50',
                'description' => 'string|max:16200',
                'minimumPrice' => 'required|numeric|between:50000,10000000',
                'maximumPrice' => 'required|numeric|between:50000,10000000',
                'duration' => 'required|integer'
            ]);
            if ($validator->fails()) {
                return response()->json([
                    'status' => 422,
                    'data' => $validator->messages()
                ], 422);
            } else {
                $validatedData = $validator->validate();
                $order->title = $validatedData['title'];
                $order->category = $request->category;
                $order->description = $validatedData['description'];
                $order->minimumPrice = $validatedData['minimumPrice'];
                $order->maximumPrice = $validatedData['maximumPrice'];
                $order->duration = $validatedData['duration'];
                $order->updated_at = Carbon::now()->format('Y-m-d H:i:s');
            }
            $order->save();
            $order->touch();
            return response()->json(['status' => 200, 'date' => 'Your order was updated successfully.'], 200);
        } else {
            return $this->sendNotFound("Order not found!");
        }
    }

    public function destroy(Request $request)
    {
        $order = Order::find($request->orderId);
        if (is_null($order)) {
            return $this->sendNotFound("Order not found!");
        } else {
            $order->delete();
            return response()->json(['status' => 200, 'data' => 'Order was deleted successfully.'], 200);
        }
    }

    public function showOrderOfUser(Request $request)
    {
        $user = User::find($request->user())->first();
        if (is_null($user)) {
            return $this->sendNotFound("User not found!");;
        }
        $orders = Order::query()
            ->orderBy('id', 'desc')
            ->select('id', 'title', 'category', 'duration', 'minimumPrice', 'maximumPrice', 'description', 'isAccept', 'created_at')
            ->where('user_id', $user->id)
            ->simplePaginate(4);
        if (is_null($orders)) {
            return response()->json(['status' => 404, 'data' => "There is no orders."], 404);
        }
        return response()->json(['status' => 200, 'data' => $orders], 200);
    }

    public function orderOfUser(Request $request)
    {
        $user = User::find($request->user())->first();
        if (is_null($user)) {
            return $this->sendNotFound("User not found!");
        }
        $countOrders = Order::query()->where('user_id', $user->id)->count();
        return Inertia::render('Orders', ['totalOrders' => $countOrders]);
    }

    public function numberOrdersBasedOnExpertise(Request $request)
    {
        if ($request->user()->isStaff == 0)
            return response()->json(['status' => 406, 'data' => "You are not staff!"], 406);
        $staffRole = Staff::where('user_id', $request->user()->id)->first();
        $countOrders = Order::query()->where('category', $staffRole->expertise)->where('isAccept', 0)->count();
        return Inertia::render('AcceptOrders', ['totalOrders' => $countOrders, 'staff' => $staffRole]);
    }
    public function getBasedOnStaff(Request $request, $expertise)
    {
        $orders = Order::query()
            ->orderBy('updated_at', 'desc')
            ->select('id', 'title', 'duration', 'category', 'minimumPrice', 'maximumPrice', 'description', 'created_at', 'user_id')
            ->where('category', $expertise)
            ->where('isAccept', false)
            ->with('user')
            ->simplePaginate(6);

        if ($orders->isEmpty()) {
            return $this->sendNotFound("There are no orders!");
        }
        return response()->json(['status' => 200, 'data' => $orders], 200);
    }

    public function getOrdersOfUser(Request $request)
    {
        $orders = Order::query()
            ->orderBy('updated_at', 'desc')
            ->select('id', 'title', 'duration', 'minimumPrice', 'maximumPrice')
            ->where('user_id', $request->user()->id)
            ->where('isAccept', false)
            ->cursorPaginate(4);
        if (is_null($orders)) {
            return $this->sendNotFound("There is no any orders!");
        } else {
            return response()->json(['status' => 200, 'data' => $orders], 200);
        }
    }

    public function checkIsAccept(Request $request, $id)
    {
        $decodedId = base64_decode($id);
        $order = Order::find($decodedId);
        if (is_null($order)) {
            return $this->sendNotFound("Order not found!");
        } else {
            if ($order->isAccept) return response()->json(['status' => 409, 'data' => "The order has already been accepted."], 409);
            else return response()->json(['status' => 200, 'data' => 'The order is open.'], 200);
        }
    }
}
