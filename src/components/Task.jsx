import iconCheck from "../assets/images/icon-check.svg";
import iconCross from "../assets/images/icon-cross.svg";

function Task({ task, onCheck, onRemove }) {
  return (
    <div className={`todo-task ${task.completed && "completed"}`}>
      <div>
        <button className="check" onClick={(e) => onCheck(task.id)}>
          <img src={iconCheck} />
        </button>
        <span>{task.title}</span>
      </div>
      <button className="remove" onClick={(e) => onRemove(task.id)}>
        <img src={iconCross} />
      </button>
    </div>
  );
}

export default Task;
