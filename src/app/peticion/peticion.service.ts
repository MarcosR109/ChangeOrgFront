import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Peticion } from '../interfaces/peticion';
import { map } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { TokenService } from '../shared/token.service';
import { Token } from '@angular/compiler';
import { response } from 'express';
@Injectable({
  providedIn: 'root',
})
export class PeticionService {
  constructor(private http: HttpClient, private tokenS: TokenService) {}

  index(): Observable<Peticion[]> {
    return this.http
      .get<{ Message: string; Data: Peticion[] }>(
        'http://127.0.0.1:8000/api/peticiones'
      )
      .pipe(
        map((response) => response.Data) // Extraemos el array de peticiones de 'Data'
      );
  }

  store(peticion: FormData): Observable<any> {
    console.log(peticion);
    return this.http
      .post<{ Message: string; data: Peticion }>(
        'http://127.0.0.1:8000/api/peticiones/store',
        peticion
      )
      .pipe(map((response) => response.data));
  }
  show(peticionid: number) {
    return this.http
      .get<{ Message: string; Data: Peticion }>(
        'http://127.0.0.1:8000/api/peticiones/show/' + peticionid
      )
      .pipe(map((response) => response.Data));
  }
  myIndex(): Observable<Peticion[]> {
    return this.http
      .get<{ Message: string; Data: Peticion[] }>(
        'http://127.0.0.1:8000/api/peticiones/listMine'
      )
      .pipe(map((response) => response.Data));
  }
  delete(peticionid: number): Observable<string> {
    console.log(peticionid);
    return this.http
      .delete<{ Message: string }>(
        `http://localhost:8000/api/peticiones/delete/${peticionid}`
      )
      .pipe(map((response) => response.Message));
  }
  edit(peticion: FormData,peticionid:number): Observable<Peticion> {
    return this.http
      .put<{ Message: string; Datos: Peticion }>(
        `http://localhost:8000/api/peticiones/${peticionid}`,peticion
      )
      .pipe(map((response) => response.Datos)
      );
  }

  cargaCategorias():Observable<any>{
    return this.http.get("http://localhost:8000/api/categorias");
  }
}
/*

Route::controller(PeticioneController::class)->group(function () {
    Route::get('peticiones', 'index');
    Route::get('peticiones/firmadas', 'listarFirmadas');
    Route::get('peticiones/list', 'list');
    Route::get('peticiones/{id}', 'listMine');
    Route::get('peticiones/show/{id}', 'show');
    Route::put('peticiones/{id}', 'update');
    Route::post('peticiones/store', 'store');
    Route::put('peticiones/estado/{id}', 'cambiarEstado');
    Route::delete('peticiones/delete/{id}', 'delete');
    Route::put('peticiones/firmar/{id}', 'firmar');
});*/
