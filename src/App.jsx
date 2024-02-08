import iconMoon from "./assets/images/icon-moon.svg";
import iconSun from "./assets/images/icon-sun.svg";
import Task from "./components/Task";
import { useState, useEffect, useRef } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

function App() {
  const [darkMode, setDarkMode] = useState(() =>
    localStorage.getItem("theme")
      ? JSON.parse(localStorage.getItem("theme")).darkMode
      : false
  );
  const [tasks, setTasks] = useState(() =>
    localStorage.getItem("tasks")
      ? JSON.parse(localStorage.getItem("tasks"))
      : []
  );
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(
    function () {
      localStorage.setItem("tasks", JSON.stringify(tasks));
    },
    [tasks]
  );

  const itemsLeft = tasks.filter((task) => task.completed == false).length;
  let filteredTasks;

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
      {
        id: uid(),
        title: newTaskTitle,
        completed: false,
      },
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
    localStorage.setItem("theme", JSON.stringify({ darkMode: !darkMode }));
    setDarkMode((darkMode) => !darkMode);
  }

  function handleDragEnd(result) {
    setTasks((tasks) => {
      const tasksCopy = [...tasks];
      const task = tasks.find((task) => task.id == result.draggableId);
      tasksCopy.splice(result.source.index, 1);
      tasksCopy.splice(result.destination.index, 0, { ...task });
      return tasksCopy;
    });
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
          <DragDropContext onDragEnd={handleDragEnd}>
            <Droppable droppableId="droppable">
              {(provided) => (
                <ul
                  className="todo-tasks styled-scroll"
                  {...provided.droppableProps}
                  ref={provided.innerRef}
                >
                  {filteredTasks.map((task, index) => (
                    <Draggable
                      key={task.id}
                      draggableId={task.id}
                      index={index}
                    >
                      {(provided) => (
                        <li
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                        >
                          <Task
                            task={task}
                            onCheck={handleCheck}
                            onRemove={handleRemove}
                          />
                        </li>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </ul>
              )}
            </Droppable>
          </DragDropContext>
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
  );
}

export default App;
