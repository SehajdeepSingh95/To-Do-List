const input = document.querySelector("#todoInput");
const add = document.querySelector("#addButton");
const list = document.querySelector("#todoList");

let tasks = [];
const dateInput = document.getElementById("dateInput");

const today = new Date();
const yyyy = today.getFullYear();
const mm = String(today.getMonth() + 1).padStart(2, "0");
const dd = String(today.getDate()).padStart(2, "0");

dateInput.value = `${yyyy}-${mm}-${dd}`;

function formatDate(dateString) {
    const date = new Date(dateString);
    const dd = String(date.getDate()).padStart(2, "0");
    const mm = String(date.getMonth() + 1).padStart(2, "0");
    const yyyy = date.getFullYear();
    return `${dd}-${mm}-${yyyy}`;
}

function addTask() {
    const TaskText = input.value.trim();
    tasks.push({
        id: Date.now(),
        text: TaskText,
        completed: false,
        date: dateInput.value
    });
    input.value = "";
    renderTasks();
    saveTasks();
}

add.addEventListener("click", () => {
    if (input.value.trim() !== "" && dateInput.value !== "") {
        addTask();
    } else {
        alert("Please enter a task");
    }
});

input.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
        if (input.value.trim() !== "" && dateInput.value !== "") {
            addTask();
        }
    }
});

renderTasks = () => {
    list.innerHTML = "";
    tasks.forEach(task => {
        const li = document.createElement("li");
        
        li.innerHTML = `
          <div class="taskContainer">
            <div class="tasktext" id="text-${task.id}" style="text-decoration:${task.completed ? "line-through" : "none"}">
              ${task.text}
            </div>
            <div class="taskdates" id="date-${task.id}" style="text-decoration:${task.completed ? "line-through" : "none"}">
              ${formatDate(task.date)}
            </div>
            <button class="deleteButton" data-id="${task.id}">Delete</button>
          </div>`;
        
        list.appendChild(li);

        const taskTextDiv = li.querySelector(".tasktext");
        const taskDateDiv = li.querySelector(".taskdates");
        const deleteButton = li.querySelector(".deleteButton");

        taskTextDiv.addEventListener("click", () => {
            if (!task.completed) {
                task.completed = true;
                taskTextDiv.style.textDecoration = "line-through";
                taskDateDiv.style.textDecoration = "line-through";
                deleteButton.style.textDecoration = "line-through";
            } else {
                task.completed = false;
                taskTextDiv.style.textDecoration = "none";
                taskDateDiv.style.textDecoration = "none";
                deleteButton.style.textDecoration = "none";
            }
            saveTasks();
        });
        

        deleteButton.addEventListener("click", (e) => {
            const id = e.target.getAttribute("data-id");
            deleteTask(Number(id));
        });
    });
};



deleteTask = (id) => {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
    saveTasks();
}

saveTasks=() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

window.onload = () => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        renderTasks();
    }
};
