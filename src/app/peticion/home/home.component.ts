import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthStateService } from '../../shared/auth-state.service';
import { TokenService } from '../../shared/token.service';

@Component({
  selector: 'app-home',
  imports: [RouterModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

constructor(private tokenService:TokenService) {
  this.isSignedIn = tokenService.isLoggedIn() || false;
}

isSignedIn:boolean;
}
