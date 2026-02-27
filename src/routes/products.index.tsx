import { Suspense, useEffect, useState } from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'
import ProductList from '@/components/ProductList'
import { z } from 'zod'

const searchSchema = z.object({
  q: z.string().optional().catch(''),
  page: z.coerce.number().int().min(1).catch(1),
  sort: z.enum(['asc', 'desc']).catch('asc'),
})

export const Route = createFileRoute('/products/')({
  validateSearch: searchSchema,
  component: RouteComponent,
  loaderDeps: ({ search }) => ({ q: search.q }),
  loader: async ({ deps: { q } }) => ({ q }),
})

function RouteComponent() {
  const { q: initialQ } = Route.useLoaderData()
  const { page, sort } = Route.useSearch()
  const navigate = Route.useNavigate()
  const [search, setSearch] = useState(initialQ || '')

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate({
        search: (prev) => ({ ...prev, q: search || undefined, page: 1 }),
        replace: true,
      })
    }, 500)
    return () => clearTimeout(timer)
  }, [search])

  return (
    <div className="container py-8">
      <Link to="/" className="block mb-4 text-blue-500 hover:underline">
        ⬅️ Back to Home
      </Link>
      <div>
        <h1 className="title-1 mb-8">Products</h1>

        {/* Search + Sort controls */}
        <div className="mb-6 flex gap-4 items-center max-w-xl">
          <div className="relative flex-1">
            <input
              id="product-search"
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

          <button
            id="sort-toggle"
            onClick={() =>
              navigate({
                search: (prev) => ({
                  ...prev,
                  sort: sort === 'asc' ? 'desc' : 'asc',
                }),
              })
            }
            className="px-4 py-2 border rounded-lg text-sm font-medium hover:bg-gray-50 hover:text-black flex items-center gap-2"
          >
            Price ➡️ {sort === 'asc' ? 'Low → High' : 'High → Low'}
          </button>
        </div>

        {/* URL State Inspector */}
        <div className="mb-8 rounded-xl border border-dashed border-blue-300 bg-blue-50 p-4 text-sm font-mono">
          <p className="mb-2 text-xs font-sans font-semibold uppercase tracking-widest text-blue-400">
            🔍 URL State Inspector — live output of{' '}
            <code className="text-blue-600">Route.useSearch()</code>
          </p>

          {/* What Zod parsed from the URL */}
          <pre className="text-blue-900 leading-relaxed">
            {`// Typed result — even after a bad URL like ?page=hello&sort=random
            {
              q:    ${JSON.stringify(search || '')},
              page: ${page},         ${page === 1 ? '← default (try ?page=hello in the URL)' : ''}
              sort: "${sort}",  ${sort === 'asc' ? '← default (try ?sort=random in the URL)' : ''}
            }`}
          </pre>

          <hr className="my-3 border-blue-200" />

          {/* Show the raw URL params for comparison */}
          <p className="text-xs font-sans text-blue-400 mb-1">
            💡 Try editing the URL bar manually:
          </p>
          <div className="flex flex-wrap gap-2">
            {[
              '?page=hello',
              '?sort=random',
              '?page=abc&sort=INVALID',
              '?q=keyboard&page=2&sort=desc',
            ].map((example) => (
              <a
                key={example}
                href={`/products/${example}`}
                className="px-2 py-1 rounded bg-blue-100 text-blue-700 hover:bg-blue-200 text-xs"
              >
                {example}
              </a>
            ))}
          </div>
        </div>

        <Suspense fallback={<div>Loading...</div>}>
          <ProductList searchQuery={search} sort={sort} />
        </Suspense>
      </div>
    </div>
  )
}
