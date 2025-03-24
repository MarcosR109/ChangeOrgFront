import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { TokenService } from './token.service';
import { Token } from '@angular/compiler';
import { response } from 'express';
// User interface
export class User {
  name!: String;
  email!: String;
  password!: String;
  password_confirmation!: String;
  role!: String;
}
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}
  // User registration
  register(user: User): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/register', user);
  }
  // Login
  signin(user: User): Observable<any> {
    return this.http.post<any>('http://127.0.0.1:8000/api/login', user);
  }
  // Access user profile
  profileUser(): Observable<any> {
    return this.http.get('http://127.0.0.1:8000/api/user-profile', {});
  }
  logout(): Observable<any> {
    return this.http.post('http://127.0.0.1:8000/api/logout', {}, {});
  }
  getRole(): Observable<number> {
    console.log("🔹 Enviando petición al servidor...");
    return this.http.get<{ role_id: number }>('http://127.0.0.1:8000/api/me').pipe(
      map(response => {
        return response.role_id;
      })
    );
  }
}
