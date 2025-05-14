"use client";
import { useEffect, useState } from "react";
import ItemCarrito from "../components/Item_del_carro";
import { ProductoItem } from "../interfaces/Products";

// Función para vaciar el carrito
async function VaciarCarrito() {
  try {
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/carrito/producto/vaciar`, {
      method: "DELETE"
    });
    if (!res.ok) throw new Error(`Error al vaciar el carrito: ${res.status}`);
    const data = await res.json();
    console.log("Carrito vaciado:", data);
  } catch (error) {
    console.error("Error en la petición:", error);
  }
}

// Obtener productos del carrito
export async function ObtenerCarrito(id_user: number) {
  try {
    
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/carrito/usuario/1`);

    if (!res.ok) throw new Error(`Error al obtener el carrito: ${res.status}`);
    const data = await res.json();
    return data; 
  } catch (error) {
    console.error("Error en la petición:", error);
    return [];
  }
}

export default function CarritoPage() {
  const [carrito, setCarrito] = useState<any[]>([]); 
  const [total, setTotal] = useState(0);

  useEffect(() => {
    async function fetchCarrito() {
      const data = await ObtenerCarrito(1);
      setCarrito(data);
    }
    fetchCarrito();
  }, []);

  useEffect(() => {
    const totalCalculado = carrito.reduce((acc, item) => acc + item.total, 0);
    setTotal(totalCalculado);
  }, [carrito]);

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">🛒 Tu carrito de compras</h1>
  
        <div className="space-y-6">
          {carrito.length > 0 ? (
            carrito.map((item: any) => (
              <ItemCarrito
                key={item.id_pokemon}
                item={{
                  id_pokemon: item.id_pokemon,
                  nombre: item.nombre,
                  amount: item.amount,
                  precio: item.precio,
                  total: item.total,
                }}
                onDelete={(idEliminado) => {
                  setCarrito(prev => prev.filter(p => p.id_pokemon !== idEliminado));
                }}
              />
            ))
          ) : (
            <div className="text-center text-gray-500">Tu carrito está vacío.</div>
          )}
        </div>
  
        <div className="mt-10 p-6 bg-white rounded-xl shadow-lg border border-gray-200 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-2xl font-semibold text-gray-800">
            Total: <span className="text-green-600">${total.toFixed(2)}</span>
          </p>
          <button
            className="w-full sm:w-auto px-6 py-3 bg-green-600 hover:bg-green-700 text-white text-lg font-medium rounded-xl transition"
            onClick={async () => {
              await VaciarCarrito();
              setCarrito([]);
              setTotal(0);
              alert("¡Gracias por tu compra!");
            }}
          >
            Finalizar compra
          </button>
        </div>
      </div>
    </div>
  );
  
}
