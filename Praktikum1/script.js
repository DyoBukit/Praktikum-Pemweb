let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskForm = document.getElementById("taskForm");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const searchInput = document.getElementById("searchInput");
const statusFilter = document.getElementById("statusFilter");

function renderTasks() {
  taskList.innerHTML = "";

  const searchTerm = searchInput.value.toLowerCase();
  const filter = statusFilter.value;

  const filteredTasks = tasks.filter(t => {
    const matchSearch = t.subject.toLowerCase().includes(searchTerm);
    const matchFilter =
      filter === "all" ||
      (filter === "completed" && t.completed) ||
      (filter === "pending" && !t.completed);
    return matchSearch && matchFilter;
  });

  filteredTasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = `task-item ${task.completed ? "completed" : ""}`;
    li.innerHTML = `
      <div>
        <strong>${task.name}</strong> - ${task.subject}<br>
        <small>Deadline: ${task.deadline}</small>
      </div>
      <div>
        <button onclick="toggleComplete(${index})">Complete</button>
        <button onclick="editTask(${index})">Edit</button>
        <button onclick="deleteTask(${index})">Delete</button>
      </div>
    `;
    taskList.appendChild(li);
  });

  const pendingCount = tasks.filter(t => !t.completed).length;
  taskCount.textContent = `Tugas belum selesai: ${pendingCount}`;
}

taskForm.addEventListener("submit", e => {
  e.preventDefault();

  const name = document.getElementById("taskName").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const deadline = document.getElementById("deadline").value;

  if (!name || !subject || !deadline) {
    alert("Semua field wajib diisi!");
    return;
  }

  tasks.push({ name, subject, deadline, completed: false });
  localStorage.setItem("tasks", JSON.stringify(tasks));

  taskForm.reset();
  renderTasks();
});

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function deleteTask(index) {
  if (confirm("Hapus tugas ini?")) {
    tasks.splice(index, 1);
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
  }
}

function editTask(index) {
  const task = tasks[index];
  const newName = prompt("Ubah nama tugas:", task.name);
  const newSubject = prompt("Ubah mata kuliah:", task.subject);
  const newDeadline = prompt("Ubah deadline (YYYY-MM-DD):", task.deadline);

  if (newName && newSubject && newDeadline) {
    tasks[index] = { ...task, name: newName, subject: newSubject, deadline: newDeadline };
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
  }
}

searchInput.addEventListener("input", renderTasks);
statusFilter.addEventListener("change", renderTasks);

renderTasks();
