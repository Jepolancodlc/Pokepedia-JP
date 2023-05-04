import { Component, Input } from '@angular/core';
import { PokemonService } from 'src/app/pokemon.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss'],
})
export class SidenavComponent {
  @Input()selectedTypes!: boolean[];

  formatSearchInput = (value: string) => value.toLowerCase().trim();

  constructor(public pokemonService: PokemonService) {}

    // Función que se ejecuta cuando se hace clic en un checkbox
    public onTypeCheckboxChange(event: Event, index: number) {
      const checked = (event.target as HTMLInputElement).checked;

      // Verificar si ya hay dos tipos seleccionados
      const selectedTypesCount = this.selectedTypes.filter((x) => x).length;
      if (selectedTypesCount >= 2 && checked) {
        // Desactivar la selección del checkbox actual
        (event.target as HTMLInputElement).checked = false;
        return;
      }

      // Permitir la selección del checkbox actual
      this.selectedTypes[index] = checked;
    }

  showMore() {
    this.pokemonService.numShown += this.pokemonService.numMoreToShow;
  }
}
