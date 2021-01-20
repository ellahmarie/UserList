import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { UserserviceService } from '../userservice.service';
import { getLocalStorage } from '../util/localstorage';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.sass']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  returnUrl = '';
  errorMessage = '';
  isShown = false;
  loading = false;
  submitted = false;
  
  
  constructor(private _http: UserserviceService, 
              private formBuilder: FormBuilder,
              private router: Router) {
                
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
  });
   }

  ngOnInit(): void {
    if (getLocalStorage() !== '{}'){
      this.router.navigate(['/user/list']);
    }
  }

  get f() { return this.loginForm.controls; }

  loginUser() {
    this.loading = true;
    this.submitted = true;

    if (this.loginForm.invalid) {
      this.loading = false;
      return;
    }

    this._http.loginUser(this.loginForm.value).pipe(first()).subscribe(
      user => {
        console.log(user);
        if (user.id != -1) {
          this.router.navigate(['/user/list']);
        }
        else {
          this.isShown = true;
          this.loading = false;
          this.errorMessage = 'Invalid credentials.';
        }
      },
      error => {
        this.isShown = true;
        this.loading = false;
        this.errorMessage = 'Something went wrong.';
      })

  }
}
