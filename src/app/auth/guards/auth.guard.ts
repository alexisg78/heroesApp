import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, Route, UrlSegment, GuardResult, MaybeAsync, RouterStateSnapshot, Router } from '@angular/router';
import { Observable, of, tap } from 'rxjs';
import { AuthService } from '../services/auth.service.js';

@Injectable({providedIn: 'root'})
export class AuthGuard implements CanMatch, CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  checkAuthStatus(): boolean | Observable<boolean> {

    return this.authService.checkAutentication()
      .pipe(
        tap( isAuthenticated => console.log('Authtenticated: ', isAuthenticated)),
        tap( isAuthenticated => {
          if( !isAuthenticated ) {
            this.router.navigate(['./auth/login'])
          }
        })
      )
  }

  canMatch(route: Route, segments: UrlSegment[]): boolean | Observable<boolean> {
    return this.checkAuthStatus()
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean | Observable<boolean> {
    return this.checkAuthStatus()
  }

}
