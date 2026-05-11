'use client';

import { useRouter, useSearchParams } from "next/navigation";
import { PokeType } from "@/types/pokemon";

type Props = {
  allTypes: PokeType[];
};

export default function PokeFilters({ allTypes }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function handleNameParam(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    if (value) params.set("name", value);
    else params.delete("name");
    router.push(`/pokemons?${params}`);
  }

  function handleLimitParam(value: string) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("limit", value);
    router.push(`/pokemons?${params}`);
  }

  function handleTypeParam(id: number, checked: boolean) {
    const params = new URLSearchParams(searchParams.toString());
    const current = params.getAll("types").map(Number);
    if (checked) {
      params.append("types", String(id));
    } else {
      params.delete("types");
      current.filter((t) => t !== id).forEach((t) => params.append("types", String(t)));
    }
    router.push(`/pokemons?${params}`);
  }

  return (
    <div className="flex flex-wrap gap-4 items-end mb-6">
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-400">Nom</label>
        <input
          type="text"
          defaultValue={searchParams.get("name") ?? ""}
          onChange={(e) => handleNameParam(e.target.value)}
          placeholder="Rechercher..."
          className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-red-500"
        />
      </div>

      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-400">Limit</label>
        <input
          type="number"
          defaultValue={searchParams.get("limit") ?? "50"}
          min={1}
          max={100}
          onChange={(e) => handleLimitParam(e.target.value)}
          className="bg-gray-800 border border-gray-700 rounded-lg px-3 py-2 text-sm text-white w-24 focus:outline-none focus:border-red-500"
        />
      </div>

      <div className="flex flex-wrap gap-2">
         {/* TODO: ajouter si j'ai le temps un max de type a afficher et un bouton afficher + de types */}
        {allTypes.map((type) => {
          const checked = searchParams.getAll("types").includes(String(type.id));
          return (
            <label
              key={type.id}
              className={`text-xs px-3 py-1.5 rounded-full border cursor-pointer transition-colors ${
                checked
                  ? "bg-red-600 border-red-600 text-white"
                  : "bg-gray-800 border-gray-700 text-gray-300 hover:border-red-500"
              }`}
            >
              <input
                type="checkbox"
                className="hidden"
                checked={checked}
                onChange={(e) => handleTypeParam(type.id, e.target.checked)}
              />
              {type.name}
            </label>
          );
        })}
      </div>
    </div>
  );
}
