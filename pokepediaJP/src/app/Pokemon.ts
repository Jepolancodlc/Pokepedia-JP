export interface Pokemon {
  id: number;
  name: string;
  spriteUrl: string;
  type: string[];
  imageUrl: string;
  stats: {
    hp: number;
    attack: number;
    defense: number;
    speed: number;
  };
}
