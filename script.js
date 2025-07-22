const todoList=[];
const inputElement = document.querySelector("input");
const dateInputElement = document.querySelector(".date-input");


renderTodoList();

inputElement.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    addtodo();
  }
});

function renderTodoList(){
    
let todoListHTML=``;

    for (i=0; i<=todoList.length-1; i++){
        const todo = todoList[i];
        const html = `<p class="todoListElementsList">
                      <span class="todo-name">
                          ${todo.name}
                      </span>
                      <span class="todo-date">
                          ${todo.dueDate}
                      </span>
                      <button onclick="deleteIt(${i})" class="delete-btn">
                          Delete
                      </button>
                      </p>`;
    todoListHTML += html;
  }
    document.querySelector(".list").innerHTML=todoListHTML;
    inputElement.value="";
}
function addtodo(){
    const inputElement=document.querySelector("input");
    const name=inputElement.value;
    const dueDate = dateInputElement.value;
    if (!name) {
      inputElement.focus();
      alert("Todo name is required.");
      return;
    }

    if (!dueDate) {
      dateInputElement.focus();
      alert("Due date is required.");
      return;
    }
    todoList.push({ name, dueDate });
    inputElement.value = "";
    dateInputElement.value = "";
    renderTodoList();
}

function deleteIt(index) {
      todoList.splice(index, 1);
      renderTodoList();
    }