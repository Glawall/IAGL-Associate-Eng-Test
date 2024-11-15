const todoService = (repository) => {
  return {
    getTodos: async () => {
      return await repository.getTodos();
    },
    addTodo: async (task) => {
      if (!task) {
        throw new Error("Task cannot be empty");
      }
      return await repository.addTodo(task);
    },
  };
};
module.exports = todoService;
