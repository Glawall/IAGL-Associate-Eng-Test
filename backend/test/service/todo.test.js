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
    const todoList = { todos: [] };
    const todoRepository = {
      addTodo: (newTask) => {
        if (typeof newTask === "string" && newTask.trim().length > 0) {
          const newTodo = { task: newTask };
          todoList.todos.push(newTodo);
          return Promise.resolve(newTodo);
        } else {
          return Promise.reject(new Error("Todo input cannot be empty"));
        }
      },
    };
    const todoService = require("../../src/service/todo")(todoRepository);
    const actual = await todoService.addTodo(newTodo);

    expect(actual).toEqual(expected);
  });
  it("if no task added, throw an error and reject invalid todo input", async () => {
    const newTodo = "";
    const expected = "Todo input cannot be empty";
    const todoRepository = {
      addTodo: (newTask) => {
        if (typeof newTask === "string" && newTask.trim().length > 0) {
          const newTodo = { task: newTask };
          todoList.todos.push(newTodo);
          return Promise.resolve(newTodo);
        } else {
          return Promise.reject(new Error("Todo input cannot be empty"));
        }
      },
    };
    const todoService = require("../../src/service/todo")(todoRepository);
    try {
      await todoService.addTodo(newTodo);
    } catch (error) {
      expect(error.message).toBe(expected);
    }
  });
});

describe("TODO Service - updateTodo", () => {
  it("should update a todo in the list and return the todo", async () => {
    const updatedTodo = "Test the updateTodo service";
    const index = 0;
    const expected = { task: updatedTodo };
    const todoList = { todos: [{ task: "Needs updating" }] };
    const todoRepository = {
      updateTodo: async (index, updatedTask) => {
        if (typeof index !== "number" || index < 0) {
          return Promise.reject(
            new Error("Invalid index provided, cannot update todo")
          );
        }
        if (index >= todoList.todos.length) {
          return Promise.reject(
            new Error(
              "Cannot update todo, todo not found at the specified index"
            )
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
    };
    const todoService = require("../../src/service/todo")(todoRepository);
    const actual = await todoService.updateTodo(index, updatedTodo);
    expect(actual).toEqual(expected);
  });
  it("if invalid index provided, throw an error and reject", async () => {
    const updatedTodo = "Test the updateTodo service";
    index = "invalid";
    const expected = "Invalid index provided, cannot update todo";
    const todoList = { todos: [{ task: "Needs updating" }] };

    const todoRepository = {
      updateTodo: async (index, updatedTask) => {
        if (typeof index !== "number" || index < 0) {
          return Promise.reject(
            new Error("Invalid index provided, cannot update todo")
          );
        }
        if (index >= todoList.todos.length) {
          return Promise.reject(
            new Error(
              "Cannot update todo, todo not found at the specified index"
            )
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
    };
    const todoService = require("../../src/service/todo")(todoRepository);
    try {
      await todoService.updateTodo(index, updatedTodo);
    } catch (error) {
      expect(error.message).toBe(expected);
    }
  });
  it("if invalid index provided, throw an error and reject", async () => {
    const updatedTodo = "";
    const index = 0;
    const expected = "Updated task cannot be empty";
    const todoList = { todos: [{ task: "Needs updating" }] };

    const todoRepository = {
      updateTodo: async (index, updatedTask) => {
        if (typeof index !== "number" || index < 0) {
          return Promise.reject(
            new Error("Invalid index provided, cannot update todo")
          );
        }
        if (index >= todoList.todos.length) {
          return Promise.reject(
            new Error(
              "Cannot update todo, todo not found at the specified index"
            )
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
    };
    const todoService = require("../../src/service/todo")(todoRepository);
    try {
      await todoService.updateTodo(index, updatedTodo);
    } catch (error) {
      expect(error.message).toBe(expected);
    }
  });
});

describe("TODO Service - removeTodo", () => {
  it("should remove a task from the list and return a success message", async () => {
    const index = 0;
    const todoList = { todos: [{ task: "Needs deleting" }] };
    const expected = `Successfully deleted task`;

    const todoRepository = {
      removeTodo: (index) => {
        if (isNaN(index) || index < 0) {
          return Promise.reject(
            new Error("Invalid index input, cannot remove todo")
          );
        }
        if (index >= todoList.length) {
          return Promise.reject(
            new Error(
              "Cannot remove todo, todo not found at the specified index"
            )
          );
        }
        const removedTodo = todoList.todos.splice(index, 1);
        return Promise.resolve(`Successfully deleted task`);
      },
    };
    const todoService = require("../../src/service/todo")(todoRepository);
    const actual = await todoService.removeTodo(index);
    expect(actual).toEqual(expected);
  });
  it("if index is not a valid number, or the task does not exist, throw an error and reject 'Invalid index input'", async () => {
    const index = 999;
    const expected =
      "Cannot remove todo, todo not found at the specified index";
    const todoList = { todos: [{ task: "Needs deleting" }] };
    const todoRepository = {
      removeTodo: (index) => {
        if (isNaN(index) || index < 0) {
          return Promise.reject(
            new Error("Invalid index input, cannot remove todo")
          );
        }
        if (index >= todoList.todos.length) {
          return Promise.reject(
            new Error(
              "Cannot remove todo, todo not found at the specified index"
            )
          );
        }
        const removedTodo = todoList.todos.splice(index, 1);
        return Promise.resolve(`Successfully deleted task}`);
      },
    };
    const todoService = require("../../src/service/todo")(todoRepository);
    try {
      await todoService.removeTodo(index);
    } catch (error) {
      expect(error.message).toBe(expected);
    }
  });
});
