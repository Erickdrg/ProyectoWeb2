
import React from 'react';
import { PokemonsReponse, SimplePokemon } from "./interfaces/Products";
import ProductosAgregar from './components/ProductoAgregar';

const respuesta = async (limit = 5, offset = 0): Promise<SimplePokemon[]> => {
  const data: PokemonsReponse = await fetch(
    `https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`,
    { cache: 'no-store' } // Opcional: asegura que siempre sea una petición fresca
  ).then((response) => response.json());

  const pokemons = data.results.map(pokemon => ({
    id: pokemon.url.split('/').at(-2)!,
    name: pokemon.name
  }));

  return pokemons;
};

export default async function Home() {
  const lista = await respuesta(50, 0);

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
      {lista.map((pokemon) => (
        <ProductosAgregar key={pokemon.id} id={pokemon.id} name={pokemon.name} />
      ))}
    </div>
  );
}
