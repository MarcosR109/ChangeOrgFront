import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Peticion } from '../interfaces/peticion';
import { map } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class PeticionService {

  constructor(private http:HttpClient) { }
  index(): Observable<Peticion[]> {
    return this.http.get<{ Message: string, Data: Peticion[] }>('http://127.0.0.1:8000/api/peticiones')
      .pipe(
        map(response => response.Data) // Extraemos el array de peticiones de 'Data'
      );
  }
}
