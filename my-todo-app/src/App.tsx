import TodoApp from "./components/features/Todo"
import { MainLayout } from "./components/layouts/mainLayout"

function App() {
  return (
    <MainLayout>
      <TodoApp />
    </MainLayout>
  )
}

export default App