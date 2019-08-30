<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Usuario;
use Illuminate\Support\Facades\Validator;

class UsuariosController extends Controller
{
    protected $usuarios;

    public function __construct(Usuario $usuario){
        $this->usuarios = $usuario;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return $this->usuarios->paginate(15);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $validation = Validator::make($request->all(), [
            'name' => 'required',
            'email' => 'required|unique:usuarios',
            'birthday' => 'required',
            'phone' => 'required',
            'password' => 'required',
        ]);
        if(!$validation->fails()){
            $usuario = $this->usuarios->create($request->all());
            return response()->json(['dados' => $usuario, 'msg' => 'Usuário inserido com sucesso']);
        } else {
            return response()->json(['status' => 400, 'errors' => $validation->errors()]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        return $this->usuarios->find($id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        return $this->usuarios->find($id);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, $id)
    {
        $validation = Validator::make(
            $request->all(),
            [
                'name' => 'required',
                'email' => 'required|unique:usuarios,email,'.$id,
                'birthday' => 'required',
                'phone' => 'required',
                'password' => 'required',
            ]
        );
        $usuario = $this->usuarios->find($id);
        if(!$validation->fails()){
            $usuarioAtualizado = $usuario->update($request->all());
            return response()->json(['dados' => $usuarioAtualizado, 'msg' => 'Usuário atualizado com sucesso']);
        } else {
            return response()->json(['status' => 400, 'errors' => $validation->errors()]);
        }
        
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function destroy($id)
    {
        $usuario = $this->usuarios->find($id);
        $usuario->delete();
        return response()->json('Usuário deletado com sucesso');

    }
}
