import api from "@/lib/api";
import { Poke, PokeType } from "@/types/pokemon";
import PokeList from "@/app/pokemons/_components/PokeList";
import PokeFilters from "./_components/PokeFilters";

type SearchParams = Promise<{
  name?: string;
  types?: string | string[];
  limit?: string;
}>;

export default async function PokemonsPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;
  const limit = Number(params.limit) || 50;
  const types = [params.types].flat().filter(Boolean).map(Number);
  const name = params.name;

  const [initialPokemons, allTypes] = await Promise.all([
    api.get<Poke[]>(`/pokemons?page=1&limit=${limit}${name ? `&name=${name}` : ""}${types.map((id) => `&types=${id}`).join("")}`),
    api.get<PokeType[]>("/types"),
  ]);
  // console.log(initialPokemons);
  

  return (
    <main className="p-4">
      <h1 className="text-4xl font-bold text-red-600 mb-6">Pokédex</h1>
      <PokeFilters allTypes={allTypes} />
      <PokeList
        key={`${name ?? ""}-${types.join(",")}-${limit}`}
        initialPokemonsList={initialPokemons}
        filters={{ name, types, limit }}
      />
    </main>
  );
}
