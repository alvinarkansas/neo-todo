type Props = {
  onClick: () => void;
  label: string;
  active?: boolean;
};

export const TodoFilterButton = ({ onClick, label, active = false }: Props) => {
  return (
    <button
      onClick={onClick}
      className={`p-1 border-brutal grow text-sm font-bold flex-1 ${
        active ? "bg-info text-white" : "bg-light"
      }`}
    >
      {label}
    </button>
  );
};
