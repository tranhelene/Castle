import React from "react";
import "./TaskBubble.css";
import "./CheckBox.css";
import "./TrashCan.css";
import { MdRadioButtonUnchecked } from "react-icons/md";
import { FaRegCheckCircle } from "react-icons/fa"; //TODO: icons don't look the same between checked and unchecked
import { FaRegTrashCan } from "react-icons/fa6";

const TaskBubble = ({ name, IsFinished }) => {
  if (IsFinished) {
    return (
      <div className="task_finished">
        <p className="button_text">{name}</p>
        <FaRegCheckCircle className="check_circle" />
        <FaRegTrashCan className="trashcan" />
      </div>
    );
  } else {
    return (
        <div className="task">
      <p className="button_text">{name}</p>
      <MdRadioButtonUnchecked className="check_circle" />
      <FaRegTrashCan className="trashcan" />
    </div>
    )
  }
};

export default TaskBubble;
