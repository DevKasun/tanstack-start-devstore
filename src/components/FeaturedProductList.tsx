import { useSuspenseQuery } from '@tanstack/react-query'
import { getFeaturedProducts } from '@/data/products'

const ProductList = () => {
  const { data: featuredProducts } = useSuspenseQuery({
    queryKey: ['featuredProducts'],
    queryFn: getFeaturedProducts,
  })

  return (
    <div className="grid grid-cols-3 gap-4">
      {featuredProducts.map((product) => (
        <div key={product.id} className="border p-4 rounded">
          <h3>{product.name}</h3>
          <p className="text-green-600 font-bold">${product.price}</p>
        </div>
      ))}
    </div>
  )
}

export default ProductList
