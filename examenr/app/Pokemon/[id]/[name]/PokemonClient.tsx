'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function PokemonClient({ id, name }: { id: string; name: string }) {
  const [cantidad, setCantidad] = useState(1);
  const router = useRouter();

  const incrementar = () => setCantidad((prev) => prev + 1);
  const decrementar = () => setCantidad((prev) => (prev > 1 ? prev - 1 : 1));

  const agregarAlCarrito = async () => {
    try {
      
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/carrito/agregar`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_pokemon: id,
          amount: cantidad,
          id_user: 1,
          price: name.length * 14,
          total: cantidad * (name.length * 14),
          nombre: name,
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        console.error('Error al agregar al carrito:', error);
        alert('Error al agregar al carrito');
      } else {
        alert('Producto agregado al carrito');
        router.push('/');
      }
    } catch (err: any) {
      console.error("Error en la petición:", err.message);
      alert('Error de red al agregar al carrito');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white shadow-lg rounded-xl p-6 w-80 text-center">
        <h1 className="text-2xl font-bold mb-4 capitalize">{name}</h1>
        <img
          src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${id}.png`}
          alt={`Pokemon ${name}`}
          className="mx-auto mb-4 w-32 h-32"
        />
        <p className="text-gray-700 mb-2">ID: {id}</p>
        <p className="text-gray-700 mb-4">Precio: ${name.length * 14}</p>

        <div className="flex items-center justify-center gap-4 mb-4">
          <button
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-1 px-3 rounded"
            onClick={decrementar}
          >
            -
          </button>
          <span className="text-lg font-medium">{cantidad}</span>
          <button
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-1 px-3 rounded"
            onClick={incrementar}
          >
            +
          </button>
        </div>

        <p className="text-sm text-gray-500 mb-4">
          Total: ${cantidad * (name.length * 14)}
        </p>

        <button
          onClick={agregarAlCarrito}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded"
        >
          Agregar al carrito
        </button>
      </div>
    </div>
  );
}
