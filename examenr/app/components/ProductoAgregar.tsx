"use client"

import { useRouter } from 'next/navigation'
import React from 'react'
import { SimplePokemon } from '../interfaces/Products';

function contarLetras(cadena: string): number {
  return cadena.length;
}


export default function AgregarPokemon({ id,  name }: SimplePokemon) {
  const router = useRouter();

  const handleAgregarCarrito = async () => {
    try {
      
      

      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/carrito`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          id_pokemon: id,
          amount: 0,
          id_user: 1,
          price: name.length * 14,
          nombre: name
        }),
      });

      if (!res.ok) {
        const error = await res.json();
        console.error('Error al agregar al carrito:', error);
        alert('Error al agregar al carrito');
      } else {
        const data = await res.json();
        console.log('Agregado al carrito:', data);
        
        //alert('Producto agregado al carrito');
        router.push(`/Producto/${id}`);
      }
    } catch (err:any) {
      
      console.error("Error en la petición:", err.message);
      alert('Error de red al agregar al carrito');
    }
  };

  return (
    <div className="relative flex flex-col bg-white shadow-md bg-clip-border rounded-xl h-full">
      <div className="relative overflow-hidden bg-white bg-clip-border rounded-t-xl h-48 md:h-64">
        <img
          src={"https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/" + id + ".svg"}
          alt="card-image"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="p-4 flex flex-col justify-between h-full">
        <div>
          <div className="flex items-center justify-between mb-2">
            <p className="font-sans text-sm font-medium leading-relaxed text-blue-gray-900">
              {name}
            </p>
            <p className="font-sans text-sm font-medium leading-relaxed text-blue-gray-900">
              ${name.length * 14}
            </p>
          </div>
          <p className="font-sans text-xs font-normal leading-normal text-gray-700 opacity-75 overflow-hidden text-ellipsis">
            {"Lorem ipsum dolor sit amet, consectetur adipiscing elit. Etiam quis maximus diam. Donec malesuada at nibh in blandit. Pellentesque habitant morbi tristique senectus et netus et Morbi varius maximus ipsum, ac molestie odio sollicitudin vitae. Vestibulum id mattis ipsum. Morbi sed lacus mauris."}
          </p>
        </div>
        <div className="pt-2 flex justify-center">
          <button
            className="px-4 py-2 text-sm font-semibold text-white bg-blue-600 rounded hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400"
            type="button"
            onClick={()=> router.push(`/Pokemon/${id}/${name}`)}
          >
            Ver Pokemon
          </button>
        </div>
      </div>
    </div>
  );
}
