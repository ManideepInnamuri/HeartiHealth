import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'ngx-ecommerce',
  templateUrl: './e-commerce.component.html',
})
export class ECommerceComponent {
  constructor(private router: Router){
    const isUserLoggedIn = JSON.parse(localStorage.getItem('isUserLoggedIn'));

    if(!isUserLoggedIn){
      router.navigateByUrl('/login');
    }
  }
}
