import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, debounceTime, distinctUntilChanged, map } from 'rxjs';
import  Pokedex  from 'pokedex-promise-v2';
import PokeAPI from 'pokedex-promise-v2';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private readonly apiUrl = 'https://pokeapi.co/api/v2';
  private pokedex: Pokedex = new PokeAPI;
  public pokemonList: any[] = [];
  searchText: string = '';

  constructor(private http: HttpClient) {}

  getAllPokemon(): Promise<any[]> {
    return this.pokedex.getPokemonsList().then((response: { results: any; }) => response.results);
  }

  getPokemon(name: string): Observable<any> {
    const url = `${this.apiUrl}/pokemon/${name}`;
    return this.http.get(url);
  }

  get filteredPokemonList() {
    return this.pokemonList.filter(pokemon => pokemon.name.toLowerCase().includes(this.searchText.toLowerCase()));
  }

  get PokemonNames(): string[] {
    return this.pokemonList.map(pokemon => pokemon.name);
  }

  public getAllPokemonLista() {
    this.getAllPokemon()
      .then((response: any[]) => {
        this.pokemonList = response.map((pokemon: any) => ({
          name: pokemon.name,
          spriteUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url?.match(/\/(\d+)\/$/)?.[1]}.png`,
        }));
      })
      .catch((error: any) => console.log(error));
  }

  search = (text$: Observable<string>) =>
  text$.pipe(
    debounceTime(200),
    distinctUntilChanged(),
    map(term => term.length < 1 ? []
      : this.PokemonNames.filter(name => name.toLowerCase().indexOf(term.toLowerCase()) > -1).slice(0, 5))
  );
}

