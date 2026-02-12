import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: App,
})

function App() {
  return (
    <div className="container py-8">
      <div className="text-center">
        <h1 className="title-1">
          Hello! Welcome to the <span className="text-cyan-600">DevStore</span>
        </h1>
      </div>
    </div>
  )
}
