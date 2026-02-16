import { Suspense } from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'
import ProductList from '@/components/ProductList'

export const Route = createFileRoute('/products')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="container py-8">
      <Link to="/" className="block mb-4 text-blue-500 hover:underline">
        ⬅️ Back to Home
      </Link>
      <div>
        <h1 className="title-1 mb-12">Products</h1>
        <div className="mb-8">
          <input
            type="text"
            placeholder="Search products..."
            className="border border-gray-300 rounded-md px-4 py-2 min-w-96 outline-0"
          />
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <ProductList />
        </Suspense>
      </div>
    </div>
  )
}
