const todoService = (repository) => {
  return {
    getTodos: async () => {
      return await repository.getTodos();
    },
    addTodo: async (task) => {
      return await repository.addTodo(task);
    },
    updateTodo: async (index, updatedTask) => {
      return await repository.updateTodo(index, updatedTask);
    },
    removeTodo: async (index) => {
      return await repository.removeTodo(index);
    },
  };
};
module.exports = todoService;
