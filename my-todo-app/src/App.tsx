import { TodoContainer } from './components/features/todo/ToDoContainer';
import { MainLayout } from './components/layouts/MainLayout';
import { QueryClient, QueryClientProvider, QueryCache } from '@tanstack/react-query'

// Create a client with enhanced configuration
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 3,
      retryDelay: 1000,
      staleTime: 1000 * 60, // Consider data fresh for 1 minute
      gcTime: 1000 * 60 * 5, // Keep unused data for 5 minutes
      refetchOnWindowFocus: true, // Refetch when window regains focus
    }
  },
  queryCache: new QueryCache({
    onError: (error) => {
      console.error('Global query error:', error)
    }
  })
})

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MainLayout>
        <TodoContainer />
      </MainLayout>
    </QueryClientProvider>
  )
}

export default App;