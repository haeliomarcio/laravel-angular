import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Component({
    selector: 'ap-header',
    templateUrl: './header.component.html'
})
export class HeaderComponent {
    
    isLogged = false;

    constructor(
        private router: Router,
        private authService: AuthService,
    ){
        this.isLogged = this.authService.isLogged();
    }

    logout(){
        localStorage.removeItem('currentUser');
        location.href = '/login';
    }
 }