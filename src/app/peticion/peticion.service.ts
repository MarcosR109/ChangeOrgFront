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
    console.log(peticion);
    return this.http.post<{Message:string,data:Peticion}>("http://127.0.0.1:8000/api/peticiones/store",peticion).pipe(map(
    response => response.data))
  }
  show(peticionid:number){
    return this.http.get<{Message:string,Data:Peticion}>("http://127.0.0.1:8000/api/peticiones/show/"+peticionid).pipe(map(
      response => response.Data)
    );
  }
}
