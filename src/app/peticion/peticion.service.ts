import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Peticion } from '../interfaces/peticion';
import { map } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { TokenService } from '../shared/token.service';
import { Token } from '@angular/compiler';
@Injectable({
  providedIn: 'root'
})
export class PeticionService {

  constructor(private http:HttpClient,private tokenS:TokenService) { }

  index(): Observable<Peticion[]> {
    return this.http.get<{ Message: string, Data: Peticion[] }>('http://127.0.0.1:8000/api/peticiones')
      .pipe(
        map(response => response.Data) // Extraemos el array de peticiones de 'Data'
      );
  }

  store(peticion:FormData):Observable<any>{
        const token = this.tokenS.getToken();
        const headers = new HttpHeaders({
          Authorization: `Bearer ${token}`,
        });
        console.log(peticion);
    return this.http.post<{Message:string,Data:Peticion}>("http://127.0.0.1:8000/api/peticiones/store",peticion,{headers}).pipe(map(response => response.Data))
  }
}
