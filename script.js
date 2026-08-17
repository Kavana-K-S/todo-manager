const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

addBtn.addEventListener("click", function () {

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        alert("Please enter a task");
        return;
    }

    // Create task
    const li = document.createElement("li");

    // Create checkbox
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";

    // Create task text
    const span = document.createElement("span");
    span.textContent = taskText;

    // Create delete button
    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "🗑️";

    // Complete task
    checkbox.addEventListener("change", function () {
        span.style.textDecoration =
            checkbox.checked ? "line-through" : "none";
    });

    // Delete task
    deleteBtn.addEventListener("click", function () {
        li.remove();
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);

    taskInput.value = "";
});

const allBtn = document.getElementById("allBtn");
const pendingBtn = document.getElementById("pendingBtn");
const completedBtn = document.getElementById("completedBtn");

function showAllTasks() {
    const tasks = taskList.querySelectorAll("li");

    tasks.forEach(function (task) {
        task.style.display = "flex";
    });
}

function showPendingTasks() {
    const tasks = taskList.querySelectorAll("li");

    tasks.forEach(function (task) {
        const checkbox = task.querySelector("input");

        if (checkbox.checked) {
            task.style.display = "none";
        } else {
            task.style.display = "flex";
        }
    });
}

function showCompletedTasks() {
    const tasks = taskList.querySelectorAll("li");

    tasks.forEach(function (task) {
        const checkbox = task.querySelector("input");

        if (checkbox.checked) {
            task.style.display = "flex";
        } else {
            task.style.display = "none";
        }
    });
}

allBtn.addEventListener("click", showAllTasks);
pendingBtn.addEventListener("click", showPendingTasks);
completedBtn.addEventListener("click", showCompletedTasks);

const searchInput = document.getElementById("searchInput");

searchInput.addEventListener("input", function () {

    const searchText = searchInput.value.toLowerCase();

    const tasks = taskList.querySelectorAll("li");

    tasks.forEach(function (task) {

        const taskText = task.querySelector("span").textContent.toLowerCase();

        if (taskText.includes(searchText)) {
            task.style.display = "flex";
        } else {
            task.style.display = "none";
        }
    });
});

taskInput.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        addBtn.click();
    }

});