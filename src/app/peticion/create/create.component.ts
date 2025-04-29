import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PeticionService } from '../peticion.service';
import { Peticion } from '../../interfaces/peticion';
import { Router, RouterOutlet, RouterModule } from '@angular/router';
import { Categoria } from '../../interfaces/categoria';
@Component({
  selector: 'app-create',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './create.component.html',
  styleUrl: './create.component.css',
})
export class CreateComponent implements OnInit {
  peticionForm!: FormGroup;
  categorias!: Categoria[];

  constructor(
    private fb: FormBuilder,
    private petiS: PeticionService,
    public router: Router
  ) {}

  ngOnInit(): void {
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
    const file = event.target.files[0];
    this.peticionForm.patchValue({ foto: file });
    this.peticionForm.get('foto')?.updateValueAndValidity();
  }

  submitForm() {
    if (this.peticionForm.valid) {
      const peticion: Peticion = {
        titulo: this.peticionForm.value.titulo,
        descripcion: this.peticionForm.value.descripcion,
        destinatario: this.peticionForm.value.destinatario,
        firmantes: 0,
        estado: 'pendiente',
        categoria_id: Number(this.peticionForm.value.categoria),
      };

      const formData = new FormData();
      formData.append('titulo', peticion.titulo || '');
      formData.append('descripcion', peticion.descripcion || '');
      formData.append('destinatario', peticion.destinatario || '');
      formData.append('categoria_id', peticion.categoria_id?.toString() || '');

      if (this.peticionForm.value.foto) {
        formData.append('foto', this.peticionForm.value.foto);
      }

      console.log('Enviando petición:', peticion);
      console.log('FormData:', formData);
      this.petiS.store(formData).subscribe(
        (response) => {
          console.log('Petición creada con éxito:', response);
          if (response) {
            this.router.navigate(['/peticiones/view', response.id]);
          }
        },
        (error) => {
          console.error('Error al crear la petición:', error);
        }
      );
    }
  }
}
