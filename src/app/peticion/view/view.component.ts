import { Component, OnInit } from '@angular/core';
import { PeticionModule } from '../peticion.module';
import { Peticion } from '../../interfaces/peticion';
import { PeticionService } from '../peticion.service';
import { ActivatedRoute } from '@angular/router';
import { log } from 'node:console';
import { CommonModule } from '@angular/common';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-view',
  imports: [CommonModule],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css',
})
export class ViewComponent implements OnInit {
  peticion: Peticion = {};
  error: string = '';
  constructor(
    private peticionService: PeticionService,
    private route: ActivatedRoute,
    private cd: ChangeDetectorRef
  ) {}
  ngOnInit(): void {
    this.route.paramMap.subscribe((params) => {
      const id = params.get('id');
      console.log('ID recibido:', id);
      if (id) {
        this.peticionService.show(Number(id)).subscribe(
          (data) => {
            this.peticion = data;
            if (this.peticion?.files) {
              this.peticion.files.push(...this.peticion.files);
            }
          },
          (error) => {
            console.error('Error al obtener la petición:', error);
          }
        );
      }
    });
  }
  firmar(id: number) {
    console.log('ID a firmar:', id);
    this.peticionService.firmar(id).subscribe(
      (data: any) => {
        console.log('Petición firmada:', data);
        if (this.peticion && this.peticion.firmantes !== undefined) {
          this.peticion = {
            ...this.peticion,
            firmantes: this.peticion.firmantes + 1,
          };
        }
      },
      (error: any) => {
        this.error = 'Ya has firmado esta petición';
        console.error('Error al firmar la petición:', error);
      }
    );
  }
}
