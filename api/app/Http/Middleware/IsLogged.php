<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Support\Facades\Redis;
class IsLogged
{
    /**
     * Handle an incoming request.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \Closure  $next
     * @return mixed
     */
    public function handle($request, Closure $next)
    {
        //Redis::set('name', 'Taylor');
        //$values = Redis::lrange('names', 5, 10);
        //echo $values; die;
        //print_r($request->header('token')); die;
        return $next($request);
    }
}
