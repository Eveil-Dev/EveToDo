import iconMoon from "./assets/images/icon-moon.svg";
import iconSun from "./assets/images/icon-sun.svg";
import Task from "./components/Task";
import { useState } from "react";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [filter, setFilter] = useState("all");

  let filteredTasks;
  const itemsLeft = tasks.filter((task) => task.completed == false).length;

  if (filter == "all") filteredTasks = tasks;
  if (filter == "active")
    filteredTasks = tasks.filter((task) => task.completed == false);
  if (filter == "completed")
    filteredTasks = tasks.filter((task) => task.completed == true);

  const uid = () =>
    Date.now().toString(36) + Math.random().toString(36).substr(2);

  function handleSubmit(e) {
    e.preventDefault();
    if (newTaskTitle == "") return;
    setTasks((tasks) => [
      ...tasks,
      { id: uid(), title: newTaskTitle, completed: false },
    ]);
    setNewTaskTitle("");
  }

  function handleCheck(taskId) {
    setTasks((tasks) =>
      tasks.map((task) =>
        task.id == taskId ? { ...task, completed: !task.completed } : task
      )
    );
  }

  function handleRemove(taskId) {
    setTasks((tasks) => tasks.filter((task) => task.id != taskId));
  }

  function handleClearCompleted() {
    setTasks((tasks) => tasks.filter((task) => task.completed == false));
  }

  function handleChangeTheme() {
    setDarkMode((darkMode) => !darkMode);
  }

  return (
    <div className={`background ${darkMode && "dark-mode"}`}>
      <div className="todo-container">
        <div className="todo-header">
          <h1>TASK TODAY</h1>
          <button className="theme-btn" onClick={handleChangeTheme}>
            <img
              src={`${darkMode ? iconSun : iconMoon}`}
              alt="theme icon"
            ></img>
          </button>
        </div>
        <form className="todo-form" onSubmit={handleSubmit}>
          <div className="check"></div>
          <input
            type="text"
            className="input-text"
            value={newTaskTitle}
            onChange={(e) => setNewTaskTitle(e.target.value)}
          />
        </form>
        <div className="todo-main">
          <div className="todo-tasks styled-scroll">
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => (
                <Task
                  task={task}
                  onCheck={handleCheck}
                  onRemove={handleRemove}
                  key={task.id}
                />
              ))
            ) : (
              <span className="todo-message">No tasks!</span>
            )}
          </div>
          <div className="todo-footer">
            <span className="count">{itemsLeft} items left</span>
            <div className="filter-buttons">
              <button
                className={filter == "all" && "active"}
                onClick={(e) => setFilter("all")}
              >
                All
              </button>
              <button
                className={filter == "active" && "active"}
                onClick={(e) => setFilter("active")}
              >
                Active
              </button>
              <button
                className={filter == "completed" && "active"}
                onClick={(e) => setFilter("completed")}
              >
                Completed
              </button>
            </div>
            <button className="clear-button" onClick={handleClearCompleted}>
              Clear Completed
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
