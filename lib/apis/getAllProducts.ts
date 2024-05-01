import { Product } from "@/pages/dashboard/products/columns";

export default async function getAllProducts():Promise<Product[]> {
  return await fetch("https://fakestoreapi.com/products")
    .then((res) => res.json())
    .then((json) => json);
}
