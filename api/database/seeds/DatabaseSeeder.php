<?php

use Illuminate\Database\Seeder;
use App\Models\Usuario;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // $this->call(UsersTableSeeder::class);
        Usuario::create({
            'name' => 'Administrador do Sistema',
            'email' => 'administrador@sistema.com.br',
            'birthday' => '1995-04-27',
            'phone' => '8588887777',
            'password' => encrypt('Imts@2019');
        });
    }
}
