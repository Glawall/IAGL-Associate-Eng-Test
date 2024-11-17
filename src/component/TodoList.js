import React, { Component } from "react";
import Todo from "./Todo";
import { fetchTodos } from "../actions";
import { connect } from "react-redux";
import AddTodo from "./AddTodo";
import "../styles.css";

class TodoList extends Component {
  state = {};

  componentDidMount() {
    this.props.fetchTodos();
  }

  render() {
    const { todos, isLoading, error } = this.props;

    return (
      <div className="todo-container">
        {isLoading && <div>Loading...</div>}
        {error && <div className="error-message">{error}</div>}
        <ul className="todo-list">
          {todos && todos.length > 0
            ? todos.map((todo, index) => {
                return <Todo key={todo.task} todo={todo.task} index={index} />;
              })
            : "No todos, yay!"}
        </ul>
        <AddTodo />
      </div>
    );
  }
}

const mapStateToProps = (state) => ({
  todos: state.data.todos,
  isLoading: state.isLoading,
  error: state.error,
});
export default connect(mapStateToProps, {
  fetchTodos,
})(TodoList);
