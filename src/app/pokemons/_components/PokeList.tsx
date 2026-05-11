'use client';

import { useEffect, useReducer, useRef } from "react";
import { Poke } from "@/types/pokemon";
import api from "@/lib/api";
import PokeCard from "@/components/ui/PokeCard";

type Filters = {
  name?: string;
  types?: number[];
  limit: number;
};

type Props = {
  initialPokemonsList: Poke[];
  filters: Filters;
};

type State = {
  pokemons: Poke[];
  page: number;
  hasMore: boolean;
  isLoading: boolean;
};

type Action =
  | { type: "RESET"; payload: Poke[] }
  | { type: "LOAD_START" }
  | { type: "LOAD_END"; payload: Poke[]; limit: number };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "RESET":
      return { pokemons: action.payload ?? [], page: 2, hasMore: true, isLoading: false };
    case "LOAD_START":
      return { ...state, isLoading: true };
    case "LOAD_END":
      return {
        ...state,
        pokemons: [...state.pokemons, ...action.payload],
        page: state.page + 1,
        hasMore: action.payload.length >= action.limit,
        isLoading: false,
      };
  }
}

export default function PokeList({ initialPokemonsList, filters }: Props) {
  const [state, dispatch] = useReducer(reducer, {
    pokemons: initialPokemonsList ?? [],
    page: 2,
    hasMore: (initialPokemonsList?.length ?? 0) >= filters.limit,
    isLoading: false,
  });
  const observerBottomRef = useRef<HTMLDivElement>(null);

useEffect(() => {
    const observateur = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !state.isLoading && state.hasMore) {
        loadMorePokemon();
      }
    });
    if (observerBottomRef.current) {
      observateur.observe(observerBottomRef.current);
    }
    return () => observateur.disconnect();
  }, [state.isLoading, state.hasMore]);

  async function loadMorePokemon() {
    dispatch({ type: "LOAD_START" });

    const searchQuery = new URLSearchParams();
    searchQuery.set("page", String(state.page));
    searchQuery.set("limit", String(filters.limit));
    if (filters.name) {
      searchQuery.set("name", filters.name);
    }
    filters.types?.forEach((id) => searchQuery.append("types", String(id)));

    const nextPokemonsList = await api.get<Poke[]>(`/pokemons?${searchQuery}`);
    dispatch({ type: "LOAD_END", payload: nextPokemonsList ?? [], limit: filters.limit });
  }

  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 mt-6">
      {state.pokemons.map((pokemon) => (
        <PokeCard key={pokemon.pokedexId} pokemon={pokemon} />
      ))}
      <div ref={observerBottomRef} />
      {state.isLoading && <p>Chargement...</p>}
    </div>
  );
}
