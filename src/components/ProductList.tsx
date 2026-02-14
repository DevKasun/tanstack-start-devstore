import { useSuspenseQuery } from '@tanstack/react-query'
import { getProducts } from '@/data/products'

const ProductList = () => {
  const { data: products } = useSuspenseQuery({
    queryKey: ['products'],
    queryFn: getProducts,
  })

  return (
    <div className="grid grid-cols-3 gap-4">
      {products.map((product) => (
        <div key={product.id} className="border p-4 rounded">
          <h3>{product.name}</h3>
          <p className="text-green-600 font-bold">${product.price}</p>
        </div>
      ))}
    </div>
  )
}

export default ProductList
