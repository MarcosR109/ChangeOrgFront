import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { TokenService } from '../shared/token.service';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
@Injectable({
  providedIn: 'root',
})
export class AuthStateService {
  isAuthenticated = new BehaviorSubject<boolean>(false);
  authStatus = this.isAuthenticated.asObservable();
  role = new BehaviorSubject<number>(0);
  $role = this.role.asObservable();
  constructor(private tokenService: TokenService) {
    this.iniciarEstados();
  }
  iniciarEstados() {
    const token = this.tokenService.getToken();
    if (token) {
      this.isAuthenticated.next(true);
      this.role.next(this.tokenService.getRole());
    }
  }
}
