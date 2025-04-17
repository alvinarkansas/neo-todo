import { useEffect, useState } from "react";
import { AnimatePresence } from "motion/react";
import { Headline } from "./components/Headline";
import { TodoFilterButton } from "./components/TodoFilterButton";
import { TodoInput } from "./components/TodoInput";
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
        <Headline todos={todos} />
        <TodoInput
          value={newTodo}
          onChange={(e) => {
            setNewTodo(e.target.value);
          }}
          onEnter={() => {
            addTodo(newTodo);
          }}
          onPlusButtonClick={() => {
            addTodo(newTodo);
          }}
        />
      </header>

      {todos.length > 0 && (
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
      )}

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
