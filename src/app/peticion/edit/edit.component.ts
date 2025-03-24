import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PeticionService } from '../peticion.service';
import { Peticion } from '../../interfaces/peticion';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { Console } from 'console';
import { Categoria } from '../../interfaces/categoria';
@Component({
  selector: 'app-edit',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit.component.html',
  styleUrl: './edit.component.css',
})
export class EditComponent implements OnInit {
  peticionForm!: FormGroup;

  peticion!: Peticion;
  id!: number;
  categorias!: Categoria[];
  constructor(
    private fb: FormBuilder,
    private petiS: PeticionService,
    public router: Router,
    private route: ActivatedRoute
  ) {
    this.petiS.show(this.route.snapshot.params['id']).subscribe(
      (response) => {
        this.peticion = response;
      },
      (error) => {
        console.error('Error al obtener la petición:', error);
      }
    );
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];
    this.petiS.show(this.id).subscribe(
      (response) => {
        this.peticion = response;
      },
      (error) => {
        console.error('Error al obtener la petición:', error);
      }
    );

    this.peticionForm = this.fb.group({
      titulo: ['', [Validators.required, Validators.minLength(5)]],
      descripcion: ['', [Validators.required, Validators.minLength(10)]],
      destinatario: ['', Validators.required],
      categoria: ['', Validators.required],
    });
    this.petiS.cargaCategorias().subscribe(
      (response) => {
        console.log(response.categorias);
        this.categorias = response.categorias;
      },
      (error) => {
        console.log('Error cargando las categorías');
      }
    );
  }
  submitForm() {
    //const formData = new FormData();
    //formData.append('titulo', peticion.titulo);
    //formData.append('descripcion', peticion.descripcion);
    //formData.append('destinatario', peticion.destinatario);
    //formData.append('categoria_id', peticion.categoria_id?.toString());

    this.petiS.edit(this.peticionForm.value, this.id).subscribe(
      (response) => {
        console.log('Petición modificada con éxito:', response);
        if (response) {
          this.router.navigate(['/peticiones/view', response.id]);
        }
      },
      (error) => {
        console.error('Error al editar la petición:', error);
      }
    );
  }
}
