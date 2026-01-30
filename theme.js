// Light/Dark Mode Theme Switcher

const THEME_KEY = "theme_mode";

function initTheme() {
  const saved = localStorage.getItem(THEME_KEY);
  const theme = saved || "dark";
  setTheme(theme);
}

function setTheme(theme) {
  document.documentElement.setAttribute("data-theme", theme);
  localStorage.setItem(THEME_KEY, theme);
  updateThemeButton(theme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute("data-theme");
  const newTheme = current === "dark" ? "light" : "dark";
  setTheme(newTheme);
}

function updateThemeButton(theme) {
  const btn = document.getElementById("theme-btn");
  if (btn) {
    btn.textContent = theme === "dark" ? "☀️ Light" : "🌙 Dark";
  }
}

document.addEventListener("DOMContentLoaded", initTheme);
