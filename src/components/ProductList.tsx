import { useSuspenseQuery } from '@tanstack/react-query'
import { getProducts } from '@/data/products'
import { Link } from '@tanstack/react-router'

interface ProductListProps {
  searchQuery?: string
}

const ProductList = ({ searchQuery }: ProductListProps) => {
  const { data: products, isFetching } = useSuspenseQuery({
    queryKey: ['products', searchQuery],
    queryFn: () =>
      getProducts({ data: searchQuery ? { q: searchQuery } : undefined }),
  })

  return (
    <div>
      {/* Loading indicator for real-time feel */}
      {isFetching && searchQuery && (
        <div className="text-sm text-gray-500 mb-2">Searching...</div>
      )}

      {products.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          `No products found matching "${searchQuery}"`
        </div>
      ) : (
        <div className="grid grid-cols-3 gap-4">
          {products.map((product) => (
            <div key={product.id} className="text-left border p-4 rounded-lg">
              <img
                src="image-thumb.webp"
                className="rounded-xl overflow-hidden mb-4"
              />
              <h3 className="text-lg font-bold">{product.name}</h3>
              <p className="text-green-600 font-bold">${product.price}</p>
              <Link
                to="/products/$productId"
                params={{ productId: String(product.id) }}
                className="text-blue-500 hover:underline text-sm"
              >
                View Details →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default ProductList
