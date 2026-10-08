const todoForm = document.querySelector("#todo-form");
const todoInput = document.querySelector("#todo-input");
const todoList = document.querySelector("#todo-list");

todoForm.addEventListener("submit", function(event) {
    event.preventDefault();

    console.log("Form submitted");
    console.log(todoInput.value);

    const li = document.createElement("li");
    li.textContent = todoInput.value;

    todoList.appendChild(li);
});