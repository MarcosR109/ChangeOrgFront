import { Component, OnInit } from '@angular/core';
import { PeticionModule } from '../peticion.module';
import { Peticion } from '../../interfaces/peticion';
import { PeticionService } from '../peticion.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view',
  imports: [],
  templateUrl: './view.component.html',
  styleUrl: './view.component.css'
})
export class ViewComponent implements OnInit{
  peticion:Peticion ={};

  constructor(
    private peticionService:PeticionService,
    private route:ActivatedRoute
  ) {} 
  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const id = params.get('id');
      console.log('ID recibido:', id);
      if (id) {
        this.peticionService.show(Number(id)).subscribe(
          (data) => {
            this.peticion = data;
            if (this.peticion?.file) {
              this.peticion.file.file_path = data.file?.name;
            }
            console.log(this.peticion);
            console.log(this.peticion.file?.name);
          },
          (error) => {
            console.error('Error al obtener la petición:', error);
          },
        );
      }
    });
  }

}
