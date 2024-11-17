import React, { useState } from "react";
import { connect } from "react-redux";
import { updateTodo, removeTodo } from "../actions";
import "../styles.css";

const Todo = ({ todo, index, updateTodo, removeTodo }) => {
  const [editMode, setEditMode] = useState(false);
  const [newTask, setNewTask] = useState(todo);

  const handleUpdate = () => {
    updateTodo(index, newTask);
    setEditMode(false);
  };

  const handleDelete = () => {
    removeTodo(index);
  };

  return (
    <li className="todo-item">
      {editMode ? (
        <>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
          />
          <button className="update-button" onClick={handleUpdate}>
            Update
          </button>
          <button className="delete-button" onClick={() => setEditMode(false)}>
            Cancel
          </button>
        </>
      ) : (
        <>
          <span className="todo-item__text">{todo}</span>
          <button
            className="edit-button"
            onClick={() => {
              setEditMode(true);
              setNewTask(todo);
            }}
          >
            Edit
          </button>
          <button className="delete-button" onClick={handleDelete}>
            Delete
          </button>
        </>
      )}
    </li>
  );
};

const mapDispatchToProps = {
  updateTodo,
  removeTodo,
};

export default connect(null, mapDispatchToProps)(Todo);
