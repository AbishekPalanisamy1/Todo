

// Define UI Vars

const form = document.querySelector("#task-form");
const taskInput = document.querySelector("#task");
const taskList = document.querySelector(".collection");
const clearBtn = document.querySelector("#clear-btn")


loadEventListerners();

function loadEventListerners() {


    // DOM LOAD EVENT
    document.addEventListener("DOMContentLoaded", getTasks);

    // Add Task Event
    form.addEventListener("submit", addTask);

    // Clear Task Event
    clearBtn.addEventListener("click", clearTask);

    // Remove Task
    taskList.addEventListener("click", removeTask);


}


function getTasks(){

    let tasks;

    if(localStorage.getItem("tasks") === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function(task){
       
    
         const li = document.createElement("li");

        
         li.className = "collection-item";
 

         li.innerText = task;
 
         
         const link = document.createElement("a");
 
        
         link.className = "delete-item secondary-content";
 
      
         link.innerHTML = `<i class="fa fa-remove"></i>`;
 
   
         li.appendChild(link);
 
       
         taskList.appendChild(li);

    })
}

function addTask(e) {

    e.preventDefault();

  

    if (taskInput.value === "") {
        alert("Please fill the field")
    } else {
       
     
        const li = document.createElement("li");

       
        li.className = "collection-item";

       
        li.innerText = taskInput.value;

     
        const link = document.createElement("a");

   
        link.className = "delete-item secondary-content";

     
        link.innerHTML = `<i class="fa fa-remove"></i>`;

        
        li.appendChild(link);


        taskList.appendChild(li);

    
        storeTaskInLocalStorage(taskInput.value);

        taskInput.value = "";


    }

}

function storeTaskInLocalStorage(task){
  let tasks;
  if(localStorage.getItem("tasks")===null){
    tasks=[];
  }
  else{
    tasks=JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(task);
  localStorage.setItem("tasks",JSON.stringify(tasks));
}




function removeTask(e){

    
    if(e.target.parentElement.classList.contains("delete-item")){
        if(confirm("Are you sure want to delete")){
            e.target.parentElement.parentElement.remove();
            removeTaskFromLocalStorage(e.target.parentElement.parentElement);
        }
    };

}

function removeTaskFromLocalStorage(taskElement){

 
    
    let tasks;

    if(localStorage.getItem("tasks") === null){
        tasks = [];
    } else {
        tasks = JSON.parse(localStorage.getItem("tasks"));
    }

    tasks.forEach(function(task, index){
        if(taskElement.innerText === task){
            tasks.splice(index, 1);
        }
    })

    localStorage.setItem("tasks", JSON.stringify(tasks));


}

function clearTask(){
    taskList.innerHTML ="";
    clearTaskFromLocalStorage();
}

function clearTaskFromLocalStorage(){
    localStorage.removeItem("tasks");
}


