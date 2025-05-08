document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const taskList = document.getElementById("taskList");

  let tasks = [];

  function saveTasks() {
    localStorage.setItem("todo-tasks", JSON.stringify(tasks));
  }

  function loadTasks() {
    const data = localStorage.getItem("todo-tasks");
    if (data) {
      tasks = JSON.parse(data);
    }
    renderTasks();
  }

  function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";
  
    const filter = document.querySelector(".filterBtn.active")?.dataset.filter || "all";
    let filtered = [...tasks];
  
    if (filter === "active") filtered = tasks.filter(t => !t.completed);
    else if (filter === "completed") filtered = tasks.filter(t => t.completed);
  
    filtered.forEach((task, index) => {
      const li = document.createElement("li");
      li.innerHTML = `
        <span class="${task.completed ? 'done' : ''}">${task.text}</span>
        <button class="completeBtn" data-index="${index}">✔️</button>
        <button class="deleteBtn" data-index="${index}">🗑️</button>
      `;
      taskList.appendChild(li);
    });
  
    updateCounter();

    document.querySelectorAll(".filterBtn").forEach(btn => {
      btn.addEventListener("click", () => {
        document.querySelectorAll(".filterBtn").forEach(b => b.classList.remove("active"));
        btn.classList.add("active");
        renderTasks();
      });
    });
    
  }
  

  function updateCounter() {
    const activeCount = tasks.filter(t => !t.completed).length;
    const text = activeCount === 1 ? "1 tarea pendiente" : `${activeCount} tareas pendientes`;
    document.getElementById("taskCounter").textContent = text;
  }
  

  function addTask(text) {
    const task = {
      text: text,
      completed: false
    };
    tasks.push(task);
    saveTasks();
    renderTasks();
  }

  addTaskBtn.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText !== "") {
      addTask(taskText);
      taskInput.value = "";
      taskInput.focus();
    }
  });

  taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") {
      addTaskBtn.click();
    }
  });

  taskList.addEventListener("click", (e) => {
    const index = e.target.dataset.index;
    if (e.target.classList.contains("completeBtn")) {
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    }
    if (e.target.classList.contains("deleteBtn")) {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    }
  });

  const darkToggleBtn = document.getElementById("toggleDarkMode");

  darkToggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    darkToggleBtn.textContent = document.body.classList.contains("dark") ? "☀️ Modo claro" : "🌙 Modo oscuro";
  });


  loadTasks(); // Cargar al inicio
});
