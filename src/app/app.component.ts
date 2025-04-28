import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { TokenService } from './shared/token.service';
import { AuthStateService } from './shared/auth-state.service';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { CommonModule } from '@angular/common';
import { AuthService } from './shared/auth.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  imports: [
    SigninComponent,
    SignupComponent,
    RouterOutlet,
    CommonModule,
    RouterModule,
  ],
})
export class AppComponent implements OnInit {
  isSignedIn!: boolean;
  isAdmin!: boolean;
  title = 'ChangeOrgFront';
  constructor(
    private auth: AuthStateService,
    public router: Router,
    public token: TokenService,
    public authS: AuthService
  ) {}
  ngOnInit() {
    this.auth.authStatus.subscribe((status) => {
      console.log(status);
      this.isSignedIn = status;
    });
  }
  // Signout
  signOut() {
    this.authS.logout().subscribe(
      (response) =>console.log(response),
      (error) => console.log(error)
    );
    this.auth.isAuthenticated.next(false);
    this.auth.role.next(1);
    this.token.deleteToken();
    this.token.deleteRole();
    this.router.navigate(['peticiones/home']);
  }
}
