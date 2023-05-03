import { Component } from '@angular/core';

export interface Tile {
  color: string;
  cols: number;
  rows: number;
  text: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'pokepediaJP';
  showFiller = false;

  tiles: Tile[] = [
  {text: 'One', cols: 4, rows: 1, color: 'lightblue'},
  {text: 'Three', cols: 1, rows: 1, color: 'lightpink'},
  {text: 'Four', cols: 3, rows: 2, color: '#DDBDF1'},
  ];
}

