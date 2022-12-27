const input = document.querySelector("#input-field");
const taskList = document.querySelector("#task-list");

let taskNumber = 0;

function addTask(event) {
    if (input.value.trim().length != 0) {
        taskNumber++;

        // create div for the task
        let taskDiv = document.createElement("div");
        taskDiv.setAttribute("class", "task-" + taskNumber);

        // task div styling
        taskDiv.style.display = "flex";
        taskDiv.style.alignItems = "center";
        taskDiv.style.flexWrap = "wrap";
        taskDiv.style.width = "100%";

        // create elements to go in the task div
        let checkbox = document.createElement("input");
        let task = document.createElement("p");
        let editButton = document.createElement("button");
        let removeButton = document.createElement("button");
        
        // set element attributes
        checkbox.setAttribute("type", "checkbox");
        checkbox.addEventListener("change", () => {
            if (checkbox.checked == true){
                task.style.textDecoration = "line-through";
            } else {
                task.style.textDecoration = "none";
            }
        });
        task.innerText = input.value;
        task.style.marginRight = "auto";
        editButton.innerText = "Edit";
        editButton.addEventListener("click", () => {
            task.setAttribute("contenteditable", "true");
        });
        removeButton.innerText = "x";
        removeButton.addEventListener("click", () => {taskDiv.remove()});

        // add all the elements to the task div
        taskDiv.append(checkbox, task, editButton, removeButton);

        // add the task to the task list and clear the input field
        taskList.append(taskDiv);
        input.value = "";
    }
}


function editTask(task) {
    
}
