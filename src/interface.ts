export interface Pokemon {
  name: string;
  url: string;
}

interface Pokemons {
  id: number;
  name: string;
  sprites: {
    front_default: string;
  };
}

export interface PokemonDetail extends Pokemons {
  abilities?:
    | {
        ability: string;
      }[]
    | undefined;
}

export interface Detail {
  id: number;
  isOpened: boolean;
}
