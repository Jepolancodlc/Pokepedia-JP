import { Component } from '@angular/core';
import { PokemonService } from './pokemon.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  selectedTypes: boolean[] = []; // Arreglo que representa el estado de los checkboxes
  numShown = 0;

  constructor(protected readonly pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.pokemonService.getAllPokemonLista();
  }

  get filteredPokemonList() {
    let selectedTypesCount = this.selectedTypes.filter((x) => x).length;

    if (selectedTypesCount === 2) {
      this.pokemonService.numShown = 1008;
      return this.pokemonService.pokemonList.filter((pokemon) => {
        let pokemonTypes = pokemon.type.sort();
        let selectedTypes = this.selectedTypes
          .map((isSelected, index) => {
            if (isSelected) {
              return this.pokemonService.allTypes[index];
            } else {
              return null;
            }
          })
          .filter((x) => x);

        return (
          pokemonTypes.length === 2 &&
          pokemonTypes.includes(selectedTypes[0]) &&
          pokemonTypes.includes(selectedTypes[1])
        );
      });
    } else if (selectedTypesCount === 1) {
      this.pokemonService.numShown = 1008;
      return this.pokemonService.pokemonList.filter((pokemon) => {
        return (
          this.selectedTypes.some((isSelected, index) => {
            if (isSelected) {
              return pokemon.type.includes(this.pokemonService.allTypes[index]);
            }
            return false;
          }) &&
          pokemon.name
            .toLowerCase()
            .includes(this.pokemonService.searchText.toLowerCase())
        );
      });
    } else {
      return this.pokemonService.pokemonList.filter((pokemon) =>
        pokemon.name
          .toLowerCase()
          .includes(this.pokemonService.searchText.toLowerCase())
      );
    }
  }
}
