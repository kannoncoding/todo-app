// Esperamos a que el DOM esté listo
document.addEventListener("DOMContentLoaded", () => {
    const taskInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const taskList = document.getElementById("taskList");
  
    // Función para agregar una tarea al DOM
    function addTask(text) {
      const li = document.createElement("li");
  
      li.innerHTML = `
        <span>${text}</span>
        <button class="completeBtn">✔️</button>
        <button class="deleteBtn">🗑️</button>
      `;
  
      taskList.appendChild(li);
    }
  
    // Evento al hacer clic en el botón Agregar
    addTaskBtn.addEventListener("click", () => {
      const taskText = taskInput.value.trim();
  
      if (taskText !== "") {
        addTask(taskText);
        taskInput.value = ""; // limpia el input
        taskInput.focus();    // devuelve el foco al input
      }
    });
  
    // Evento para presionar "Enter" como alternativa al botón
    taskInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        addTaskBtn.click();
      }
    });

    // Delegación de eventos para tareas completadas y eliminadas
    taskList.addEventListener("click", (e) => {
    if (e.target.classList.contains("completeBtn")) {
      const span = e.target.parentElement.querySelector("span");
      span.classList.toggle("done");
    }

    if (e.target.classList.contains("deleteBtn")) {
      e.target.parentElement.remove();
    }
  });

    
  });
  