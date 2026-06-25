const express = require("express");
const router = express.Router();
const pool = require("../db");
// get all tasks
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
        "SELECT * FROM tasks ORDER BY created_at DESC"
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({error: err.message});
  }
});
// get a single task by id
router.get('/:id', async (req, res) => {
    try {
        const result = await pool.query(
            'SELECT * FROM tasks WHERE id = $1', [req.params.id]
        );
        if (result.rows.length === 0) {
            return res.status(404).json({error: "Task not found"});
        }
        res.json(result.rows[0]);
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});
// post create task
router.post('/', async (req, res) => {
  const { title, description, due_date, priority } = req.body;
  try {
    const result = await pool.query(
      'INSERT INTO tasks (title, description, due_date, priority) VALUES ($1, $2, $3, $4) RETURNING *',
      [title, description, due_date, priority || 'medium']
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
// put update a task
router.put('/:id', async (req, res) => {
  const { title, description, status, due_date, priority } = req.body;
  try {
    const result = await pool.query(
      'UPDATE tasks SET title=$1, description=$2, status=$3, due_date=$4, priority=$5 WHERE id=$6 RETURNING *',
      [title, description, status, due_date, priority || 'medium', req.params.id]
    );
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
//delete a task
router.delete("/:id", async (req, res) => {
    try {
        await pool.query("DELETE FROM tasks WHERE id = $1", [req.params.id]);
        res.json({message: "Task deleted successfully"});
    } catch (err) {
        res.status(500).json({error: err.message});
    }
});

module.exports = router;