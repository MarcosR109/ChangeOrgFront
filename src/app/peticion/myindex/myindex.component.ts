import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { Peticion } from '../../interfaces/peticion';
import { PeticionService } from '../peticion.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../shared/auth.service';
import { AuthStateService } from '../../shared/auth-state.service';
@Component({
  selector: 'app-myindex',
  imports: [RouterModule, CommonModule, RouterLink],
  templateUrl: './myindex.component.html',
  styleUrl: './myindex.component.css'
})
export class MyindexComponent {
  public peticionesList: any[] = [];
  constructor(public peticiones:PeticionService,private authS:AuthStateService) {
    this.peticionesList = [];
  }
  

  ngOnInit(): void {
    this.peticiones.myIndex().subscribe((response) => {
      console.log(response);
      this.peticionesList = response;
    });
  }
}
