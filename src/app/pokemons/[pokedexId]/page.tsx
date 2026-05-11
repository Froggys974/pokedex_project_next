import api from "@/lib/api";
import BackButton from "@/components/ui/BackButton";
import PokeTypeCard from "@/components/ui/PokeTypeCard";
import { Poke } from "@/types/pokemon";
import Image from "next/image";
import Link from "next/link";

type Params = Promise<{ pokedexId: string }>;

export default async function PokemonDetailPage({ params }: { params: Params }) {
  const { pokedexId } = await params;
  const pokemon = await api.get<Poke>(`/pokemons/${pokedexId}`);
  const stats = Object.entries(pokemon.stats) as [string, number][];

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <BackButton />

      <div className="bg-gray-800 rounded-2xl border border-gray-700 p-8 flex flex-col gap-8">

        <div className="flex flex-col items-center gap-2">
          <span className="text-gray-500 text-sm">#{pokemon.pokedexId}</span>
          <Image src={pokemon.image} alt={pokemon.name} width={180} height={180} />
          <h1 className="text-2xl font-bold capitalize">{pokemon.name}</h1>
          <div className="flex gap-2">
            {pokemon.types.map((type) => (
              <PokeTypeCard key={type.id} type={type} />
            ))}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Statistiques</h2>
          {stats.map(([key, value]) => (
            <div key={key} className="flex items-center gap-3">
              <span className="text-xs text-gray-400 w-24 shrink-0 capitalize">{key}</span>
              <span className="text-sm font-semibold w-8 text-right">{value}</span>
              <div className="flex-1 bg-gray-700 rounded-full h-2">
                <div
                  className="bg-red-500 h-2 rounded-full"
                  style={{ width: `${Math.min((value / 255) * 100, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {pokemon.evolutions.length > 0 && (
          <div className="flex flex-col gap-3">
            <h2 className="text-sm font-semibold text-gray-400 uppercase tracking-wide">Évolutions</h2>
            <div className="flex gap-4 flex-wrap">
              {pokemon.evolutions.map((evo) => (
                <Link
                  key={evo.pokedexId}
                  href={`/pokemons/${evo.pokedexId}`}
                  className="flex flex-col items-center gap-1 bg-gray-700 rounded-xl p-3 hover:border-red-500 border border-gray-600 transition-colors"
                >
                  <Image
                    src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${evo.pokedexId}.png`}
                    alt={evo.name}
                    width={64}
                    height={64}
                  />
                  <span className="text-xs capitalize">#{evo.pokedexId} {evo.name}</span>
                </Link>
              ))}
            </div>
          </div>
        )}

      </div>
    </main>
  );
}
