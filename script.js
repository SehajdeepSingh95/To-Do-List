const input=document.querySelector(".todo_input");
const add_button=document.querySelector(".todo_button");
const ul=document.querySelector(".todo_list");
const input_date=document.querySelector(".todo_date");


let tasks=[];

add_button.addEventListener("click",()=> {
    if (input.value.trim()!=="" && input_date.value!==""){
        addTask() 
    }
    else {
        alert("Please enter a task");
    }   
});

input.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        e.preventDefault();
        if (input.value.trim() !== "" && input_date.value !== "") {
                addTask();
        } else {
            alert("Please enter a task");
        }
    }
});


const addTask=()=>{
    const taskText=input.value.trim();
    tasks.push({
        id: Date.now(),
        text: taskText,
        completed: false,
        date: input_date.value
    });
    input.value = "";
    input_date.value="";
    renderTasks();
    saveTasks();

}

const renderTasks = () => {
    ul.innerHTML = "";

    tasks.forEach(task => {
        const li = document.createElement("li");
        

        const liStyle = task.completed 
            ? 'opacity-60 bg-gray-100' 
            : 'bg-white hover:bg-gray-50';
        
        const textStyle = task.completed 
            ? 'line-through text-gray-500' 
            : 'text-gray-800';
        
        li.className = `flex items-center justify-between p-4 rounded-lg border border-gray-200 shadow-sm transition duration-150 ease-in-out ${liStyle}`;
        li.setAttribute('data-id', task.id); 

        li.innerHTML = `
            <label class="flex items-center space-x-4 flex-grow cursor-pointer">
            <input type="checkbox" 
                ${task.completed ? 'checked' : ''} 
                data-action="toggle" 
                data-id="${task.id}"
                class="h-5 w-5 text-indigo-600 rounded focus:ring-indigo-500 border-gray-300">
        
                <div class="flex flex-col"> 
                    <span class="text-lg ${textStyle} truncate">${task.text}</span>
                    <span class="text-xs italic ${textStyle}">${task.date}</span>
                </div>
            </label>
    
            <button data-action="delete" data-id="${task.id}" class="flex-shrink-0 text-gray-400 hover:text-red-600 p-2 rounded-full transition duration-150 ml-4 deletebtn">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 pointer-events-none" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            </button>`;

        
        ul.appendChild(li);
    });

    
    ul.querySelectorAll("button[data-action='delete']").forEach(btn => {
        btn.addEventListener("click", () => {
            deletebtn(Number(btn.dataset.id));
        });
    });
};



deletebtn=(click)=>{
    tasks=tasks.filter(task=>task.id!==click);
    renderTasks();
    saveTasks();
  }

const saveTasks=() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

window.onload = () => {
    const storedTasks = localStorage.getItem("tasks");
    if (storedTasks) {
        tasks = JSON.parse(storedTasks);
        renderTasks();
    }
};

ul.addEventListener("click", (e) => {
    const action = e.target.dataset.action;
    const id = Number(e.target.dataset.id);

    if (action === "toggle") {
        const task = tasks.find(t => t.id === id);
        if (task) {
            task.completed = !task.completed;
            renderTasks();
            saveTasks();
        }
    }
});
