type Props = {
  text: string;
  onTick: () => void;
  completed?: boolean;
};

export const TodoItem = ({ text, onTick, completed }: Props) => {
  return (
    <div
      className={`px-4 py-3 border-brutal flex gap-2 items-center transition-colors ${
        completed ? "bg-success" : ""
      }`}
    >
      <button onClick={onTick} className="h-5 w-5 border-brutal" />
      <span>{text}</span>
    </div>
  );
};
