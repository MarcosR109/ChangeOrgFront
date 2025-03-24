import { Component } from '@angular/core';
import { PeticionService } from '../peticion.service';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Peticion } from '../../interfaces/peticion';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { AuthStateService } from '../../shared/auth-state.service';

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
  constructor(
    public peticiones: PeticionService,
    private auth: AuthStateService
  ) {
    this.peticionesList = [];
  }

  ngOnInit(): void {
    this.peticiones.index().subscribe((response) => {
      console.log(response);
      this.peticionesList = response;
    });
    this.auth.userRoleState.subscribe((role) => {
      this.isAdmin = role === 1;
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
}
