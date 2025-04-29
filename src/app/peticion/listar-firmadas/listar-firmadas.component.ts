import { Component } from '@angular/core';
import { Peticion } from '../../interfaces/peticion';
import { PeticionService } from '../peticion.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-listar-firmadas',
  imports: [CommonModule, RouterLink],
  templateUrl: './listar-firmadas.component.html',
  styleUrl: './listar-firmadas.component.css',
})
export class ListarFirmadasComponent {
  peticionesList!: Peticion[];
  constructor(private peticionService: PeticionService) {}
  ngOnInit(): void {
    this.peticionService.firmadas().subscribe((response) => {
      console.log(response);
      this.peticionesList = response.Data;
    });
  }
}
