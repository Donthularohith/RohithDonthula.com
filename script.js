// Mobile nav toggle
const navToggle = document.querySelector(".nav-toggle");
const nav = document.querySelector(".nav");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    nav.classList.toggle("open");
  });

  nav.addEventListener("click", (e) => {
    if (e.target.tagName === "A") {
      nav.classList.remove("open");
    }
  });
}
// Loader overlay: hide after animation
window.addEventListener("load", () => {
    const overlay = document.getElementById("loader-overlay");
    if (!overlay) return;
  
    // Wait slightly longer than bar animation
    setTimeout(() => {
      overlay.classList.add("hidden");
    }, 2400);
  });
  
  // Decode binary message button
const decodeBtn = document.getElementById("decode-btn");
const binaryEl = document.getElementById("binary-message");
const decodedOutput = document.getElementById("decoded-output");

if (decodeBtn && binaryEl && decodedOutput) {
  decodeBtn.addEventListener("click", () => {
    const binaryText = binaryEl.textContent.trim().replace(/\s+/g, " ");
    const bytes = binaryText.split(" ");

    const decoded = bytes
      .filter(Boolean)
      .map(b => String.fromCharCode(parseInt(b, 2)))
      .join("");

    decodedOutput.textContent = decoded; // shows: "from past to future"
    decodeBtn.textContent = "Decoded";
    decodeBtn.disabled = true;
  });
}
