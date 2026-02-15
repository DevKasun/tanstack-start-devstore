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
        <div key={product.id} className="text-left border p-4 rounded-lg">
          <img
            src="image-thumb.webp"
            className="rounded-xl overflow-hidden mb-4"
          />
          <h3 className="text-lg font-bold">{product.name}</h3>
          <p className="text-green-600 font-bold">${product.price}</p>
        </div>
      ))}
    </div>
  )
}

export default ProductList
