import { Check, Trash, Undo } from "lucide-react";
import { motion } from "motion/react";

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
    <motion.div
      layout
      initial={{ height: 0, opacity: 0 }}
      animate={{ height: "auto", opacity: 1 }}
      exit={{ height: 0, opacity: 0 }}
      transition={{ duration: 0.2, ease: "easeOut" }}
    >
      <motion.div
        layout
        className={`px-4 border-brutal flex gap-2 items-center transition-colors ${
          completed ? "bg-success py-2" : "bg-light py-2.5"
        }`}
        initial={{
          opacity: 0,
          x: -32,
          scale: 0.98,
          filter: "blur(4px)",
          marginTop: 0,
        }}
        animate={{
          opacity: 1,
          x: 0,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          marginTop: 8,
        }}
        exit={{
          opacity: 0,
          y: 8,
          scale: 0.98,
          filter: "blur(4px)",
          marginTop: 0,
        }}
        transition={{ duration: 0.2, ease: "easeOut" }}
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
      </motion.div>
    </motion.div>
  );
};
