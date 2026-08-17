import { useState, useEffect } from "react";
import "./App.css";

import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";

function App() {

   const [task, setTask] = useState("");
const [dueDate, setDueDate] = useState("");
const [priority, setPriority] = useState("medium");
const [tasks, setTasks] = useState([]);
    useEffect(() => {

    fetch("http://localhost:5000/api/tasks")
        .then((response) => response.json())
        .then((data) => {
            setTasks(data);
        })
        .catch((error) => {
            console.error("Error fetching tasks:", error);
        });

}, []);

    const [filter, setFilter] = useState("all");
    const [search, setSearch] = useState("");


    async function addTask() {

    if (task.trim() === "") {
        return;
    }

    try {

        const response = await fetch(
            "http://localhost:5000/api/tasks",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
      body: JSON.stringify({
    text: task,
    dueDate: dueDate || null,
    priority: priority
})
            }
        );

        const newTask = await response.json();

        setTasks([...tasks, newTask]);

        setTask("");
        setDueDate("");
        setPriority("medium");

    } catch (error) {

        console.error("Error adding task:", error);

    }
}


    async function toggleTask(id) {

    const taskToUpdate = tasks.find(
    (item) => item._id === id
);

    if (!taskToUpdate) {
        return;
    }

    try {

        const response = await fetch(
            `http://localhost:5000/api/tasks/${id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
               body: JSON.stringify({
    text: taskToUpdate.text,
    completed: !taskToUpdate.completed,
    dueDate: taskToUpdate.dueDate,
    priority: taskToUpdate.priority
})
            }
        );

        const updatedTask = await response.json();

       setTasks(
    tasks.map((item) =>
        item._id === id ? updatedTask : item
    )
);

    } catch (error) {

        console.error("Error updating task:", error);

    }
}



    async function deleteTask(id) {

    try {

        const response = await fetch(
            `http://localhost:5000/api/tasks/${id}`,
            {
                method: "DELETE"
            }
        );

        if (!response.ok) {
            throw new Error("Failed to delete task");
        }

       setTasks(
    tasks.filter((item) => item._id !== id)
);

    } catch (error) {

        console.error("Error deleting task:", error);

    }
}

async function clearCompleted() {

    const completedTasks = tasks.filter(
        (item) => item.completed
    );

    if (completedTasks.length === 0) {
        return;
    }

    const confirmClear = window.confirm(
        "Are you sure you want to clear all completed tasks?"
    );

    if (!confirmClear) {
        return;
    }

    try {

        const response = await fetch(
            "http://localhost:5000/api/tasks/completed/all",
            {
                method: "DELETE"
            }
        );

        if (!response.ok) {
            throw new Error("Failed to clear completed tasks");
        }

        setTasks(
            tasks.filter((item) => !item.completed)
        );

    } catch (error) {

        console.error(
            "Error clearing completed tasks:",
            error
        );

    }
}

async function editTask(item, newText) {

    if (newText.trim() === "") {
        return;
    }

    try {

        const response = await fetch(
            `http://localhost:5000/api/tasks/${item._id}`,
            {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json"
                },
              body: JSON.stringify({
    text: newText.trim(),
    completed: item.completed,
    dueDate: item.dueDate,
    priority: item.priority
})
            }
        );

        if (!response.ok) {
            throw new Error("Failed to edit task");
        }

        const updatedTask = await response.json();

        setTasks(
            tasks.map((task) =>
                task._id === item._id
                    ? updatedTask
                    : task
            )
        );

    } catch (error) {

        console.error("Error editing task:", error);

    }
}


   const filteredTasks = tasks
    .filter((item) => {

        const matchesSearch =
            item.text
                .toLowerCase()
                .includes(search.toLowerCase());
const matchesFilter =
    filter === "all" ||
    (filter === "pending" && !item.completed) ||
    (filter === "completed" && item.completed) ||
    (filter === "high" && item.priority === "high") ||
    (filter === "medium" && item.priority === "medium") ||
    (filter === "low" && item.priority === "low");

        return matchesSearch && matchesFilter;

    })
    .sort((a, b) => {

        const priorityOrder = {
            high: 1,
            medium: 2,
            low: 3
        };

        return (
            (priorityOrder[a.priority] || 2) -
            (priorityOrder[b.priority] || 2)
        );

    });
    const completedCount = tasks.filter(
    (item) => item.completed
).length;

const pendingCount = tasks.filter(
    (item) => !item.completed
).length;

    return (

        <div className="todo-container">

            <h1>📝 My To-Do List</h1>
            <div className="task-count">
    <span>Total: {tasks.length}</span>
    <span>Pending: {pendingCount}</span>
    <span>Completed: {completedCount}</span>
</div>

    <TodoForm
    task={task}
    setTask={setTask}
    dueDate={dueDate}
    setDueDate={setDueDate}
    priority={priority}
    setPriority={setPriority}
    addTask={addTask}
/>


            <div className="search-box">

                <input
                    type="text"
                    placeholder="🔍 Search tasks..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

            </div>


            <div className="filters">

    <button
        className={filter === "all" ? "active-filter" : ""}
        onClick={() => setFilter("all")}
    >
        All
    </button>

    <button
        className={filter === "pending" ? "active-filter" : ""}
        onClick={() => setFilter("pending")}
    >
        Pending
    </button>

    <button
        className={filter === "completed" ? "active-filter" : ""}
        onClick={() => setFilter("completed")}
    >
        Completed
    </button>
    <button
    className={filter === "high" ? "active-filter" : ""}
    onClick={() => setFilter("high")}
>
    🔴 High
</button>

<button
    className={filter === "medium" ? "active-filter" : ""}
    onClick={() => setFilter("medium")}
>
    🟡 Medium
</button>

<button
    className={filter === "low" ? "active-filter" : ""}
    onClick={() => setFilter("low")}
>
    🟢 Low
</button>

</div>

            <button
    className="clear-completed"
    onClick={clearCompleted}
>
    🧹 Clear Completed
</button>


            <TodoList
                tasks={filteredTasks}
                toggleTask={toggleTask}
                deleteTask={deleteTask}
                editTask={editTask}
            />

        </div>

    );
}

export default App;