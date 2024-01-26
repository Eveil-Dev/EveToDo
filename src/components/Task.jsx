import iconCheck from "../assets/images/icon-check.svg";

function Task({ task }) {
  return (
    <div className="todo-task">
      <div className="check">
        <img src={iconCheck} />
      </div>
      <span>Fazer compras</span>
    </div>
  );
}

export default Task;
