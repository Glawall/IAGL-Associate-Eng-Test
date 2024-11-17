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
  it("if no todo added, throw an error and reject invalid todo input", async () => {
    const newTodo = "";
    const expected = "Todo input cannot be empty";
    try {
      await repository.addTodo(newTodo);
    } catch (error) {
      expect(error.message).toBe(expected);
    }
  });

  describe("updateTodo", () => {
    it("should update a todo in the list and return the todo", async () => {
      const updatedTodo = "Test the updateTodo repository";
      const index = 0;
      const expected = { task: updatedTodo };
      const actual = await repository.updateTodo(index, updatedTodo);
      expect(actual).toEqual(expected);
    });
    it("if no todo content, reject invalid todo input", async () => {
      const updatedTodo = "";
      const index = 0;
      const expected = "Updated task cannot be empty";
      try {
        await repository.updateTodo(index, updatedTodo);
      } catch (error) {
        expect(error.message).toEqual(expected);
      }
    });
  });
  it("if invalid index input provided, reject invalid index input", async () => {
    const updatedTodo = "Update toDo";
    const index = "abc";
    const expected = "Invalid index provided, cannot update todo";
    try {
      await repository.updateTodo(index, updatedTodo);
    } catch (error) {
      expect(error.message).toEqual(expected);
    }
  });
  it("if index not in todolist provided, reject non-existent todo", async () => {
    const updatedTodo = "Update toDo";
    const index = 9999;
    const expected =
      "Cannot update todo, todo not found at the specified index";
    try {
      await repository.updateTodo(index, updatedTodo);
    } catch (error) {
      expect(error.message).toEqual(expected);
    }
  });
});

describe("removeTodo", () => {
  it("should remove a todo from the list", async () => {
    const index = 0;
    const expected = "Successfully deleted task";
    const actual = await repository.removeTodo(index);
    expect(actual).toEqual(expected);
  });
  it("if index is not a valid number, reject invalid input", async () => {
    const index = "abc";
    const expected = "Invalid index input, cannot remove todo";
    try {
      await repository.removeTodo(index);
    } catch (error) {
      expect(error.message).toEqual(expected);
    }
  });
  it("if index is not found in the todolist, reject not found index", async () => {
    const index = 999;
    const expected =
      "Cannot remove todo, todo not found at the specified index";
    try {
      await repository.removeTodo(index);
    } catch (error) {
      expect(error.message).toEqual(expected);
    }
  });
});
