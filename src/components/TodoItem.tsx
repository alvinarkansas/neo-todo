type Props = {
  text: string;
};

export const TodoItem = ({ text }: Props) => {
  return (
    <div className="px-4 py-3 border-brutal flex gap-2 items-center">
      <button className="h-5 w-5 border-brutal" />
      <span>{text}</span>
    </div>
  );
};
