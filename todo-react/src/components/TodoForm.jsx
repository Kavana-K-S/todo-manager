function TodoForm({
    task,
    setTask,
    dueDate,
    setDueDate,
    priority,
    setPriority,
    addTask
}) {

    return (
        <div className="todo-input">

            <input
                type="text"
                placeholder="Enter a task..."
                value={task}
                onChange={(e) => setTask(e.target.value)}
                onKeyDown={(e) => {
                    if (e.key === "Enter") {
                        addTask();
                    }
                }}
            />

            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
            />

            <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
            >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
            </select>

            <button onClick={addTask}>
                Add
            </button>

        </div>
    );
}

export default TodoForm;