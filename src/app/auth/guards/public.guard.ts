import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanMatch, GuardResult, MaybeAsync, RouterStateSnapshot, Route, UrlSegment, Router } from '@angular/router';
import { AuthService } from '../services/auth.service.js';
import { map, Observable, tap } from 'rxjs';

@Injectable({providedIn: 'root'})
export class PublicGuard implements CanActivate, CanMatch {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  checkStatusAuth (): boolean | Observable<boolean> {
    return this.authService.checkAutentication()
      .pipe(
        tap( isAuthtenticated => {
          if ( isAuthtenticated ){
            this.router.navigate(['./'])
          }
        }),
        map( isAuthenticated => !isAuthenticated )
      )
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): MaybeAsync<GuardResult> {
    return this.checkStatusAuth()
  }

  canMatch(route: Route, segments: UrlSegment[]): MaybeAsync<GuardResult> {
    return this.checkStatusAuth()
  }

}
