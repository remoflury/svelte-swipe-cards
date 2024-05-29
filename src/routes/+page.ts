import type { PageLoad } from "./$types";

export const load: PageLoad = async ({fetch}) => {
const response = await fetch('https://dummyjson.com/products?limit=10&skip=0')
const data = await response.json()

return {
  products: data.products as any[]
}
};