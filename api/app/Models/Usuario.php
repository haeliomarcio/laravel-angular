<?php

namespace App\Models;

use Illuminate\Notifications\Notifiable;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;

class Usuario extends Authenticatable implements JWTSubject
{
    use Notifiable;
    
    protected $table = 'usuarios';
    protected $fillable = ['name', 'email', 'birthday', 'phone', 'password'];

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }
    public function getJWTCustomClaims()
    {
        return [];
    }

    public function eventos(){
        return $this->hasMany('App\Models\Evento', 'responsible');
    }
    
}
