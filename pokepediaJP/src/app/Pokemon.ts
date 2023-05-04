export interface Pokemon {
  id: number;
  name: string;
  spriteUrl: string;
  type: string[];
  imageurl: string;
  stats: {
    hp: number;
    attack: number;
    defense: number;
    speed: number;
  };
}
