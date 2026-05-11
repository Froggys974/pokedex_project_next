export interface PokeType {
    id: number;
    name: string;
    image: string;
}

export interface PokeStat {
    HP: number;
    speed: number;
    attack: number;
    defense: number;
    specialAttack: number;
    specialDefense: number;
}

export interface PokeEvo {
    name: string;
    pokedexId: number;
}

export interface Poke {
    id: number;
    pokedexId: number;
    name: string;
    image: string;
    sprite: string;
    stats: PokeStat;
    generation: number;
    evolutions: PokeEvo[];
    types: PokeType[];
}
