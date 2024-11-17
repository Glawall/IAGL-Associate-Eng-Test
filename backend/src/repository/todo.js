let todoList = {
  todos: [
    {
      task: "This is a todo example",
    },
  ],
};

module.exports = {
  getTodos: () => Promise.resolve(todoList),

  addTodo: (newTask) => {
    if (typeof newTask === "string" && newTask.trim().length > 0) {
      const newTodo = { task: newTask };
      todoList.todos.push(newTodo);
      return Promise.resolve(newTodo);
    } else {
      return Promise.reject(new Error("Todo input cannot be empty"));
    }
  },

  updateTodo: async (index, updatedTask) => {
    if (typeof index !== "number" || index < 0) {
      return Promise.reject(
        new Error("Invalid index provided, cannot update todo")
      );
    }
    if (index >= todoList.todos.length) {
      return Promise.reject(
        new Error("Cannot update todo, todo not found at the specified index")
      );
    }
    if (
      !updatedTask ||
      typeof updatedTask !== "string" ||
      updatedTask.trim().length === 0
    ) {
      return Promise.reject(new Error("Updated task cannot be empty"));
    }
    todoList.todos[index].task = updatedTask;
    return Promise.resolve(todoList.todos[index]);
  },
  removeTodo: (index) => {
    if (isNaN(index) || index < 0) {
      return Promise.reject(
        new Error("Invalid index input, cannot remove todo")
      );
    }
    if (index >= todoList.todos.length) {
      return Promise.reject(
        new Error("Cannot remove todo, todo not found at the specified index")
      );
    }
    const removedTodo = todoList.todos.splice(index, 1);
    return Promise.resolve(`Successfully deleted task`);
  },
};
