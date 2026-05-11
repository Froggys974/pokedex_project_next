import Link from "next/link";
import Image from "next/image";
import { Poke } from "@/types/pokemon";
import PokeTypeCard from "./PokeTypeCard";

export default function PokeCard({ pokemon }: { pokemon: Poke }) {
  return (
    <Link className="flex flex-col items-center gap-2 bg-gray-800 rounded-xl border border-gray-700 p-4 hover:border-red-500 hover:-translate-y-0.5 transition-all" href={`/pokemons/${pokemon.pokedexId}`}>
      <span className="text-xs text-gray-500 self-start">#{pokemon.pokedexId}</span>
      <Image src={pokemon.image} alt={pokemon.name} width={96} height={96} />
      <p className="font-semibold capitalize text-white">{pokemon.name}</p>
      <div className="flex gap-1 flex-wrap justify-center">
        {pokemon.types.map((type) => (
          <PokeTypeCard key={type.id} type={type} />
        ))}
      </div>
    </Link>
  );
}
