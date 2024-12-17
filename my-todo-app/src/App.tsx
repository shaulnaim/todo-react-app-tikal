import { TodoContainer } from './components/features/todo/ToDoContainer';
import { MainLayout } from './components/layouts/mainLayout';

function App() {
  return (
    <MainLayout>
      <TodoContainer />
    </MainLayout>
  );
}

export default App;
