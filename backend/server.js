const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const Task = require("./models/Task");

const app = express();
mongoose.connect("mongodb://127.0.0.1:27017/todo_manager")
    .then(() => {
        console.log("MongoDB connected");
    })
    .catch((error) => {
        console.error("MongoDB connection error:", error);
    });

const PORT = 5000;

app.use(cors());
app.use(express.json());



app.get("/api/tasks", async (req, res) => {
    try {
        const tasks = await Task.find();
        res.json(tasks);
    } catch (error) {
        res.status(500).json({
            message: "Failed to get tasks"
        });
    }
});

app.post("/api/tasks", async (req, res) => {
    try {

     const newTask = new Task({
    text: req.body.text,
    dueDate: req.body.dueDate || null,
    priority: req.body.priority || "medium"
});

        const savedTask = await newTask.save();

        res.status(201).json(savedTask);

    } catch (error) {

        res.status(500).json({
            message: "Failed to create task"
        });

    }
});

app.put("/api/tasks/:id", async (req, res) => {
    try {

        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            {
                text: req.body.text,
                completed: req.body.completed,
                dueDate: req.body.dueDate,
                priority: req.body.priority
            },
            { new: true }
        );

        if (!updatedTask) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.json(updatedTask);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to update task"
        });

    }
});

app.delete("/api/tasks/completed/all", async (req, res) => {
    try {

        await Task.deleteMany({
            completed: true
        });

        res.json({
            message: "Completed tasks cleared successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to clear completed tasks"
        });

    }
});

app.delete("/api/tasks/:id", async (req, res) => {
    try {

        const deletedTask = await Task.findByIdAndDelete(req.params.id);

        if (!deletedTask) {
            return res.status(404).json({
                message: "Task not found"
            });
        }

        res.json({
            message: "Task deleted successfully"
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            message: "Failed to delete task"
        });

    }
});

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});