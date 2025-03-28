import { Component } from '@angular/core';
import { AuthService } from '../../../auth/services/auth.service.js';
import { User } from '../../../auth/interfaces/user.interfase.js';
import { Router } from '@angular/router';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: ``
})
export class LayoutPageComponent {


  public sideBarItems = [
    { label: 'Listado', icon: 'label', url:'./list' },
    { label: 'Añadir', icon: 'add', url:'./new-hero' },
    { label: 'Buscar', icon: 'search', url:'./search' }
  ]

  constructor (
    private authService: AuthService,
    private router: Router

  ) {}

  get user(): User | undefined {
    return this.authService.getCurrentUser;
  }

  onLogOut(){
    this.authService.onLogOut()
    this.router.navigate(['/auth/login'])
  }

}
