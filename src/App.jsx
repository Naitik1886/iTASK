import React, { useState, useEffect } from "react";
import { v4 as uuidv4 } from "uuid";

function App() {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState(() => {
    const rawtodo = localStorage.getItem("todos");
    if (!rawtodo) return [];
    return JSON.parse(rawtodo);
  });

  // Update local storage when todos change
  useEffect(() => {
    localStorage.setItem("todos", JSON.stringify(todos));
  }, [todos]);

  const handleAdd = () => {
    if (todo.trim() === "") return;
    setTodos([...todos, { id: uuidv4(), todo, iscompleted: false }]);
    setTodo("");
  };

  const handleChange = (e) => {
    setTodo(e.target.value);
  };

  const handleCheckbox = (e) => {
    const id = e.target.name;
    const index = todos.findIndex((item) => item.id === id);
    const newTodos = [...todos];
    newTodos[index].iscompleted = !newTodos[index].iscompleted;
    setTodos(newTodos);
  };

  const handleDelete = (e, id) => {
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
  };

  const handleEdit = (e, id) => {
    const t = todos.find((item) => item.id === id);
    setTodo(t.todo);
    const newTodos = todos.filter((item) => item.id !== id);
    setTodos(newTodos);
  };

  return (
    <>
      <div className="w-full min-h-screen bg-zinc-900 py-12 text-white">
        <div className="max-w-6xl mx-auto px-8 mb-8">
          <h1 className="text-5xl font-bold tracking-wider text-center text-cyan-400">
            iTask
          </h1>
        </div>

        <div className="w-full max-w-2xl mx-auto bg-zinc-800 rounded-xl shadow-lg p-8">
          <h2 className="text-xl font-semibold mb-4 text-yellow-400">Add a task</h2>

          <div className="flex flex-col sm:flex-row items-center gap-4 mb-6">
            <input
              onChange={handleChange}
              value={todo}
              className="flex-1 w-full sm:w-1/2 bg-white text-black px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500"
              type="text"
              placeholder="What's on your mind?"
            />
            <button
              onClick={handleAdd}
              className="bg-orange-500 hover:bg-orange-600 transition-all text-black px-5 py-2 rounded-md shadow"
            >
              Add
            </button>
          </div>

          <div>
            <h3 className="text-lg font-bold mb-4 text-green-400">Your Tasks</h3>

            <div className="flex flex-col gap-4 max-h-96 overflow-y-auto pr-2">
              {todos.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between bg-zinc-700 border border-zinc-600 px-4 py-3 rounded-lg shadow-md"
                >
                  <div className="flex items-center gap-3 w-full">
                    <input
                      onChange={handleCheckbox}
                      type="checkbox"
                      checked={item.iscompleted}
                      name={item.id}
                      className="h-5 w-5 accent-indigo-500"
                    />
                    <span
                      className={`text-md w-full break-words ${
                        item.iscompleted
                          ? "line-through text-gray-400"
                          : "text-white"
                      }`}
                    >
                      {item.todo}
                    </span>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={(e) => handleEdit(e, item.id)}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
                    >
                      Edit
                    </button>
                    <button
                      onClick={(e) => handleDelete(e, item.id)}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded-md text-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
