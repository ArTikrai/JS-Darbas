import FormComponent from "./components/form-component.js";
import todoValidator from "./helpers/validators/todo-validator.js";
import ApiService from "./helpers/api-service.js";

const todoList = document.querySelector(".js-todo-list");

const displayTodoItem = ({ completed, title, id }) => {
  const todoItem = document.createElement("div");
  todoItem.className = "todo-list__item";

  const checkbox = document.createElement("i");
  checkbox.className = "checkbox";
  checkbox.classList.add("bi");
  if (completed) checkbox.classList.add("bi-cloud-sun", "checked");
  if (!completed) checkbox.classList.add("bi-cloud");
  checkbox.addEventListener("click", async () => {
    await ApiService.updateTodo({
      id,
      completed: !checkbox.classList.contains("bi-cloud-sun"),
    });

    checkbox.classList.toggle("bi-cloud-sun");
  });

  const todoItemText = document.createElement("div");
  todoItemText.className = "todo-list__item__text";
  todoItemText.innerText = title;

  const btnDelete = document.createElement("button");
  btnDelete.className = "button";
  btnDelete.classList.add("bi", "bi-cloud-lightning-rain");
  btnDelete.addEventListener("click", async () => {
    await ApiService.deleteDoto(id);
    todoItem.remove();
  });

  todoItem.append(checkbox, todoItemText, btnDelete);

  todoList.insertAdjacentElement("afterBegin", todoItem);
};

const formAddTodo = new FormComponent(
  ".js-add-todo-form",
  todoValidator,

  async ({ title }) => {
    const createdTodo = await ApiService.createTodo({ title });
    displayTodoItem(createdTodo);
  }
);

const todos = await ApiService.fetchTodos();
todos.forEach(displayTodoItem);
