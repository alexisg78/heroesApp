import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of } from 'rxjs';
import { Hero } from '../interfaces/hero.interface.js';
import { enviroments } from '../../../environment/environments.js';

@Injectable({providedIn: 'root'})
export class HeroesService {

  private baseUrl: string = enviroments.baseUrl;
  constructor(private http: HttpClient) { }

  getHeroes():Observable<Hero[]> {
    return this.http.get<Hero[]>(`${ this.baseUrl }/heroes`)
  }

  getHeroById(id: string): Observable<Hero|undefined> {
    return this.http.get<Hero>(`${this.baseUrl}/heroes/${id}`)
      .pipe(
        catchError( error => of( undefined ) )
       )
  }

  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(`${this.baseUrl}/heroes`, hero)
  }

  updateHero(hero: Hero): Observable<Hero> {
    if ( !hero.id ) throw Error('Hero id is requerid');

    return this.http.patch<Hero>(`${this.baseUrl}/heroes/${hero.id}`, hero)
  }

  deleteHeroById( id: string ): Observable<boolean> {

    return this.http.delete(`${this.baseUrl}/heroes/${id}`)
      .pipe(
        map( resp => true ),
        catchError( err => of(false) ),
       );
  }

  getSuggestions( query: string ): Observable<Hero[]> {
    return this.http.get<Hero[]>( `${this.baseUrl}/heroes/?q=${query}&_limit=6` );
  }

}
