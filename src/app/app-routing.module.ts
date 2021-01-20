import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserlistComponent } from './userlist/userlist.component';
import { AdduserComponent } from './adduser/adduser.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { UpdateuserComponent } from './updateuser/updateuser.component';



const routes: Routes = [
  { path: 'user/list', component: UserlistComponent },
  { path: 'user/add', component: AdduserComponent },
  { path: '', component: LoginComponent},
  { path: 'registration', component: RegisterComponent },
  { path: 'user/update/:id', component: UpdateuserComponent },

  { path: "*", component: LoginComponent }
];

export const appRoutingModule = RouterModule.forRoot(routes);
// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }
