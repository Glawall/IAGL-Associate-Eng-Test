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
      return Promise.reject("Invalid todo input");
    }
  },
};
