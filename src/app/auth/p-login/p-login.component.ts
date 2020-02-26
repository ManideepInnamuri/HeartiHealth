import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { AuthServiceService } from '../../services/auth/auth-service.service';
import { Router } from '@angular/router';
import { NbToastrService } from '@nebular/theme';

@Component({
  selector: 'ngx-p-login',
  templateUrl: './p-login.component.html',
  styleUrls: ['./p-login.component.scss']
})
export class PLoginComponent implements OnInit {
  items;
  checkoutForm;
  submitted;

  constructor(private formBuilder: FormBuilder,
    private authService: AuthServiceService, private router: Router,
    private toastrService: NbToastrService) {
    this.checkoutForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;

    this.authService.login(this.checkoutForm.value).subscribe((response: any) => {
      if (response.password === this.checkoutForm.value.password) {
        this.router.navigateByUrl('/pages');
        localStorage.setItem('isUserLoggedIn', "true");
      }else{
        this.toastrService.show('Please enter correct username or password', 'Error!', { status: 'danger' });
      }
    });

    // stop here if form is invalid
    // if (this.checkoutForm.invalid) {
    //     return;
    // }
  }

  ngOnInit() {
  }

}
