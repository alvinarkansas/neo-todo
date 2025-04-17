import { Plus } from "lucide-react";

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onEnter: () => void;
  onPlusButtonClick: () => void;
};

export const TodoInput = ({
  value,
  onChange,
  onEnter,
  onPlusButtonClick,
}: Props) => {
  return (
    <div className="flex gap-2">
      <input
        type="text"
        value={value}
        onKeyDown={(e) => {
          if (e.key === "Enter" && value) {
            onEnter();
          }
        }}
        onChange={onChange}
        placeholder="Add a new task..."
        className="px-4 py-2 text-lg bg-white border-brutal placeholder:text-gray-300 flex-1 outline-none"
        size={1}
      />
      <button
        onClick={onPlusButtonClick}
        disabled={!value}
        className="p-2 text-lg bg-white border-brutal transform hover:-translate-y-1 transition-transform disabled:opacity-15 disabled:hover:translate-y-0"
      >
        <Plus size={32} />
      </button>
    </div>
  );
};
