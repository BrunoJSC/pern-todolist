const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

const PORT = 3000;

// middleware
app.use(express.json());
app.use(cors());

// ROUTES

// Create todo
app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await pool.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *", // $1 is the placeholder for the description
      [description]
    );
    res.json(newTodo);
    console.log(req.body);
  } catch (error) {
    console.log(error.message);
  }
});

// Get all todos
app.get("/todos", async (req, res) => {
  try {
    const allTodo = await pool.query("SELECT * FROM todo");
    res.json(allTodo.rows);
  } catch (error) {
    console.log(error.message);
  }
});

// get a todo
app.get("/todos/:id", async (req, res) => {
  try {
    console.log(req.params.id);
    const { id } = req.params;
    const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(todo.rows[0]);
  } catch (error) {
    console.log(error.message);
  }
});

// update todo
app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;

    const updateTodo = await pool.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id] // Trocando a ordem dos parâmetros
    );

    res.json({ message: "Todo updated successfully" });
  } catch (error) {
    console.log(error.message);
    res
      .status(500)
      .json({ error: "An error occurred while updating the todo" });
  }
});

// delete todo
app.delete("/todos/:id", async (req, res) => {
  console.log(req.params.id);
  try {
    console.log(req.params.id);
    const { id } = req.params;
    const deleTodo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.json(deleTodo);
  } catch (error) {
    console.log(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
