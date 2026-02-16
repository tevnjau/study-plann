const form = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");

function displayTasks() {
  if (!taskList) return;

  taskList.innerHTML = "";

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  if (tasks.length === 0) {
    taskList.innerHTML = "<p class='empty'>You have no tasks</p>";
    return;
  }

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
      displayTasks(); 
    };

    div.appendChild(text);
    div.appendChild(btn);

    taskList.appendChild(div);
  });
}

if (form) {
  form.addEventListener("submit", function(e) {
    e.preventDefault();

    const title = document.getElementById("title").value.trim();
    const date = document.getElementById("date").value;
    const error = document.getElementById("error");

    if (!title || !date) {
      error.textContent = "All fields required!";
      return;
    }

    error.textContent = "";

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
    tasks.push({ title, date });

    localStorage.setItem("tasks", JSON.stringify(tasks));

    form.reset();
    displayTasks(); 
  });
}

displayTasks();