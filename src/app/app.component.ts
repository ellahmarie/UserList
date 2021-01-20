import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { Observable } from 'rxjs';
import { User } from './models/user';
import { getLocalStorage, setLocalStorage } from './util/localstorage';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass']
})
export class AppComponent {
  title = 'User';
  user!:User;

  constructor(private router: Router) { }

  ngOnInit(): void{
    if (getLocalStorage() === '{}'){
      this.router.navigate(['']);
    }
  }

  currentUser() {
    if (getLocalStorage() === '{}'){
        return false;
    }
    return true;
  }

  logout() {
    setLocalStorage({});
  }
}
