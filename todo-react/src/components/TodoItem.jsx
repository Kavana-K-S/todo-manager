import { useState } from "react";

function TodoItem({ item, toggleTask, deleteTask, editTask }) {

    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(item.text);
    const isOverdue =
    item.dueDate &&
    !item.completed &&
    new Date(item.dueDate) < new Date();

    function handleSave() {

        if (editText.trim() === "") {
            return;
        }

        editTask(item, editText.trim());
        setIsEditing(false);
    }

    function handleCancel() {
        setEditText(item.text);
        setIsEditing(false);
    }

    return (
        <li>

            <input
                type="checkbox"
                checked={item.completed}
                onChange={() => toggleTask(item._id)}
            />

            {isEditing ? (

                <>
                    <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                        autoFocus
                    />

                    <button
                        type="button"
                        onClick={handleSave}
                        title="Save"
                    >
                        💾
                    </button>

                    <button
                        type="button"
                        onClick={handleCancel}
                        title="Cancel"
                    >
                        ❌
                    </button>
                </>

            ) : (

                <>
            <div className="task-content">

    <span
        className={item.completed ? "completed" : ""}
    >
        {item.text}
    </span>

    {item.dueDate && (
    <small className="due-date">
        📅 Due: {new Date(item.dueDate).toLocaleDateString()}
    </small>
)}

{isOverdue && (
    <small className="overdue">
        🔴 Overdue
    </small>
)}

    <small className={`priority ${item.priority || "medium"}`}>
        ⭐ {item.priority || "medium"}
    </small>

</div>

                    <button
                        type="button"
                        onClick={() => setIsEditing(true)}
                        title="Edit"
                    >
                        ✏️
                    </button>

                    <button
    type="button"
    onClick={() => {
        const confirmDelete = window.confirm(
            "Are you sure you want to delete this task?"
        );

        if (confirmDelete) {
            deleteTask(item._id);
        }
    }}
    title="Delete"
>
    🗑️
</button>
                </>

            )}

        </li>
    );
}

export default TodoItem;