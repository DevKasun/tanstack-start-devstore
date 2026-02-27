import { Suspense } from 'react'
import { Link, createFileRoute } from '@tanstack/react-router'
import FeaturedProducts from '@/components/FeaturedProductList'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="container py-8">
      <div className="text-center">
        <h1 className="title-1 mb-12">
          Hello! Welcome to the <span className="text-cyan-600">DevStore</span>
        </h1>
        <div className="flex flex-col gap-8 items-center justify-center">
          <Suspense fallback={<div>Loading...</div>}>
            <FeaturedProducts />
          </Suspense>
          <Link
            to="/products"
            search={{ page: 1, sort: 'asc' }}
            className="block mt=8 underline text-blue-500"
          >
            See all the Products
          </Link>
        </div>
      </div>
    </div>
  )
}
