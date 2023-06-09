import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, debounceTime, distinctUntilChanged, map } from 'rxjs';
import Pokedex from 'pokedex-promise-v2';
import { IPokemon } from './IPokemon';
import PokeAPI from 'pokedex-promise-v2';

const pokedex = new Pokedex();

@Injectable({
  providedIn: 'root',
})
export class PokemonService {
  private pokedex: Pokedex = new PokeAPI;
  public pokemonList: any[] = [];
  allTypes: string[] = [];
  searchText: string = '';

  numShown = 50;
  numMoreToShow = 10;

  constructor(private http: HttpClient) {
    this.getAllTypes();
  }

  getAllTypes() {
    this.pokedex.getTypesList().then((response) => {
      response.results.forEach((result) => {
        this.pokedex.getTypeByName(result.name).then((type) => {
          this.allTypes.push(type.name);
        });
      });
    });
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
    pokedex.getPokemonsList({ limit: 1008 }).then((response) => {
      const pokemonPromises = response.results.map((result: any) => {
        return pokedex.getPokemonByName(result.name);
      });
      Promise.all(pokemonPromises).then((pokemons) => {
        this.pokemonList = pokemons.map(this.transformPokemon);
      });
    });
  }


  transformPokemon(pokemon: any): IPokemon {
    return {
      id: pokemon.id,
      name: pokemon.name,
      spriteUrl: pokemon.sprites.front_default,
      type: pokemon.types.map((type: any) => type.type.name),
      imageUrl: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokemon.id}.png`,
      stats: {
        hp: pokemon.stats.find((stat: any) => stat.stat.name === 'hp')
          .base_stat,
        attack: pokemon.stats.find((stat: any) => stat.stat.name === 'attack')
          .base_stat,
        defense: pokemon.stats.find((stat: any) => stat.stat.name === 'defense')
          .base_stat,
        speed: pokemon.stats.find((stat: any) => stat.stat.name === 'speed')
          .base_stat,
      },
    };
  }
}
