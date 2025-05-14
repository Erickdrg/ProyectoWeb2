// utils/fetchProducto.ts
import { ProductoItem } from "@/app/interfaces/Products";

export async function fetchProducto(id: string | number): Promise<ProductoItem> {
  const res = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!res.ok) throw new Error("Producto no encontrado");
  const data: ProductoItem = await res.json();
  return data;
}
