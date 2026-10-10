const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
    todoList.innerHTML = "";

    tasks.forEach(function(task, index) {
        const li = document.createElement("li");

        const taskText = document.createElement("span");
        taskText.textContent = task.text;

        if (task.completed) {
            taskText.classList.add("completed");
        }

        taskText.addEventListener("click", function() {
            task.completed = !task.completed;
            saveTasks();
            renderTasks();
        });

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";

        editButton.addEventListener("click", function(event) {
            event.stopPropagation();

            const newTask = prompt("Edit your task:", task.text);

            if (newTask !== null && newTask.trim() !== "") {
                task.text = newTask.trim();
                saveTasks();
                renderTasks();
            }
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";

        deleteButton.addEventListener("click", function(event) {
            event.stopPropagation();

            tasks.splice(index, 1);
            saveTasks();
            renderTasks();
        });

        li.appendChild(taskText);
        li.appendChild(editButton);
        li.appendChild(deleteButton);

        todoList.appendChild(li);
    });
}

todoForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const text = todoInput.value.trim();

    if (text === "") {
        return;
    }

    tasks.push({
        text: text,
        completed: false
    });

    saveTasks();
    renderTasks();

    todoInput.value = "";
});

renderTasks();
