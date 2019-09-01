<?php

namespace App\Http\Controllers;

use App\Models\Usuario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;
use Tymon\JWTAuth\Exceptions\JWTException;
use JWTAuth;

class LoginController extends Controller
{
    protected $usuario;
    public function __construct(Usuario $usuario)
    {
        $this->usuario = $usuario;
    }

    public function login(Request $request)
    {
            $usuario  = $this->usuario->where('email', $request->email)->first();
        $credentials = $request->only('email', 'password');
        try {
            if (! $token = JWTAuth::attempt($credentials)) {
                return response()->json(['error' => 'Usuário e Senha inválido.'], 400);
            }
        } catch (JWTException $e) {
            return response()->json(['error' => 'Erro ao criar Token'], 500);
        }

        return response()->json(compact('usuario', 'token'));
    }

    public function registrar(Request $request)
    {
            $validator = Validator::make($request->all(), [
            'name' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:usuarios', 
            'password' => 'required|string|min:6|confirmed',
        ]);

        if($validator->fails()){
                return response()->json($validator->errors()->toJson(), 400);
        }

        $usuario = Usuario::create([
            'name' => $request->get('name'),
            'email' => $request->get('email'),
            'password' => Hash::make($request->get('password')),
        ]);

        $token = JWTAuth::fromUser($usuario);

        return response()->json(compact('usuario','token'),201);
    }

    public function getAuthenticatedUser()
        {
                print_r(JWTAuth::parseToken()->authenticate()); die;
                try {

                        if (! $usuario = JWTAuth::parseToken()->authenticate()) {
                                return response()->json(['user_not_found'], 404);
                        }

                } catch (Tymon\JWTAuth\Exceptions\TokenExpiredException $e) {

                        return response()->json(['token_expired'], $e->getStatusCode());

                } catch (Tymon\JWTAuth\Exceptions\TokenInvalidException $e) {

                        return response()->json(['token_invalid'], $e->getStatusCode());

                } catch (Tymon\JWTAuth\Exceptions\JWTException $e) {

                        return response()->json(['token_absent'], $e->getStatusCode());

                }

                return response()->json(compact('usuario'));
        }
}
