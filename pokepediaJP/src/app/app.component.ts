import { Component, OnInit } from '@angular/core';
import { PokemonService } from './pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  searchTerm = '';
  searchText: string = '';
  formatSearchResult = (item: any) => item.name;
  formatSearchInput = (value: string) => value.toLowerCase().trim();

  constructor(protected readonly pokemonService: PokemonService) {
  }

  ngOnInit(): void {
    this.pokemonService.getAllPokemonLista();
  }

  get filteredPokemonList() {
    return this.pokemonService.pokemonList.filter(pokemon => pokemon.name.toLowerCase().includes(this.searchText.toLowerCase()));
  }

}
