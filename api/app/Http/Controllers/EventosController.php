<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Evento;
use Illuminate\Support\Facades\Validator;
use Mail;
use App\Mail\CriacaoEvento;

class EventosController extends Controller
{
    protected $eventos;
    
    public function __construct(Evento $evento){
        $this->eventos = $evento;
    }
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return $this->eventos->paginate(15);
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
        $validation = Validator::make(
            $request->all(),
            [
                'title' => 'required',
                'start' => 'required'            
            ]
        );
        if(!$validation->fails()){
            $evento = $this->eventos->create($request->all());
            return response()->json(['dados' => $evento, 'msg' => 'Evento inserido com sucesso']);
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
        return $this->eventos->find($id);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        return $this->eventos->find($id);
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
                'title' => 'required',
                'start' => 'required'            
            ]
        );
        $evento = $this->eventos->find($id);
        if(!$validation->fails()){
            $eventoAtualizado = $evento->update($request->all());
            return response()->json(['dados' => $eventoAtualizado, 'msg' => 'Evento atualizado com sucesso']);
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
        $evento = $this->eventos->find($id);
        $evento->delete();
        return response()->json(['msg' => 'Evento deletado com sucesso.']);
    }
}
