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
// Loader overlay: terminal-style intro with skip
window.addEventListener("load", () => {
  const overlay = document.getElementById("loader-overlay");
  const body = overlay ? overlay.querySelector(".loader-body") : null;
  const skipBtn = document.getElementById("loader-skip");

  const messages = [
    "booting rd-sec portfolio v1.0...",
    "loading threat intelligence feeds...",
    "initializing detection rules and playbooks...",
    "hardening perimeter firewalls...",
    "establishing encrypted channel...",
    "ready. transferring control to ui."
  ];

  const timeouts = [];

  const hideOverlay = () => {
    if (overlay && !overlay.classList.contains("hidden")) {
      overlay.classList.add("hidden");
    }
    timeouts.forEach((t) => clearTimeout(t));
  };

  const appendLine = (text, isLast) => {
    if (!body) return;
    const line = document.createElement("div");
    line.className = "loader-line";
    line.innerHTML = `&gt; ${text}`;
    body.appendChild(line);

    if (isLast) {
      const cursor = document.createElement("span");
      cursor.className = "loader-cursor";
      cursor.textContent = "_";
      body.appendChild(cursor);
    }
  };

  if (body) {
    messages.forEach((msg, index) => {
      const timeout = setTimeout(() => {
        appendLine(msg, index === messages.length - 1);
        if (index === messages.length - 1) {
          const finalTimeout = setTimeout(hideOverlay, 900);
          timeouts.push(finalTimeout);
        }
      }, 550 * index);
      timeouts.push(timeout);
    });

    // Safety timeout in case something goes wrong
    const safetyTimeout = setTimeout(hideOverlay, 9000);
    timeouts.push(safetyTimeout);
  } else {
    // No overlay found, just continue
    hideOverlay();
  }

  if (skipBtn) {
    skipBtn.addEventListener("click", hideOverlay);
  }

  // Start hero typing animation after loader begins (it will be visible once overlay hides)
  startHeroTyping();
});

// Simple typewriter for hero name + rotating roles
function startHeroTyping() {
  const nameEl = document.getElementById("hero-name-typing");
  const roleEl = document.getElementById("hero-role-typing");
  if (!nameEl || !roleEl) return;

  const nameText = "Rohith Donthula";
  const roles = [
    "Cybersecurity Analyst",
    "Security Engineer",
    "SOC Analyst",
    "Cloud Security Specialist",
    "Offensive Security Enthusiast"
  ];

  const typeSpeed = 110;
  const deleteSpeed = 70;
  const rolePause = 1400;

  function typeText(el, text, idx, speed, done) {
    if (idx > text.length) {
      if (done) done();
      return;
    }
    el.textContent = text.slice(0, idx);
    setTimeout(() => typeText(el, text, idx + 1, speed, done), speed);
  }

  function deleteText(el, speed, done) {
    const text = el.textContent;
    if (text.length === 0) {
      if (done) done();
      return;
    }
    el.textContent = text.slice(0, -1);
    setTimeout(() => deleteText(el, speed, done), speed);
  }

  function cycleRoles(index) {
    const role = roles[index % roles.length];
    typeText(roleEl, role, 1, typeSpeed, () => {
      setTimeout(() => {
        deleteText(roleEl, deleteSpeed, () => {
          cycleRoles((index + 1) % roles.length);
        });
      }, rolePause);
    });
  }

  // Type the name once, then start cycling roles
  typeText(nameEl, nameText, 1, typeSpeed, () => {
    cycleRoles(0);
  });
}

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
