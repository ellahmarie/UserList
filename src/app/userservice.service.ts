import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { UpdateUser, User, UserLogin } from './models/user';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { getLocalStorage, setLocalStorage } from './util/localstorage';

@Injectable({
  providedIn: 'root'
})
export class UserserviceService {
  readonly baseUrl = 'http://localhost:5000';
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
      this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(getLocalStorage() || '{}'));
      this.currentUser = this.currentUserSubject.asObservable();
   }

  getUsers() {
    return this.http.get<User[]>(`${this.baseUrl}/usersdetail`);
  }

  deleteUser(id: number){
    return this.http.delete(`${this.baseUrl}/usersdetail/${id}`)
  }

  updateUser(id: number, user: UpdateUser) {
    return this.http.put(`${this.baseUrl}/usersdetail/${id}`, user);
  }

  getUserById(id: number){
    return this.http.get<User>(`${this.baseUrl}/usersdetail/${id}`).pipe(map(
      user => {
        return user;
      }
    ));
  }

  registerUser(user: UpdateUser) {
    return this.http.post<User>(`${this.baseUrl}/usersdetail`, user).pipe(map(
      user => {
        return user;
      }
    ));
  }

  loginUser(user: UserLogin){
    return this.http.post<User>(`${this.baseUrl}/usersdetail/login`, user).pipe(map(user => {
      if (user) {
        setLocalStorage(user);
        this.currentUserSubject.next(user);
      }
      return user;
    }));
  }
}
