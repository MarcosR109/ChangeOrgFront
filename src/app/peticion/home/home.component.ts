import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { AuthStateService } from '../../shared/auth-state.service';
import { TokenService } from '../../shared/token.service';
import { ChangeDetectorRef } from '@angular/core';
@Component({
  selector: 'app-home',
  imports: [RouterModule,CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  isSignedIn = false; // Variable para verificar si el usuario está logueado

constructor(private tokenService:TokenService,private authState:AuthStateService,private cd:ChangeDetectorRef) {
}
ngOnInit(){
  this.authState.authStatus.subscribe((status) => {
    console.log(status);
    this.isSignedIn = status;
    this.cd.detectChanges(); // <- FORZA la detección de cambios cuando cambia isSignedIn
  });
}

}

