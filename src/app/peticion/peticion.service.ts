import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Peticion } from '../interfaces/peticion';
import { map } from 'rxjs';
import { HttpHeaders } from '@angular/common/http';
import { TokenService } from '../shared/token.service';
import { Token } from '@angular/compiler';
@Injectable({
  providedIn: 'root',
})
export class PeticionService {
  constructor(private http: HttpClient, private tokenS: TokenService) {}

  index() {
    return this.http.get('http://127.0.0.1:8000/api/peticiones');
  }

  cargaPaginas(pagina: number) {
    return this.http.get('http://127.0.0.1:8000/api/peticiones?page=' + pagina);
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
  myIndex() {
    return this.http.get('http://127.0.0.1:8000/api/peticiones/listMine');
  }
  delete(peticionid: number): Observable<string> {
    console.log(peticionid);
    return this.http
      .delete<{ Message: string }>(
        `http://localhost:8000/api/peticiones/delete/${peticionid}`
      )
      .pipe(map((response) => response.Message));
  }
  edit(peticion: Peticion, peticionid: number): Observable<{ Message: string; Datos: Peticion }> {
    console.log('EDIT', peticion);
    console.log('ID', peticionid);
    return this.http.put<{ Message: string; Datos: Peticion }>(
      `http://localhost:8000/api/peticiones/${peticionid}`,
      peticion
    );
  }

  cargaCategorias(): Observable<any> {
    return this.http.get('http://localhost:8000/api/categorias');
  }
  firmar(id: number): Observable<any> {
    return this.http.put<{ Message: string; Data: Peticion }>(
      'http://localhost:8000/api/peticiones/firmar/' + id,
      {}
    );
  }

  cambiarEstado(id: number): Observable<any> {
    return this.http.put<{ Message: string; Data: Peticion }>(
      'http://localhost:8000/api/peticiones/estado/' + id,
      {}
    );
  }
  firmadas() {
    return this.http.get<{ Message: string; Data: Peticion[] }>(
      'http://localhost:8000/api/peticiones/firmadas'
    );
  }
}
// /*
// Route::controller(PeticioneController::class)->group(function () {
//     Route::get('peticiones', 'index');
//     Route::get('peticiones/firmadas', 'listarFirmadas');
//     Route::get('peticiones/list', 'list');
//     Route::get('peticiones/{id}', 'listMine');
//     Route::get('peticiones/show/{id}', 'show');
//     Route::put('peticiones/{id}', 'update');
//     Route::post('peticiones/store', 'store');
//     Route::put('peticiones/estado/{id}', 'cambiarEstado');
//     Route::delete('peticiones/delete/{id}', 'delete');
//     Route::put('peticiones/firmar/{id}', 'firmar');
// });
// */
