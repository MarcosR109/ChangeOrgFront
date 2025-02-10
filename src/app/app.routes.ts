import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { PeticionRoutingModule } from './peticion/peticion-routing.module';
import { PeticionModule } from './peticion/peticion.module';
import { IndexComponent } from './peticion/index/index.component';
export const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: SigninComponent },
  { path: 'register', component: SignupComponent },
  { path: 'profile', component: UserProfileComponent },
  { path : 'index',component:IndexComponent }
];
@NgModule({
  imports: [RouterModule.forRoot(routes),PeticionRoutingModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
