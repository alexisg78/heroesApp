import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

import { Hero, Publisher } from '../../interfaces/hero.interface';
import { HeroesService } from '../../services/heroes.service.js';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: ``
})
export class NewPageComponent implements OnInit {

  public heroForm= new FormGroup({
      id:               new FormControl(''),
      superhero:        new FormControl('', { nonNullable: true }),
      publisher:        new FormControl<Publisher>( Publisher.DCComics ),
      alter_ego:        new FormControl(''),
      first_appearance: new FormControl(''),
      characters:       new FormControl(''),
      alt_img:          new FormControl(''),
  })

  public publishers = [
    { id: 'DC Comics', desc: 'DC - Comics' },
    { id: 'Marvel Comics', desc: 'Marvel - Comics' },
  ];

  constructor(
    private heroesService: HeroesService,
    private activateRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar
  ){}

  get currentHero(): Hero {
    const hero = this.heroForm.value as Hero

    return hero;
  }

  ngOnInit(): void {

    if (!this.router.url.includes('edit')) return;

    this.activateRoute.params
      .pipe(
        switchMap( ({ id }) => this.heroesService.getHeroById( id ) )
      ).subscribe( hero => {

        if (!hero) return this.router.navigateByUrl('/');

        this.heroForm.reset( hero );
        return;
      } )

  }

  onSubmit():void {
    if ( this.heroForm.invalid ) return;
    if ( this.currentHero.id ){
      this.heroesService.updateHero( this.currentHero )
        .subscribe( hero => {
            this.showSnackBar(`${hero.superhero} update!`);
        });

        return;
    }

    this.heroesService.addHero( this.currentHero )
      .subscribe( hero => {
        this.router.navigate(['/heroes/edit', hero.id]);
        this.showSnackBar(`${hero.superhero} created!`);
      } )
  }

  showSnackBar( message: string): void {
    this.snackBar.open( message, 'done', {
      duration: 2500
     })
  }

}
