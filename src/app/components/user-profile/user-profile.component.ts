import { Component, OnInit } from '@angular/core';
import { AuthService } from './../../shared/auth.service';
import { TokenService } from '../../shared/token.service';
// User interface
export class User {
  name: any;
  email: any;
}
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss'],
})
export class UserProfileComponent implements OnInit {
  UserProfile!: User;
  constructor(public authService: AuthService, private token: TokenService) {
    this.authService.profileUser(token).subscribe((data: any) => {
      console.log(data);
      this.UserProfile = data;
    });
  }
  ngOnInit() {}
}
