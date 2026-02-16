import { Suspense, useEffect, useState } from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'
import ProductList from '@/components/ProductList'

export const Route = createFileRoute('/products')({
  component: RouteComponent,
  loaderDeps: ({ search }) => ({ q: search.q }),
  loader: async ({ deps: { q } }) => ({ q }),
})

function RouteComponent() {
  const { q: initialQ } = Route.useLoaderData()
  const navigate = Route.useNavigate()
  const [search, setSearch] = useState(initialQ || '')

  // Debounce search to avoid too many requests
  useEffect(() => {
    const timer = setTimeout(() => {
      navigate({
        search: (prev) => ({ ...prev, q: search || undefined }),
        replace: true, // Don't add to history stack on every keystroke
      })
    }, 500) // 300ms debounce

    return () => clearTimeout(timer)
  }, [search, navigate])

  return (
    <div className="container py-8">
      <Link to="/" className="block mb-4 text-blue-500 hover:underline">
        ⬅️ Back to Home
      </Link>
      <div>
        <h1 className="title-1 mb-12">Products</h1>
        <div className="mb-8 relative max-w-md">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search products..."
            className="w-full px-4 py-2 pr-10 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            autoFocus
          />
          {search && (
            <button
              onClick={() => setSearch('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              ✕
            </button>
          )}
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <ProductList searchQuery={search} />
        </Suspense>
      </div>
    </div>
  )
}
