import { createFileRoute, Link } from '@tanstack/react-router'
import { getProduct } from '@/data/products'

export const Route = createFileRoute('/products/$productId')({
  loader: ({ params }) => getProduct({ data: Number(params.productId) }),
  component: RouteComponent,
})

function RouteComponent() {
  const product = Route.useLoaderData()

  return (
    <div className="container py-8 max-w-2xl">
      <Link to="/products" className="block mb-6 text-blue-500 hover:underline">
        ⬅️ Back to Products
      </Link>

      <div>
        <img
          src="/image-thumb.webp"
          alt={product.name}
          className="rounded-xl overflow-hidden mb-6 w-auto object-cover max-h-64"
        />
        <h1 className="text-2xl font-bold mb-2">{product.name}</h1>
        <p className="text-xl text-green-600 font-bold mb-4">
          ${product.price}
        </p>
        {product.isFeatured && (
          <span className="inline-block bg-yellow-100 text-yellow-800 text-xs font-semibold px-3 py-1 rounded-full mb-4">
            ⭐ Featured
          </span>
        )}

        <button className="mt-6 bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors">
          Add to Cart
        </button>
      </div>
    </div>
  )
}
