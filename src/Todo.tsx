import { useState } from "react";

const Todo = () => {
  const [selectedTab, setSelectedTab] = useState("all");
  const [todo, setTodo] = useState("");
  const [clearButtonText, setClearButtonText] = useState("Clear All");
  const [selectedTasks, setSelectedTasks] = useState([]);

  const [todos, setTodos] = useState([
    { id: 1, text: "hahahhahaha", completed: false },
    { id: 2, text: "Never do the these tasks", completed: false },
    { id: 3, text: "ajhhahsdzvn sbhfhujdfbj fvdh ", completed: true },
    { id: 4, text: "Do all the tasks DO IT!!!", completed:false}
  ]);

  const handleTaskSelect = (taskId) => {
    if (selectedTasks.includes(taskId)) {
      setSelectedTasks(selectedTasks.filter((id) => id !== taskId));
    } else {
      setSelectedTasks([...selectedTasks, taskId]);
    }
  };

  const handleMarkComplete = () => {
    setTodos(
      todos.map((todo) => {
        if (selectedTasks.includes(todo.id)) {
          return { ...todo, completed: true };
        }
        return todo;
      })
    );
    setSelectedTasks([]);
  };

  const handleMarkPending = () => {
    setTodos(
      todos.map((todo) => {
        if (selectedTasks.includes(todo.id)) {
          return { ...todo, completed: false };
        }
        return todo;
      })
    );
    setSelectedTasks([]);
  };

  const handleClearAll = () => {
    if (selectedTab === "all" && selectedTasks.length > 0) {
      const remainingTasks = todos.filter((todo) => !selectedTasks.includes(todo.id));
      setTodos(remainingTasks);
    } else {
      setTodos([]);
    }
    setSelectedTasks([]);
  };
  
  

  const handleChange = (event) => {
    setTodo(event.target.value);
    if (event.target.value.length > 0) {
      setClearButtonText("Add Task");
    } else if (selectedTab === "all" && selectedTasks.length > 0) {
      setClearButtonText(`Clear (${selectedTasks.length})`);
    } else if (selectedTab === "pending" && selectedTasks.length > 0) {
      setClearButtonText(`Mark Completed (${selectedTasks.length})`);
    } else if (selectedTab === "completed" && selectedTasks.length > 0) {
      setClearButtonText(`Mark Pending (${selectedTasks.length})`);
    } else if (selectedTasks.length === 0) {
      setClearButtonText("Clear All");
    }
  };
  const newTodo = () => {
    if (todo.length > 0) {
      const newItem = { id: Date.now(), text: todo, completed: false };
      setTodos([...todos, newItem]);
      setTodo("");
      setClearButtonText("Clear All");
    }
  };

  const handleTabSelect = (tab) => {
    setSelectedTab(tab);
  };

  const filtered = todos.filter((todo) => {
    if (selectedTab === "all") {
      return true;
    } else if (selectedTab === "pending") {
      return !todo.completed;
    } else if (selectedTab === "completed") {
      return todo.completed;
    }
    return false;
  });

  return (
    <div className="bg-slate-200 w-[500px] h-[700px] rounded-xl flex flex-col p-8 text-lg">
      <input
        type="text"
        placeholder="Add a new Task"
        className="bg-slate-200 w-full py-4 px-8 rounded-lg mb-4 border-gray-500 border-2 outline-none"
        value={todo}
        onChange={handleChange}
      />

      <div className="flex flex-row justify-around">
        <div className="flex">
          <button
            className={`mx-2 my-3 text-lg ${
              selectedTab === "all" ? "text-blue-500 border-b-4 border-blue-500" : ""
            }`}
            onClick={() => handleTabSelect("all")}
          >
            All
          </button>
          <button
            className={`mx-2 my-3 text-lg  ${
              selectedTab === "pending" ? "text-blue-500 border-b-4 border-blue-500" : ""
            }`}
            onClick={() => handleTabSelect("pending")}
          >
            Pending
          </button>
          <button
            className={`mx-2 my-3 text-lg ${
              selectedTab === "completed" ? "text-blue-500 border-b-4 border-blue-500" : ""
            }`}
            onClick={() => handleTabSelect("completed")}
          >
            Completed
          </button>
        </div>
        <button
          className="ml-20 bg-blue-500 px-2 my-2 rounded-md text-gray-100 overflow-auto"
          onClick={
            todo.length > 0
              ? newTodo
              : selectedTab === "all" && selectedTasks.length > 0
              ? handleClearAll
              : selectedTab === "pending" && selectedTasks.length > 0
              ? handleMarkComplete
              : selectedTab === "completed" && selectedTasks.length > 0
              ? handleMarkPending
              : handleClearAll
          }
        >
          {todo.length > 0
            ? "Add Task"
            : selectedTab === "all" && selectedTasks.length > 0
            ? `Clear (${selectedTasks.length})`
            : selectedTab === "pending" && selectedTasks.length > 0
            ? `Mark Completed (${selectedTasks.length})`
            : selectedTab === "completed" && selectedTasks.length > 0
            ? `Mark Pending (${selectedTasks.length})`
            : "Clear All"}
        </button>
      </div>
      <hr className="border-2 border-gray-400 mt-2"></hr>

      <div className="mt-3 overflow-auto text-lg">
        <ul>
        {filtered.map((todo) => (
          <div>
        <li key={todo.id} className={`flex items-center flex-row ${todo.completed ? 'line-through' : ''}`}>
          <input
            type="checkbox"
            className="m-6 h-6 w-6"
            checked={selectedTasks.includes(todo.id)}
            onChange={() => handleTaskSelect(todo.id)}
          />
          <div className="nowrap">{todo.text}</div>
        </li>
        <hr className="border-1 border-gray-400"></hr>
        </div>
        
      ))}

        </ul>
      </div>
    </div>
  );
};

export default Todo;
