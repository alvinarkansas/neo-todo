import { Plus } from "lucide-react";
import { TodoItem } from "./components/TodoItem";
import { useEffect, useState } from "react";
import { Todo } from "./types/todo";

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const addTodo = (value: string) => {
    const payload = {
      id: crypto.randomUUID(),
      text: value,
      completed: false,
    };
    setTodos((todos) => [payload, ...todos]);
    setNewTodo("");
  };

  const toggleTodo = (id: string) => {
    const updatedTodos = todos.map((todo) => {
      if (todo.id === id) {
        return { ...todo, completed: !todo.completed };
      }
      return todo;
    });

    setTodos(
      updatedTodos.sort((a, b) => Number(a.completed) - Number(b.completed))
    );
  };

  const deleteTodo = (id: string) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <header className="p-4 bg-danger border-brutal mb-4">
        <h1 className="text-[40px] font-extrabold font-brutal leading-none mb-4">
          You have {todos.length} tasks
        </h1>
        <div className="flex gap-2">
          <input
            type="text"
            value={newTodo}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addTodo(newTodo);
              }
            }}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="Add a new task..."
            className="px-4 py-2 text-lg bg-white border-brutal placeholder:text-gray-300 flex-1 outline-none"
          />
          <button
            onClick={() => addTodo(newTodo)}
            className="p-2 text-lg bg-white border-brutal transform hover:-translate-y-1 hover: transition-transform"
          >
            <Plus size={32} />
          </button>
        </div>
      </header>

      <main className="flex flex-col gap-3">
        {(todos ?? []).map((todo) => {
          return (
            <TodoItem
              key={todo.id}
              text={todo.text}
              completed={todo.completed}
              onDelete={() => {
                deleteTodo(todo.id);
              }}
              onUndo={() => {
                toggleTodo(todo.id);
              }}
              onTick={() => {
                toggleTodo(todo.id);
              }}
            />
          );
        })}
      </main>
    </div>
  );
}

export default App;
