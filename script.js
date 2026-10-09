const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");

todoForm.addEventListener("submit", function(event) {
    event.preventDefault();

    if (todoInput.value.trim() === "") {
    return;
}

    console.log("Form submitted");
    console.log(todoInput.value);

    const li = document.createElement("li");

    const taskText = document.createElement("span");
    taskText.textContent = todoInput.value.trim();

    taskText.addEventListener("click", function() {
    li.classList.toggle("completed");
});

    li.appendChild(taskText);
   

     const editButton = document.createElement("button");
    editButton.textContent = "Edit";

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";

    li.appendChild(editButton);
    li.appendChild(deleteButton);

   deleteButton.addEventListener("click", function(event) {
    event.stopPropagation();
    li.remove();
});
 
    editButton.addEventListener("click", function(event) {
    event.stopPropagation();

    const newTask = prompt("Edit your task:", taskText.textContent);

    if (newTask !== null && newTask.trim() !== "") {
        taskText.textContent = newTask.trim();
    }
});

    todoList.appendChild(li);
    todoInput.value = "";
});
   