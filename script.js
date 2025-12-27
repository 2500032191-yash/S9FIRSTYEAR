// =========================
// Common Utility Functions
// =========================

// Initialize demo data if first time
function initDemoData() {
  if (localStorage.getItem("demoInitialized")) return;

  const demoResources = [
    { id: 1, title: "🧘 Managing Exam Stress", desc: "Practical techniques for staying calm during exams." },
    { id: 2, title: "😴 Better Sleep Habits", desc: "Guide to improving sleep quality for better mental health." },
    { id: 3, title: "🤝 Building Social Connections", desc: "Tips for making friends and support networks." },
    { id: 4, title: "💪 Exercise for Mental Health", desc: "How physical activity improves mood and reduces anxiety." }
  ];

  const demoSessions = [
    { id: 1, topic: "Stress Management Workshop", date: "2025-11-15", time: "2:00 PM" },
    { id: 2, topic: "One-on-One Counseling", date: "2025-11-18", time: "10:00 AM" },
    { id: 3, topic: "Group Therapy Session", date: "2025-11-20", time: "4:00 PM" }
  ];

  const demoUpdates = [
    { id: 1, message: "Welcome to the Mental Health Support Platform!", date: "2025-11-01" },
    { id: 2, message: "New wellness workshop series starting next week.", date: "2025-11-05" }
  ];

  saveData("resources", demoResources);
  saveData("sessions", demoSessions);
  saveData("updates", demoUpdates);
  saveData("students", []);

  localStorage.setItem("demoInitialized", "true");
}

// Save data
function saveData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Get data
function getData(key) {
  return JSON.parse(localStorage.getItem(key)) || [];
}

// =========================
// Theme Toggle
// =========================
function applyTheme(theme) {
  document.documentElement.classList.toggle("dark-theme", theme === "dark");
  localStorage.setItem("theme", theme);
}

function toggleTheme() {
  applyTheme(
    document.documentElement.classList.contains("dark-theme") ? "light" : "dark"
  );
}

document.addEventListener("DOMContentLoaded", () => {
  initDemoData();
  applyTheme(localStorage.getItem("theme") || "light");

  const btn = document.createElement("button");
  btn.innerHTML = "🌓";
  btn.className = "theme-toggle";
  btn.onclick = toggleTheme;
  document.body.appendChild(btn);
});

// =========================
// ADMIN LOGIN
// =========================
const adminLoginForm = document.getElementById("adminLoginForm");
if (adminLoginForm) {
  adminLoginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = adminLoginForm.adminEmail.value;
    const password = adminLoginForm.adminPassword.value;

    if (email === "g.ramesh120807@gmail.com" && password === "123") {
      window.location.href = "admin.html";
    } else {
      document.getElementById("adminLoginMsg").innerText =
        "Invalid admin credentials!";
    }
  });
}

// =========================
// STUDENT SIGNUP
// =========================
const signupForm = document.getElementById("signupForm");
if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const name = signupForm.studentName.value;
    const email = signupForm.studentSignupEmail.value;
    const password = signupForm.studentSignupPassword.value;
    const confirm = signupForm.confirmPassword.value;

    if (password !== confirm) {
      document.getElementById("signupMsg").innerText = "Passwords do not match!";
      return;
    }

    const students = getData("students");
    if (students.find((s) => s.email === email)) {
      document.getElementById("signupMsg").innerText =
        "Account already exists!";
      return;
    }

    students.push({ name, email, password });
    saveData("students", students);

    document.getElementById("signupMsg").innerText =
      "Account created! Redirecting...";
    setTimeout(() => (window.location.href = "student-login.html"), 1500);
  });
}

// =========================
// STUDENT LOGIN
// =========================
const studentLoginForm = document.getElementById("studentLoginForm");
if (studentLoginForm) {
  studentLoginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = studentLoginForm.studentEmail.value;
    const password = studentLoginForm.studentPassword.value;

    const students = getData("students");
    const user = students.find(
      (s) => s.email === email && s.password === password
    );

    if (user) {
      localStorage.setItem("currentStudent", JSON.stringify(user));
      window.location.href = "student.html";
    } else {
      document.getElementById("studentLoginMsg").innerText =
        "Invalid email or password!";
    }
  });
}

// =========================
// ADMIN DASHBOARD
// =========================
const resourceForm = document.getElementById("resourceForm");
if (resourceForm) {
  resourceForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const title = resourceForm.resourceTitle.value;
    const desc = resourceForm.resourceContent.value;

    const resources = getData("resources");
    resources.push({ title, desc });
    saveData("resources", resources);

    resourceForm.reset();
    loadAdminResources();
  });
}

function loadAdminResources() {
  const list = document.getElementById("resourceList");
  if (!list) return;

  list.innerHTML = "";
  getData("resources").forEach((r) => {
    const li = document.createElement("li");
    li.textContent = `${r.title}: ${r.desc}`;
    list.appendChild(li);
  });
}

// =========================
// STUDENT DASHBOARD
// =========================
function loadStudentResources() {
  const list = document.getElementById("studentResourceList");
  if (!list) return;

  list.innerHTML = "";
  const resources = getData("resources");

  if (resources.length === 0) {
    list.innerHTML = "<li>No resources available.</li>";
    return;
  }

  resources.forEach((r) => {
    const li = document.createElement("li");
    li.textContent = `${r.title}: ${r.desc}`;
    list.appendChild(li);
  });
}

loadAdminResources();
loadStudentResources();
