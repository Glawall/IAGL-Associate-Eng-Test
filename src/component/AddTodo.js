import React, { Component } from "react";
import { connect } from "react-redux";
import { addTodo } from "../actions";
import "../styles.css";

class AddTodo extends Component {
  state = {
    task: "",
  };

  handleChange = (e) => {
    this.setState({ task: e.target.value });
  };

  handleAddTodo = (e) => {
    e.preventDefault();
    if (this.state.task.trim() !== "") {
      this.props.addTodo(this.state.task);
      this.setState({ task: "" });
    }
  };

  render() {
    const { isLoading, error } = this.props;
    return (
      <form onSubmit={this.handleAddTodo} className="add-todo-form">
        <input
          type="text"
          value={this.state.task}
          onChange={this.handleChange}
          placeholder="Add a new task"
        />
        <button type="submit" disabled={!this.state.task}>
          {" "}
          {isLoading ? "Adding..." : "Add Task"}
        </button>
        {error && <div className="error-message">{error}</div>}
      </form>
    );
  }
}
const mapStateToProps = (state) => ({
  isLoading: state.isLoading,
  error: state.error,
});
export default connect(mapStateToProps, { addTodo })(AddTodo);
