<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Evento extends Model
{
    protected $table = 'eventos';
    protected $fillable = ['responsible', 'title', 'description', 'start', 'end'];


    public function usuario(){
        return $this->belongsTo('App\Models\Usuario', 'id');
    }
}
