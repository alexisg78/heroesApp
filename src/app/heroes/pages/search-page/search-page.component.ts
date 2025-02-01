import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Hero } from '../../interfaces/hero.interface.js';
import { HeroesService } from '../../services/heroes.service.js';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: ``
})
export class SearchPageComponent {

  public searchInput= new FormControl('')
  public heroes: Hero[] = [];
  public selectedHero?: Hero;

  constructor( private heroService: HeroesService, private router: Router){}

  searchHero() {
    const value: string = this.searchInput.value || '';

    this.heroService.getSuggestions( value )
      .subscribe( heroes => this.heroes= heroes )
  }

  onSelectionOption( event : MatAutocompleteSelectedEvent ): void {

    if ( !event.option.value ){
      this.selectedHero = undefined;
      return;
    }

    const hero: Hero = event.option.value;
    this.searchInput.setValue( hero.superhero );
    this.selectedHero= hero;
    this.router.navigate(['/heroes', this.selectedHero.id]);
  }
}
