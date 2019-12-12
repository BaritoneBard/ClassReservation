import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { SearchformComponent } from './components/searchform/searchform.component';
import { ReserveformComponent } from './components/reserveform/reserveform.component';
import { RoomformComponent } from './components/roomform/roomform.component';
import { NewuserComponent } from './components/newuser/newuser.component';

const routes: Routes = [
  {path: '', redirectTo:'/home',pathMatch: 'full' },
  {path: 'home', component: HomeComponent },
  {path: 'login', component: LoginComponent },
  {path: 'searchform', component:SearchformComponent},
  {path: 'reserveform', component:ReserveformComponent},
  {path: 'roomform', component:RoomformComponent},
  {path: 'newuser', component:NewuserComponent},
  {path: '**', redirectTo: ''}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
