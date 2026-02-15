const form = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");

function displayTasks() {
  if (!taskList) return;

  taskList.innerHTML = "";

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  tasks.forEach((task, index) => {
    const div = document.createElement("div");
    div.className = "task";

    const text = document.createElement("span");
    text.textContent = `${task.title} — ${task.date}`;

    const btn = document.createElement("button");
    btn.textContent = "Delete";

    btn.onclick = () => {
      tasks.splice(index, 1);
      localStorage.setItem("tasks", JSON.stringify(tasks));
      displayTasks(); // redraw instantly
    };

    div.appendChild(text);
    div.appendChild(btn);

    taskList.appendChild(div);
  });
}
