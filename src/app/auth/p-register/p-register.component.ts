import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from '../../services/auth/auth-service.service';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-p-register',
  templateUrl: './p-register.component.html',
  styleUrls: ['./p-register.component.scss']
})
export class PRegisterComponent implements OnInit {

  items;
  checkoutForm;

  constructor( private authService: AuthServiceService, private router: Router,
    private toastrService: NbToastrService) { }

  onSubmit(){
    this.authService.register(this.checkoutForm.value).subscribe((response: any) => {
      if (response.password === this.checkoutForm.value.password) {
        this.router.navigateByUrl('/login');
      }else{
        this.toastrService.show('Please enter correct username or password', 'Error!', { status: 'danger' });
      }
    });
  }

  ngOnInit() {
  }

}
