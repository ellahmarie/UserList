import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { first } from 'rxjs/operators';
import { UserserviceService } from '../userservice.service';
import { MustMatch } from '../util/validator';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.sass']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  email: any;
  submitted = false;
  loading = false;

  constructor(private _http: UserserviceService,  private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit(): void {
      this.registerForm = this.formBuilder.group({
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        cpassword: ['', Validators.required]
      }, {
        validator: MustMatch('password', 'cpassword')
    });
  }

  get f() { return this.registerForm.controls; }

  registerUser() {
    this.loading = true;
    this.submitted = true;

    if (this.registerForm.invalid) {
      this.loading = false;
      return;
    }
    
    return this._http.registerUser(this.registerForm.value).pipe(first()).subscribe(user => {
      console.log('created successfully.');
      this.login();
    });
  }

  login(){
    this.router.navigate(['']);
  }
}
