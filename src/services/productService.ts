import { getProducts } from '@/data/products'

export async function fetchAllProducts() {
  // Could be DB, external API, or static data
  return db.products.findMany()
}

export async function fetchProductById(id: number) {
  return db.products.findById(id)
}
