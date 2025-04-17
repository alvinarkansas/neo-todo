import type { Todo } from "../types/todo";

type Props = {
  todos: Todo[];
};

export const Headline = ({ todos }: Props) => {
  const activeTodos = todos.filter((todo) => !todo.completed);

  const label = () => {
    if (todos.length === 0) {
      return "You have no tasks";
    }
    if (todos.every((todo) => todo.completed)) {
      return "All done!";
    }
    if (activeTodos.length === 1) {
      return "You have 1 task";
    }
    return `You have ${activeTodos.length} tasks`;
  };

  return (
    <h1 className="text-[40px] font-extrabold font-brutal leading-none mb-4">
      {label()}
    </h1>
  );
};
