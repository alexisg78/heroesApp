import { Component, OnInit } from '@angular/core';
import { HeroesService } from '../../services/heroes.service.js';
import { ActivatedRoute, Router } from '@angular/router';
import { delay, switchMap } from 'rxjs';
import { Hero } from '../../interfaces/hero.interface.js';

@Component({
  selector: 'app-hero-page',
  templateUrl: './hero-page.component.html',
  styles: ``
})
export class HeroPageComponent implements OnInit {

  public hero?: Hero;

  constructor(
    private heroService: HeroesService,
    private activateRoute: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.activateRoute.params
    .pipe(
      delay(1000),
      switchMap( ({ id }) => this.heroService.getHeroById( id ) ),
    ).subscribe( hero => {
        if ( !hero )  return this.router.navigate( ['/heroes/list'] );
        this.hero= hero;
        return;
      })
  }

  goBack():void {
    this.router.navigateByUrl('heroes/list')
  }
}
