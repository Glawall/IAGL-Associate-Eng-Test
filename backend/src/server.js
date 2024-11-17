const express = require("express");
const cors = require("cors");
const repository = require("./repository/todo");
const todoService = require("./service/todo")(repository);

const server = () => {
  const server = express();
  server.use(express.json());
  server.use(cors());

  server.get("/api/todo", async (req, res) => {
    res.json(await todoService.getTodos());
  });

  server.post("/api/todo", async (req, res) => {
    const { task } = req.body;
    if (!task) {
      return res.status(400).json({ message: "Need to add a task" });
    }
    const postTodo = await todoService.addTodo(task);
    res.status(201).json(postTodo);
  });
  server.put("/api/todo/:index", async (req, res) => {
    let { index } = req.params;
    index = Number(index);
    const { updatedTask } = req.body;
    const updatedTodo = await todoService.updateTodo(index, updatedTask);
    res.status(200).json(updatedTodo);
  });

  server.delete("/api/todo/:index", async (req, res) => {
    let { index } = req.params;
    try {
      const deletedTodo = await todoService.removeTodo(index);
      res.status(200).json(deletedTodo);
    } catch (error) {
      console.log(error);
      res.status(400).json({ message: error.message });
    }
  });
  return server;
};
module.exports = server;
