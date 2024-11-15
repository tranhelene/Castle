"use client";

import { useState, useEffect } from "react";
import { Todo } from "./Todo";
import { TodoForm } from "./TodoForm";
import { useAuth } from "../context/AuthContext";
import { addTodoItem, deleteTodoItem, watchUserTodos, updateScore } from "../firebase/initializeDatabase";

export const TodoWrapper = () => {
	const [todos, setTodos] = useState([]);
	const { user } = useAuth();

	useEffect(() => {
		let unsubscribe;

		if (user) {
			try {
				// Set up the listener
				unsubscribe = watchUserTodos(user.uid, (updatedTodos) => {
					setTodos(updatedTodos);
					console.log(updatedTodos);
				});
			} catch (err) {
				setError(err.message);
			}
		}

		return () => {
			if (unsubscribe) {
				unsubscribe();
			}
		};
	}, [user]);

	const addTodo = (todo) => {
		const todoId = new Date().getTime().toString();
		const item = { id: todoId, task: todo, completed: false };
		// setTodos([...todos, item]);
		addTodoItem(user, todoId, item);
	};

	const calculateScore = (id) => {
		deleteTodo(id);
		updateScore(user.uid, 2);
	};

	const deleteTodo = (id) => {
		// setTodos(todos.filter((todo) => todo.id !== id));
		console.log(id);
		deleteTodoItem(user, id);
	};

	return (
		<div className="TodoWrapper">
			<h1>
				Build Your <strong>Castle</strong>!
			</h1>
			<TodoForm addTodo={addTodo} />
			{todos.map((todo) => (
				<Todo key={todo.id} task={todo} completeTodo={calculateScore} deleteTodo={deleteTodo} calculateScore />
			))}
		</div>
	);
};
