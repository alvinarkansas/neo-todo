import { Check, Trash, Undo } from "lucide-react";

type Props = {
  text: string;
  onTick: () => void;
  onDelete: () => void;
  onUndo: () => void;
  completed?: boolean;
};

export const TodoItem = ({
  text,
  onTick,
  completed,
  onDelete,
  onUndo,
}: Props) => {
  return (
    <div
      className={`px-4 border-brutal flex gap-2 items-center transition-colors ${
        completed ? "bg-success py-2" : "py-2.5"
      }`}
    >
      {completed ? (
        <Check size={20} />
      ) : (
        <button onClick={onTick} className="h-5 w-5 border-brutal" />
      )}
      <span className="flex-1">{text}</span>
      {completed ? (
        <div className="flex gap-2">
          <button className="p-0.5 border-brutal" onClick={onUndo}>
            <Undo size={20} />
          </button>
          <button className="p-0.5 border-brutal" onClick={onDelete}>
            <Trash size={20} />
          </button>
        </div>
      ) : null}
    </div>
  );
};
