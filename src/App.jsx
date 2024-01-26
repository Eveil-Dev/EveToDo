import iconMoon from "./assets/images/icon-moon.svg";
import iconCheck from "./assets/images/icon-check.svg";
import Task from "./components/Task";

function App() {
  return (
    <div className="background">
      <div className="todo-container">
        <div className="todo-header">
          <h1>TASK TODAY</h1>
          <button className="theme-btn">
            <img src={iconMoon} alt="icon moon"></img>
          </button>
        </div>
        <div className="todo-form">
          <div className="check">
            <img src={iconCheck} />
          </div>
          <input type="text" className="input-text" />
        </div>
        <div className="todo-main">
          <div className="todo-tasks styled-scroll">
            <Task />
            <Task />
            <Task />
            <Task />
            <Task />
            <Task />
            <Task />
          </div>
          <div className="todo-footer">
            <span>5 items left</span>
            <div className="filter-buttons">
              <button className="active">All</button>
              <button>Active</button>
              <button>Completed</button>
            </div>
            <button>Clear Completed</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
