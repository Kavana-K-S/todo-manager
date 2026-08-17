const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },

    completed: {
        type: Boolean,
        default: false
    },

    dueDate: {
        type: Date,
        default: null
    },

    priority: {
        type: String,
        enum: ["low", "medium", "high"],
        default: "medium"
    }
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;