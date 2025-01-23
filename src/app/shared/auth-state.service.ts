import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { TokenService } from '../shared/token.service';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  private userState: BehaviorSubject<boolean>;
  userAuthState: Observable<boolean>;
  constructor(public token: TokenService) {
    this.userState = new BehaviorSubject<boolean>(this.token.isLoggedIn()!);
    this.userAuthState = this.userState.asObservable();
  }
  setAuthState(value: boolean) {
    this.userState.next(value);
  }
}
