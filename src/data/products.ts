import { createServerFn } from '@tanstack/react-start'
import { z } from 'zod'

// --- Zod schema for a single product ---
export const productSchema = z.object({
  id: z.number().int().positive(),
  name: z.string().min(1),
  price: z.number().positive(),
  isFeatured: z.boolean().optional(),
})

export const productsSchema = z.array(productSchema)

// Inferred TypeScript type
export type Product = z.infer<typeof productSchema>

// Dummy data for products
const productsData = [
  { id: 1, name: 'KL Keyboard', price: 250 },
  { id: 2, name: 'AI Powered Mouse', price: 80 },
  { id: 3, name: 'Smart Touchpad', price: 300 },
  { id: 4, name: 'KL AI Powered Webcam', price: 200 },
  { id: 5, name: 'JS Stricker Pack', price: 20 },
  { id: 6, name: 'Moltbot all-in-one PC', price: 1300 },
  { id: 7, name: 'Molt Buds', price: 90 },
  { id: 8, name: 'DevOps Docker Plushie', price: 35 },
  { id: 9, name: 'Mechanical Keycaps Set', price: 45 },
  { id: 10, name: 'Vertical Monitor Stand', price: 120 },
  { id: 11, name: 'Noise Cancelling Headphones', price: 350 },
  { id: 12, name: 'Ergonomic Mesh Chair', price: 450 },
  { id: 13, name: 'Programmable Macro Pad', price: 85 },
  { id: 14, name: 'Laptop Cooling Pad', price: 40 },
  { id: 15, name: 'USB-C Docking Station', price: 180 },
  { id: 16, name: 'Blue Light Blocking Glasses', price: 55 },
  { id: 17, name: 'Cable Management Kit', price: 25 },
  { id: 18, name: 'Portable SSD 2TB', price: 220 },
  { id: 19, name: 'Wireless Charging Desk Mat', price: 65 },
  { id: 20, name: 'Coffee Warmer', price: 30 },
]

// Validate productsData at module load — throws if any entry is invalid
const validatedProducts = productsSchema.parse(productsData)

const allProducts = (() => {
  const products = validatedProducts.map((product) => ({
    ...product,
    isFeatured: false,
  }))

  const featuredIndices = new Set<number>()
  while (featuredIndices.size < 3) {
    featuredIndices.add(Math.floor(Math.random() * products.length))
  }

  featuredIndices.forEach((index) => {
    products[index].isFeatured = true
  })

  return products
})()

// Get all the products
export const getProducts = createServerFn({
  method: 'GET',
})
  .inputValidator(z.object({ q: z.string().optional() }).optional())
  .handler(({ data }) => {
    let products = allProducts
    if (data?.q) {
      const searchConst = data.q.toLowerCase()
      products = products.filter((product) =>
        product.name.toLowerCase().includes(searchConst),
      )
    }
    return products
  })

// Get a single product by id
export const getProduct = createServerFn({
  method: 'GET',
})
  .inputValidator(z.object({ id: z.coerce.number().int().positive() }))
  .handler(({ data }) => {
    const product = allProducts.find((p) => p.id === data.id)
    if (!product) throw new Error(`Product with id ${data.id} not found`)
    return product
  })

export const getFeaturedProducts = createServerFn({
  method: 'GET',
}).handler(() => {
  return allProducts.filter((product) => product.isFeatured)
})
