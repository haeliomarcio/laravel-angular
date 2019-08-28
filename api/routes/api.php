<?php

use Illuminate\Http\Request;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/

Route::middleware(['isLogged'])->group(function () {
    Route::post('login', 'LoginController@login');
    Route::post('recovery-password', 'RecoveryPasswordController@login');

    Route::resources(['usuarios' => 'UsuariosController']);
    Route::resources(['eventos' => 'EventosController']);
});