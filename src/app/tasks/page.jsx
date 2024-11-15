"use client";
import "./tasks.css";
import React, { useState } from "react";
import { TodoWrapper } from "../components/TodoWrapper";

const Tasks = () => {
	return (
		<div className="App">
			<TodoWrapper />
		</div>
	);
};

export default Tasks;
