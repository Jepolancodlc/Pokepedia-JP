import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, debounceTime, distinctUntilChanged, map } from 'rxjs';
import Pokedex from 'pokedex-promise-v2';
import PokeAPI from 'pokedex-promise-v2';

const pokedex = new Pokedex();

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private readonly apiUrl = 'https://pokeapi.co/api/v2';
  private pokedex: Pokedex = new PokeAPI();
  public pokemonList: any[] = [];
  searchText: string = '';

  constructor(private http: HttpClient) { }

  getAllPokemon(): Promise<any[]> {
    return this.pokedex
      .getPokemonsList()
      .then((response: { results: any }) => response.results);
  }

  getPokemon(name: string): Observable<any> {
    const url = `${this.apiUrl}/pokemon/${name}`;
    return this.http.get(url);
  }

  get filteredPokemonList() {
    return this.pokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(this.searchText.toLowerCase())
    );
  }

  get PokemonNames(): string[] {
    return this.pokemonList.map((pokemon) => pokemon.name);
  }

  search = (text$: Observable<string>) =>
    text$.pipe(
      debounceTime(200),
      distinctUntilChanged(),
      map((term) =>
        term.length < 1
          ? []
          : this.PokemonNames.filter(
            (name) => name.toLowerCase().indexOf(term.toLowerCase()) > -1
          ).slice(0, 5)
      )
    );

  public getAllPokemonLista() {
    pokedex.getPokemonsList().then((response) => {
      const pokemonPromises = response.results.map((result: any) => {
        return pokedex.getPokemonByName(result.name);
      });
      Promise.all(pokemonPromises).then((pokemons) => {
        this.pokemonList = pokemons.map((pokemon: any) => {
          return {
            id: pokemon.id,
            name: pokemon.name,
            spriteUrl: pokemon.sprites.front_default,
            type: pokemon.types.map((type: any) => type.type.name),
            imageurl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
            stats: {
              hp: pokemon.stats.find((stat: any) => stat.stat.name === 'hp')
                .base_stat,
              attack: pokemon.stats.find(
                (stat: any) => stat.stat.name === 'attack'
              ).base_stat,
              defense: pokemon.stats.find(
                (stat: any) => stat.stat.name === 'defense'
              ).base_stat,
              speed: pokemon.stats.find(
                (stat: any) => stat.stat.name === 'speed'
              ).base_stat,
            },
          };
        });
      });
    });
  }


  public getAllPokemonLista1() {
    this.getAllPokemon()
      .then((response: any[]) => {
        this.pokemonList = response.map((pokemon: any) => ({
          name: pokemon.name,
          id: pokemon.id,
          imageurl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.url?.match(/\/(\d+)\/$/)?.[1]
            }.png`,
        }));
      })
      .catch((error: any) => console.log(error));
  }
}
