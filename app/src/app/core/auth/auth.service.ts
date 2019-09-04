import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root'})
export class AuthService {

    constructor() {
        
    }

   isLogged(){
       if(localStorage.getItem('currentUser') == null){
           return false;
       }
       return true;
   }


}