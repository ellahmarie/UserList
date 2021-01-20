import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { BehaviorSubject } from 'rxjs';
import { first } from 'rxjs/operators';
import { UpdateUser, User } from '../models/user';
import { UserserviceService } from '../userservice.service';
import { MustMatch } from '../util/validator';


@Component({
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.sass']
})
export class UpdateuserComponent implements OnInit {
  updateForm!: FormGroup;
  user: User = new User();
  id: number = 0;
  fromList = false;
  submitted = false;
  loading = false;

  constructor(private _http: UserserviceService,
              private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router) {
    
                      
    this.route.params.subscribe(params => {
      this.id = parseInt(params['id']);
      this._http.getUserById(this.id).pipe(first()).subscribe(user => {
        if (user){
          this.user = user;
        }
      });
    });
   }

  ngOnInit(): void {
    this.updateForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        firstname: ['', Validators.required],
        lastname: ['', Validators.required],
        cpassword: ['', Validators.required]
      }, {
        validator: MustMatch('password', 'cpassword')
    
  });

    console.log(this.user);
    if (this.user === undefined || null) {
      this.userList();
    }
  }

  get f() { return this.updateForm.controls; }

  updateUser(){
    this.loading = true;
    this.submitted = true;

    if (this.updateForm.invalid) {
      this.loading = false;
      return;
    }


    this._http.updateUser(this.id, this.updateForm.value).subscribe(() => {
      console.log('succesfully updated');
      this.userList();
    });;
  }

  userList(){
    this.router.navigate(['/user/list']);
  }
}
