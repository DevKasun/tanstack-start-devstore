import { createServerFn } from '@tanstack/react-start'

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

const allProducts = (() => {
  const products = productsData.map((product) => ({
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

export const getProducts = createServerFn({
  method: 'GET',
})
  .inputValidator((search: { q?: string } | undefined) => search)
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

export const getProduct = createServerFn({
  method: 'GET',
})
  .inputValidator((id: number) => id)
  .handler(({ data: id }) => {
    const product = allProducts.find((p) => p.id === id)
    if (!product) throw new Error(`Product with id ${id} not found`)
    return product
  })

export const getFeaturedProducts = createServerFn({
  method: 'GET',
}).handler(() => {
  return allProducts.filter((product) => product.isFeatured)
})
