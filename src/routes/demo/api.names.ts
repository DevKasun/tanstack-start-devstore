import { createFileRoute } from '@tanstack/react-router'
import { json } from '@tanstack/react-start'

export const Route = createFileRoute('/demo/api/names')({
  server: {
    handlers: {
      GET: () => json([
        { id: 1, name: 'Alice', email: 'alice@example.com', birthYear: 1990 },
        { id: 2, name: 'Bob', email: 'bob@example.com', birthYear: 1985 },
        { id: 3, name: 'Charlie', email: 'charlie@example.com', birthYear: 1992 }
      ]),
    },
  },
})
