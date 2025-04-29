import { NgModule, ViewChild } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { PeticionModule } from './peticion/peticion.module';
import { IndexComponent } from './peticion/index/index.component';
import { CreateComponent } from './peticion/create/create.component';
import { HomeComponent } from './peticion/home/home.component';
import { ViewComponent } from './peticion/view/view.component';
import { MyindexComponent } from './peticion/myindex/myindex.component';
import { EditComponent } from './peticion/edit/edit.component';
import { ListarFirmadasComponent } from './peticion/listar-firmadas/listar-firmadas.component';
export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: SigninComponent },
  { path: 'register', component: SignupComponent },
  { path: 'profile', component: UserProfileComponent },
  { path: 'peticiones/create', component: CreateComponent },
  { path: 'peticiones/home', component: HomeComponent },
  { path: 'peticiones/index', component: IndexComponent },
  { path: 'peticiones/view/:id', component: ViewComponent },
  { path: 'peticiones/listMine', component: MyindexComponent },
  { path: 'peticiones/listarFirmadas', component: ListarFirmadasComponent },
  { path: 'peticiones/edit/:id', component: EditComponent },
  { path: 'index', component: IndexComponent },
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
