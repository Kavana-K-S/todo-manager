import TodoItem from "./TodoItem";

function TodoList({ tasks, toggleTask, deleteTask, editTask }) {

    return (
        <ul>

            {tasks.length === 0 ? (

                <p className="empty-message">
                    No tasks found.
                </p>

            ) : (

                tasks.map((item) => (

                    <TodoItem
                        key={item._id}
                        item={item}
                        toggleTask={toggleTask}
                        deleteTask={deleteTask}
                        editTask={editTask}
                    />

                ))

            )}

        </ul>
    );
}

export default TodoList;