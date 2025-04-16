import { Plus } from "lucide-react";

function App() {
  const addTodo = () => {
    console.log("Adding todo...");
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-8">
      <header className="p-4 bg-danger border-brutal">
        <h1 className="text-[40px] font-extrabold font-brutal leading-none mb-4">
          You have 12 tasks
        </h1>
        <div className="flex gap-2">
          <input
            type="text"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                addTodo();
              }
            }}
            placeholder="Add a new task..."
            className="px-4 py-2 text-lg bg-white border-brutal placeholder:text-gray-300 flex-1 outline-none"
          />
          <button
            onClick={() => addTodo()}
            className="p-2 text-lg bg-white border-brutal transform hover:-translate-y-1 hover: transition-transform"
          >
            <Plus size={32} />
          </button>
        </div>
      </header>
    </div>
  );
}

export default App;
