import { Plus } from "lucide-react";

type Props = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: () => void;
};

export const TodoInput = ({ value, onChange, onSubmit }: Props) => {
  return (
    <form
      className="flex gap-2"
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
    >
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder="Add a new task..."
        className="px-4 py-2 text-lg bg-white border-brutal placeholder:text-gray-300 flex-1 outline-none"
        size={1}
      />
      <button
        type="submit"
        disabled={!value}
        className="p-2 text-lg bg-white border-brutal transform lg:hover:-translate-y-1 transition-transform disabled:opacity-15 disabled:hover:translate-y-0"
      >
        <Plus size={32} />
      </button>
    </form>
  );
};
