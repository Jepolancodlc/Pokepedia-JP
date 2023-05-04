import { Component, Input } from '@angular/core';
import { PokemonService } from 'src/app/pokemon.service';

@Component({
  selector: 'app-pokegrid',
  templateUrl: './pokegrid.component.html',
  styleUrls: ['./pokegrid.component.scss'],
})
export class PokegridComponent {
  @Input() drawer: any;
  @Input() filteredPokemonList: any;
  @Input() numShown: number = 0;

  constructor(protected readonly pokemonService: PokemonService) {}
}
