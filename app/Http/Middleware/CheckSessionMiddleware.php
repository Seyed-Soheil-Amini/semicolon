<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class CheckSessionMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (!$request->hasSession()) {
            return response('Not Acceptable.', 406);
        } else {
            if (session()->getId() == '') {
                return response('Access is locked!', 423);
            }
        }
        return $next($request);
    }
}
