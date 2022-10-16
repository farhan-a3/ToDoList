const input = document.getElementById("inputField");
const list = document.getElementById("list");

input.addEventListener("keypress", addTask);

function addTask(event) {
    if (event.key === "Enter" && input.value.length != 0) {
        let row = document.createElement("div");
        let task = document.createElement("li");
        let cross = document.createElement("img");

        task.class = "uncrossed";
        task.innerText = input.value;
        cross.src = "images/cross.png";
        cross.style.maxWidth = "25px";
        cross.style.maxHeight = "25px";

        row.appendChild(task);
        row.appendChild(cross);
        list.appendChild(row);
        input.value = "";

        task.addEventListener("click", function() {
            if (task.class === "uncrossed") {
                task.style.textDecoration = "line-through";
                task.class = "crossed";
            } else {
                task.style.textDecoration = "none";
                task.class = "uncrossed";
            }
        });

        cross.addEventListener("click", function() {
            task.remove();
            cross.remove();
        });
    }
}