import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import { TodoFilterButton } from "./components/TodoFilterButton";
import { TodoItem } from "./components/TodoItem";
import { FILTER_OPTIONS } from "./constants";
import type { FilterOption, Todo } from "./types/todo";

function App() {
  const [newTodo, setNewTodo] = useState("");
  const [filter, setFilter] = useState<FilterOption>("all");
  const [todos, setTodos] = useState<Todo[]>(() => {
    const savedTodos = localStorage.getItem("todos");
    return savedTodos ? JSON.parse(savedTodos) : [];
  });

  const activeTasks = todos.filter((todo) => !todo.completed).length;

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

  const filterTodo = (status: "all" | "active" | "completed") => {
    switch (status) {
      case "active":
        return todos.filter((todo) => !todo.completed);
      case "completed":
        return todos.filter((todo) => todo.completed);
      default:
        return todos;
    }
  };

  const filteredTodos = filterTodo(filter);

  return (
    <div className="sm:max-w-xl lg:max-w-3xl mx-auto px-4 py-8">
      <header className="p-4 bg-danger border-brutal mb-4">
        <h1 className="text-[40px] font-extrabold font-brutal leading-none mb-4">
          You have {activeTasks} tasks
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
            size={1}
          />
          <button
            onClick={() => addTodo(newTodo)}
            disabled={!newTodo}
            className="p-2 text-lg bg-white border-brutal transform hover:-translate-y-1 transition-transform disabled:opacity-15 disabled:hover:translate-y-0"
          >
            <Plus size={32} />
          </button>
        </div>
      </header>

      <section className="flex gap-2 w-full mb-6">
        {FILTER_OPTIONS.map((option) => {
          return (
            <TodoFilterButton
              key={option.value}
              label={option.label}
              active={filter === option.value}
              onClick={() => {
                setFilter(option.value);
              }}
            />
          );
        })}
      </section>

      <AnimatePresence initial={false}>
        {(filteredTodos ?? []).map((todo) => {
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
      </AnimatePresence>
    </div>
  );
}

export default App;
