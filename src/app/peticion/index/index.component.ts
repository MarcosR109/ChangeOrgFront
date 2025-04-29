import { Component } from '@angular/core';
import { PeticionService } from '../peticion.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Peticion } from '../../interfaces/peticion';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { AuthStateService } from '../../shared/auth-state.service';
import { log } from 'node:console';

@Component({
  selector: 'app-index',
  imports: [CommonModule, RouterLink],
  templateUrl: './index.component.html',
  styleUrl: './index.component.css',
})
export class IndexComponent {
  /**
   *
   */
  public peticionesList: any[] = [];
  public isAdmin: boolean = false;
  currentPage = 1;
  totalPages = 0;
  nextPageUrl!: string | null;
  previousPageUrl!: string | null;

  constructor(
    public peticiones: PeticionService,
    private auth: AuthStateService
  ) {
    this.peticionesList = [];
  }

  ngOnInit(): void {
    this.cargaPeticiones();
    this.auth.$role.subscribe((role) => {
      console.log('ROL SUSCRITO', role);
      this.isAdmin = role == 1;
    });
  }

  cargaPeticiones(n: number = 1): void {
    this.peticiones.cargaPaginas(n).subscribe((response: any) => {
      console.log(response);
      this.peticionesList = response.Data.data;
      this.currentPage = response.Data.current_page;
      this.nextPageUrl = response.Data.next_page_url;
      this.totalPages = response.Data.last_page;
      this.previousPageUrl = response.Data.prev_page_url;
      console.log('currentp', this.currentPage);
      console.log('nextp', this.nextPageUrl);
      console.log('prevp', this.previousPageUrl);
      console.log('tot', this.totalPages);
      console.log('data', this.peticionesList);
    });
  }

  delete(peticionId: number): void {
    this.peticiones.delete(peticionId).subscribe(
      (response) => {
        console.log(response);
      },
      (error) => {
        console.log(error);
      }
    );
    this.peticionesList = this.peticionesList.filter(
      (peticion) => peticion.id !== peticionId
    );
  }
  cambiarEstado(id: number): void {
    this.peticiones.cambiarEstado(id).subscribe(
      (response: any) => {
        console.log(response);
        this.peticionesList = this.peticionesList.map((peticion) => {
          if (peticion.id === id) {
            return { ...peticion, estado: response.publicada };
          }
          return peticion;
        });
      },
      (error: any) => {
        console.log(error);
      }
    );
  }
  pagesArray(): number[] {
    return Array(this.totalPages)
      .fill(0)
      .map((_, i) => i + 1);
  }

  onPageChange(newPage: number) {
    if (newPage < 1 || newPage > this.totalPages) {
      return;
    }
    this.cargaPeticiones(newPage);
  }
}
