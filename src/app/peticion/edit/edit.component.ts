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
  error!: any;
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
      foto: [null, Validators.required],
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
  onFileSelected(event: any) {
    if (event.target.files.length > 3) {
      this.error = 'Máximo de tres fotos';
      return;
    }
    this.error = '';
    const file = event.target.files;
    console.log('Selected file:', file);
    this.peticionForm.patchValue({ foto: file });
    this.peticionForm.get('foto[]')?.updateValueAndValidity();
    console.log('value' , this.peticionForm.get('foto[]'));
  }
  submitForm(peticionForm: FormGroup) {
    
    const formData = new FormData();
    formData.append('titulo', peticionForm.value.titulo || '');
    formData.append('descripcion', peticionForm.value.descripcion || '');
    formData.append('destinatario', peticionForm.value.destinatario || '');
    formData.append('categoria_id', peticionForm.value.categoria_id?.toString() || '');
    formData.append('_method', 'POST');
    if (peticionForm.value.foto) {
      for (let file of peticionForm.value.foto) {
        console.log('file', file);
        formData.append('foto', file);
      }
    }

    console.log(this.peticionForm.value);
    this.petiS.edit(this.peticionForm.value, this.id).subscribe(
      (response) => {
        console.log('Petición modificada con éxito:', response);
        if (response) {
         // this.router.navigate(['/peticiones/view', response.id]);
        }
      },
      (error) => {
        console.error('Error al editar la petición:', error);
      }
    );
  }
}
