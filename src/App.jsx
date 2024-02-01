import iconMoon from "./assets/images/icon-moon.svg";
import iconCheck from "./assets/images/icon-check.svg";
import Task from "./components/Task";
import { useState } from "react";
import { useEffect } from "react";

function App() {
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

  return (
    <div className="background">
      <div className="todo-container">
        <div className="todo-header">
          <h1>TASK TODAY</h1>
          <button className="theme-btn">
            <img src={iconMoon} alt="icon moon"></img>
          </button>
        </div>
        <form className="todo-form" onSubmit={handleSubmit}>
          <div className="check">
            <img src={iconCheck} />
          </div>
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
            <span>{itemsLeft} items left</span>
            <div className="filter-buttons">
              <button className="active" onClick={(e) => setFilter("all")}>
                All
              </button>
              <button className="active" onClick={(e) => setFilter("active")}>
                Active
              </button>
              <button
                className="active"
                onClick={(e) => setFilter("completed")}
              >
                Completed
              </button>
            </div>
            <button onClick={handleClearCompleted}>Clear Completed</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
