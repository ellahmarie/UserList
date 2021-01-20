import { Component, OnInit } from '@angular/core';
import { UserserviceService } from '../userservice.service'
import { User } from '../models/user';
import { BehaviorSubject } from 'rxjs';
import { getLocalStorage } from '../util/localstorage';
import { Router } from '@angular/router';

@Component({
  selector: 'app-userlist',
  templateUrl: './userlist.component.html',
  styleUrls: ['./userlist.component.sass']
})
export class UserlistComponent implements OnInit {

  users: User[] = [{
    id: -1,
    firstname: '',
    lastname: '',
    password: '',
    email:''
  }];

  loading = true;
  constructor(private _http: UserserviceService, private router: Router) { }

  ngOnInit(): void {
    this.loadUsers();
  }

  deleteUser(id: number){
    this._http.deleteUser(id).subscribe(() => {
      this.loadUsers();
    });
    
  }

  private loadUsers(){
    this.loading = false;
    this._http.getUsers().subscribe(users => {
      this.users = users;
    })
  }

}
