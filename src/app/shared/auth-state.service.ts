import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { TokenService } from '../shared/token.service';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  private userState: BehaviorSubject<boolean>;
  userAuthState: Observable<boolean>;
  private userRole = new BehaviorSubject<number | null>(null);
  userRoleState = this.userRole.asObservable();

  constructor(public token: TokenService,public authService:AuthService) {
    this.userState = new BehaviorSubject<boolean>(this.token.isLoggedIn()!);
    this.userAuthState = this.userState.asObservable();
    /*this.authService.getRole().subscribe(role => {
      this.userRole.next(role);
    });*/
  }

  setAuthState(value: boolean) {
    this.userState.next(value);
  }
  setAuthRoleState(value:number){
    this.userRole.next(value);
  }
}
