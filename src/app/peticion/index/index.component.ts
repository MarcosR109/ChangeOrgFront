import { Component } from '@angular/core';
import { PeticionService } from '../peticion.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Peticion } from '../../interfaces/peticion';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-index',
  imports: [CommonModule,RouterLink],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css'
})
export class IndexComponent {
  /**
   *
   */
  public peticionesList: any[] = [];
  constructor(public peticiones:PeticionService) {
    this.peticionesList = [];
  }

  ngOnInit(): void {
    this.peticiones.index().subscribe((response) => {
      console.log(response);
      this.peticionesList = response; // Guardar los datos para usarlos en la vista
    });
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

}
