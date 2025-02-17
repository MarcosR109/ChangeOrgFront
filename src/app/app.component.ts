import { Component, OnInit } from '@angular/core';
import { Router, RouterOutlet,RouterModule } from '@angular/router';
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
  imports: [SigninComponent, SignupComponent, RouterOutlet, CommonModule,RouterModule],
})
export class AppComponent implements OnInit {
  isSignedIn!: boolean;
  title = 'ChangeOrgFront';
  constructor(
    private auth: AuthStateService,
    public router: Router,
    public token: TokenService,
    public authS:AuthService,
  ) {}
  ngOnInit() {
    this.auth.userAuthState.subscribe((val) => {
      this.isSignedIn = val;
    });
  }
  // Signout
  signOut() {
    this.auth.setAuthState(false);
    this.authS.logout().subscribe((response)=>console.log(response),(error)=>console.log(error))
    this.token.removeToken();
    this.router.navigate(['peticiones/home']);
  }
}
