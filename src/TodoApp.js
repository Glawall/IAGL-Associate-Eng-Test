import React from "react";
import TodoList from "./component/TodoList";
import "./styles.css";

export default function TodoApp() {
  return (
    <div className="todo-app">
      <h1 className="todo-app-header">
        Todo <span className="header-part2">list</span>
      </h1>
      <TodoList />
    </div>
  );
}
