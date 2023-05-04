import { Component, OnInit } from '@angular/core';
import { PokemonService } from './pokemon.service';
import  Pokedex  from 'pokedex-promise-v2';

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

    console.log( this.pokemonService.getAllPokemonLista());

  }
  selectedTypes: boolean[] = []; // Arreglo que representa el estado de los checkboxes


  get filteredPokemonList() {
    let selectedTypesCount = this.selectedTypes.filter(x => x).length; // Contador de tipos seleccionados

    if (selectedTypesCount === 2) { // Se han seleccionado exactamente dos tipos
      return this.pokemonService.pokemonList.filter(pokemon => {
        let pokemonTypes = pokemon.type.sort(); // Ordenamos los tipos del Pokémon para compararlos fácilmente con los tipos seleccionados
        let selectedTypes = this.selectedTypes.map((isSelected, index) => {
          if (isSelected) {
            return this.pokemonService.allTypes[index];
          } else {
            return null;
          }
        }).filter(x => x); // Obtenemos los tipos seleccionados

        return pokemonTypes.length === 2 && // El Pokémon debe tener exactamente dos tipos
               pokemonTypes[0] === selectedTypes[0] && // El primer tipo debe ser el primer tipo seleccionado
               pokemonTypes[1] === selectedTypes[1]; // El segundo tipo debe ser el segundo tipo seleccionado
      });
    } else if (selectedTypesCount === 1) { // Se ha seleccionado un solo tipo
      return this.pokemonService.pokemonList.filter(pokemon => {
        return this.selectedTypes.some((isSelected, index) => {
          if (isSelected) {
            return pokemon.type.includes(this.pokemonService.allTypes[index]);
          }
          return false;
        }) && pokemon.name.toLowerCase().includes(this.searchText.toLowerCase());
      });
    } else { // No se ha seleccionado ningún tipo
      return this.pokemonService.pokemonList.filter(pokemon =>
        pokemon.name.toLowerCase().includes(this.searchText.toLowerCase())
      );
    }
  }


  // Función que se ejecuta cuando se hace clic en un checkbox
  onTypeCheckboxChange(event: Event, index: number) {
    const checked = (event.target as HTMLInputElement).checked;

    // Verificar si ya hay dos tipos seleccionados
    const selectedTypesCount = this.selectedTypes.filter(x => x).length;
    if (selectedTypesCount >= 2 && checked) {
      // Desactivar la selección del checkbox actual
      (event.target as HTMLInputElement).checked = false;
      return;
    }

    // Permitir la selección del checkbox actual
    this.selectedTypes[index] = checked;
  }




}
