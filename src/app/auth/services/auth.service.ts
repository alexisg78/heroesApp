import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { enviroments } from '../../../environment/environments';
import { User } from '../interfaces/user.interfase';

@Injectable({providedIn: 'root'})
export class AuthService {

  private baseUrl = enviroments.baseUrl
  private user?: User

  constructor(private http: HttpClient) { }

  get getCurrentUser(): User | undefined {
    if ( !this.user ) return undefined;
    return structuredClone( this.user )
  }

  login( email: string, password: string ): Observable<User> {
    // http.post('login', { email, password })  idealmente se hace un post

    return this.http.get<User>(`${ this.baseUrl }/users/1`)
      .pipe(
        tap( user => this.user= user ),
        tap( user => localStorage.setItem('token', 'akfpap12kroasofañsfñ' )),
      )
  }

  checkAutentication(): Observable<boolean> {
    if ( !localStorage.getItem('token') ) return of( false )

    const token= localStorage.getItem('token');

    return this.http.get<User>(`${ this.baseUrl }/users/1`)
      .pipe(
        tap( user => this.user = user),
        map( user => !!user),
        catchError( err => of(false) )
      )

  }

  onLogOut(): void {
    this.user= undefined;
    localStorage.clear();
  }

}
