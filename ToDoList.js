const input = document.querySelector("#input-field");
const taskList = document.querySelector("#task-list");

let taskCounter = 0;
let checkedTaskCount = 0;

document.querySelector("#input-button").addEventListener("click", addTask);
document.querySelector("#input-field").addEventListener("keypress", (event) => {if (event.key === "Enter") addTask()});
let removeCheckedButton = document.querySelector("#remove-checked-button");
removeCheckedButton.addEventListener("click", removeCheckedTasks);
removeCheckedButton.disabled = true;
let progressBarLabel = document.querySelector("#progress-label");

function addTask() {
    if (input.value.trim().length != 0) {
        taskCounter++;
        updateProgressBar();

        // create div for the task
        let taskDiv = document.createElement("div");
        taskDiv.className = "task " + taskCounter;

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
        checkbox.type = "checkbox";
        checkbox.addEventListener("change", () => {
            if (checkbox.checked){
                task.style.textDecoration = "line-through";
                task.className = "checked";
                checkedTaskCount++;
                updateProgressBar();
            } else {
                task.style.textDecoration = "none";
                task.className = "unchecked";
                checkedTaskCount--;
                updateProgressBar();
            }

            if (checkedTaskCount > 0) removeCheckedButton.disabled = false; 
            else removeCheckedButton.disabled = true;
            updateProgressBar();
        });
        task.innerText = input.value;
        task.className = "unchecked";
        task.style.marginRight = "auto";
        task.addEventListener("keypress", (event) => {if (event.key === "Enter") stopEditingTask(task)});
        task.addEventListener("blur", () => stopEditingTask(task));
        editButton.innerText = "Edit";
        editButton.addEventListener("click", () => {
            task.contentEditable = "true";
        });
        removeButton.innerText = "x";
        removeButton.addEventListener("click", () => {
            removeTask(taskDiv);
            if (checkbox.checked) checkedTaskCount--;
            taskCounter--;
            if (taskCounter == 0) removeCheckedButton.disabled = true;
            updateProgressBar();
        });

        // add all the elements to the task div
        taskDiv.append(checkbox, task, editButton, removeButton);

        // add the task to the task list and clear the input field
        taskList.append(taskDiv);
        input.value = "";
    }
}

function removeTask(taskDiv) {
    taskDiv.remove();
}

function stopEditingTask(task) {
    task.contentEditable = "false";
}

function removeCheckedTasks() {
    allTasks = document.querySelectorAll(".task");
    tasksRemoved = 0;

    for (task of allTasks) {
        if (task.firstChild.checked) {
            task.remove();
            tasksRemoved++;
        }
    }
    
    taskCounter -= tasksRemoved;
    checkedTaskCount -= tasksRemoved;
    removeCheckedButton.disabled = true;
    updateProgressBar();
}

function updateProgressBar() {
    if (taskCounter == 0) {
        progressBarLabel.innerText = "No tasks";
        document.querySelector("#progress").style.width = "0%";
    } else {
        progressBarLabel.innerHTML = "<strong>" + checkedTaskCount + "</strong> of <strong>" + taskCounter + "</strong> tasks done";
        document.querySelector("#progress").style.width = (checkedTaskCount / taskCounter) * 100 + "%";
    }
}
