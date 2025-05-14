'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface Props {
  item: {
    id_pokemon: number;
    nombre: string;
    amount: number;
    precio: number;
    total: number;
  };
  onDelete?: (id: number) => void;
}

export default function ItemCarrito({ item, onDelete }: Props) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const verDetalles = () => {
    router.push(`/Pokemon/${item.id_pokemon}/${item.nombre}`);
  };

  const eliminarProducto = async () => {
    setLoading(true);
    try {
      
      await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/carrito/1/${item.id_pokemon}`, {
        method: "DELETE",
      });
      if (onDelete) onDelete(item.id_pokemon);
    } catch (error) {
      console.error("Error eliminando producto:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 flex flex-col items-center space-y-3">
      <img
        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${item.id_pokemon}.svg`}
        alt={item.nombre}
        className="w-24 h-24"
      />
      <h2 className="text-lg font-bold capitalize">{item.nombre}</h2>
      <p>Cantidad: {item.amount}</p>
      <p>Precio unitario: ${item.precio}</p>
      <p className="font-semibold text-green-600">Total: ${item.total}</p>

      <div className="flex gap-2">
        <button
          onClick={verDetalles}
          className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
        >
          Ver detalles
        </button>
        <button
          onClick={eliminarProducto}
          disabled={loading}
          className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
        >
          Eliminar
        </button>
      </div>
    </div>
  );
}
