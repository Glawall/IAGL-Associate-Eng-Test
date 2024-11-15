describe("TODO Service - getTodos", () => {
  it("should be able to get todos from repository", async () => {
    const expected = {
      todos: [
        {
          task: "This is a task to be done",
        },
      ],
    };
    const todoRepository = {
      getTodos: async () => Promise.resolve(expected),
    };

    const todoService = require("../../src/service/todo")(todoRepository);
    const actual = await todoService.getTodos();
    expect(actual).toEqual(expected);
  });
});

describe("TODO Service - addTodo", () => {
  it("should add a new todo to the list and return the todo", async () => {
    const newTodo = "Test the addTodo service";
    const expected = { task: newTodo };
    const todoRepository = {
      addTodo: async (task) => Promise.resolve({ task }),
    };
    const todoService = require("../../src/service/todo")(todoRepository);
    const actual = await todoService.addTodo(newTodo);

    expect(actual).toEqual(expected);
  });
  it("if no task added, throw an error and reject invalid todo input", async () => {
    const newTodo = "";
    const expected = "Task cannot be empty";
    const todoRepository = {
      addTodo: async (task) => Promise.resolve({ task }),
    };
    const todoService = require("../../src/service/todo")(todoRepository);
    try {
      await todoService.addTodo(newTodo);
    } catch (error) {
      expect(error.message).toBe(expected);
    }
  });
});
