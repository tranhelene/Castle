import React from "react";
import { Edit, Trash, Check } from "lucide-react";

export const Todo = ({ task, completeTodo, deleteTodo }) => {
	return (
		<div className="Todo items-center">
			<div className="flex gap-2">
				<Check className="edit-icon" onClick={() => completeTodo(task.id)} />
				<p className={`${task.completed ? "completed" : "incompleted"}`}>{task.task}</p>
			</div>
			<div className="flex gap-4">
				{/* <Edit className="edit-icon" /> */}
				<Trash className="delete-icon" onClick={() => deleteTodo(task.id)} />
			</div>
		</div>
	);
};
