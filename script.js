
const todoForm = document.querySelector("#todo-form");
const todoTitle = document.querySelector("#todo-title");
const todoDescription = document.querySelector("#todo-description");
const todoList = document.querySelector("#todo-list");
const submitButton = document.querySelector("#submit-btn");
const cancelButton = document.querySelector("#cancel-btn");

let todos = JSON.parse(localStorage.getItem("todos")) || [];
let editingTodoId = null;

function saveTodos() {
    localStorage.setItem("todos", JSON.stringify(todos));
}

function resetForm() {
    editingTodoId = null;
    todoForm.reset();
    submitButton.textContent = "Add Task";
    cancelButton.hidden = true;
}

function renderTodos() {
    todoList.innerHTML = "";

    if (todos.length === 0) {
        todoList.innerHTML = '<p class="empty-state">No tasks yet. Add your first task!</p>';
        return;
    }

    todos.forEach(function(todo) {
        const item = document.createElement("div");
        item.className = "todo-item";

        const title = document.createElement("h3");
        title.textContent = todo.title;

        const description = document.createElement("p");
        description.textContent = todo.description || "No description provided.";

        const actions = document.createElement("div");
        actions.className = "todo-actions";

        const editButton = document.createElement("button");
        editButton.textContent = "Edit";
        editButton.className = "edit-btn";
        editButton.addEventListener("click", function() {
            todoTitle.value = todo.title;
            todoDescription.value = todo.description;
            editingTodoId = todo.id;
            submitButton.textContent = "Update Task";
            cancelButton.hidden = false;
            todoTitle.focus();
        });

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.className = "delete-btn";
        deleteButton.addEventListener("click", function() {
            todos = todos.filter(item => item.id !== todo.id);
            if (editingTodoId === todo.id) resetForm();
            saveTodos();
            renderTodos();
        });

        actions.append(editButton, deleteButton);
        item.append(title, description, actions);
        todoList.appendChild(item);
    });
}

todoForm.addEventListener("submit", function(event) {
    event.preventDefault();

    const title = todoTitle.value.trim();
    const description = todoDescription.value.trim();

    if (!title) {
        alert("Please enter a task title.");
        return;
    }

    if (editingTodoId !== null) {
        todos = todos.map(todo => todo.id === editingTodoId
            ? { ...todo, title, description, updatedAt: Date.now() }
            : todo
        );
    } else {
        const now = Date.now();
        todos.push({
            id: todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1,
            title,
            description,
            createdAt: now,
            updatedAt: now
        });
    }

    resetForm();
    saveTodos();
    renderTodos();
});

cancelButton.addEventListener("click", resetForm);

renderTodos();