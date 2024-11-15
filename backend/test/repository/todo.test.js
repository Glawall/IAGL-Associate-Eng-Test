const repository = require("../../src/repository/todo");

describe("getTodos", () => {
  it("GET: 200 - getTodos should return the todo list", async () => {
    const expected = {
      todos: [
        {
          task: "This is a todo example",
        },
      ],
    };
    const actual = await repository.getTodos();
    expect(actual).toEqual(expected);
  });
});

describe("addTodo", () => {
  it("should add a new todo to the list and return the todo", async () => {
    const newTodo = "Test the addTodo repository";
    const expected = { task: newTodo };
    const actual = await repository.addTodo(newTodo);
    expect(actual).toEqual(expected);
  });
  it("if no task added, throw an error and reject invalid todo input", async () => {
    const newTodo = "";
    const expected = "Invalid todo input";
    try {
      await repository.addTodo(newTodo);
    } catch (error) {
      expect(error).toBe(expected);
    }
  });
});
