import { useSuspenseQuery } from '@tanstack/react-query'
import { useServerFn } from '@tanstack/react-start'
import { getProducts } from '@/data/products'
import { Link } from '@tanstack/react-router'

interface ProductListProps {
  searchQuery?: string
  sort?: 'asc' | 'desc'
}

const ProductList = ({ searchQuery, sort = 'asc' }: ProductListProps) => {
  const fetchProducts = useServerFn(getProducts)

  const { data: rawProducts, isFetching } = useSuspenseQuery({
    queryKey: ['products', searchQuery],
    queryFn: () =>
      fetchProducts({ data: searchQuery ? { q: searchQuery } : undefined }),
  })

  // Sort is applied client-side using the typed `sort` value from the URL
  const products = [...rawProducts].sort((a, b) =>
    sort === 'asc' ? a.price - b.price : b.price - a.price,
  )

  return (
    <div>
      {isFetching && searchQuery && (
        <div className="text-sm text-gray-500 mb-2">Searching...</div>
      )}

      {products.length === 0 ? (
        <div className="text-center py-12 text-gray-500">
          No products found matching "{searchQuery}"
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
