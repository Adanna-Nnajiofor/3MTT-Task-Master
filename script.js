const API_URL = "http://localhost:5000";

// DOM elements
const loginForm = document.getElementById("login-form");
const registerForm = document.getElementById("register-form");
const taskSection = document.getElementById("task-section");
const authSection = document.getElementById("auth-section");
const logoutBtn = document.getElementById("logout-btn");
const taskForm = document.getElementById("taskForm");
const registerSection = document.getElementById("register-section");
const loginSection = document.getElementById("auth-section");

// Show the register form and hide the login form
document.getElementById("go-to-register").addEventListener("click", (e) => {
  e.preventDefault();
  loginSection.style.display = "none"; 
  registerSection.style.display = "block"; 
});

// Show the login form and hide the register form
document.getElementById("go-to-login").addEventListener("click", (e) => {
  e.preventDefault();
  registerSection.style.display = "none";
  loginSection.style.display = "block";
});

// Handle user registration
registerForm.onsubmit = async (e) => {
  e.preventDefault();
  const username = document.getElementById("register-username").value;
  const email = document.getElementById("register-email").value;
  const password = document.getElementById("register-password").value;

  const response = await fetch(`${API_URL}/register`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  });

  const data = await response.json();
  if (response.ok) {
    alert("Registration successful!");
    // After registration, show login form again
    registerSection.style.display = "none";
    loginSection.style.display = "block";
  } else {
    alert(data.error || "Registration failed.");
  }
};

// Handle user login
loginForm.onsubmit = async (e) => {
  e.preventDefault();
  const email = document.getElementById("login-email").value;
  const password = document.getElementById("login-password").value;

  const response = await fetch(`${API_URL}/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });

  const data = await response.json();
  if (response.ok) {
    localStorage.setItem("token", data.token);
    loadTasks();
    authSection.style.display = "none";
    taskSection.style.display = "block";
    logoutBtn.style.display = "inline-block";
  } else {
    alert(data.error || "Login failed.");
  }
};

// Load tasks from the server
const loadTasks = async () => {
  const token = localStorage.getItem("token");
  if (!token) return;

  const response = await fetch(`${API_URL}/tasks`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  const tasks = await response.json();
  if (response.ok) {
    taskList.innerHTML = tasks
      .map(
        (task) => `
      <div class="task-item">
        <div>
          <strong>${task.title}</strong>
          <p>${task.description}</p>
          <small>Priority: ${task.priority}</small>
          <small>Due: ${task.deadline}</small>
        </div>
        <button class="delete-task" onclick="deleteTask('${task._id}')">Delete</button>
      </div>
    `
      )
      .join("");
  } else {
    alert("Failed to load tasks.");
  }
};

// Add a new task
taskForm.onsubmit = async (e) => {
  e.preventDefault();
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const priority = document.getElementById("priority").value;
  const deadline = document.getElementById("deadline").value;

  const token = localStorage.getItem("token");
  if (!token) return;

  const response = await fetch(`${API_URL}/tasks`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ title, description, priority, deadline }),
  });

  if (response.ok) {
    loadTasks();
  } else {
    alert("Failed to add task.");
  }
};

// Delete task
const deleteTask = async (taskId) => {
  const token = localStorage.getItem("token");
  if (!token) return;

  const response = await fetch(`${API_URL}/tasks/${taskId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  if (response.ok) {
    loadTasks();
  } else {
    alert("Failed to delete task.");
  }
};

// Logout user
logoutBtn.onclick = () => {
  localStorage.removeItem("token");
  taskSection.style.display = "none";
  authSection.style.display = "block";
  logoutBtn.style.display = "none";
};
