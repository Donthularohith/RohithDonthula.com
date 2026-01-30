// Blog System - Minimal Version

let posts = [];
let isLoggedIn = false;
let password = "security2026";

// LOAD
function init() {
  const saved = localStorage.getItem("blog_posts");
  posts = saved ? JSON.parse(saved) : [];
  
  const pwd = localStorage.getItem("blog_pwd");
  if (pwd) password = pwd;
  
  isLoggedIn = localStorage.getItem("blog_login") === "yes";
  
  updateUI();
  showPosts();
  showCategories();
}

// UPDATE UI
function updateUI() {
  const loginBox = document.getElementById("login-box");
  const writeBox = document.getElementById("write-box");
  const pwdBox = document.getElementById("password-box");

  if (isLoggedIn) {
    loginBox.classList.add("hidden");
    writeBox.classList.remove("hidden");
    pwdBox.classList.remove("hidden");
  } else {
    loginBox.classList.remove("hidden");
    writeBox.classList.add("hidden");
    pwdBox.classList.add("hidden");
  }
}

// LOGIN
function login(pwd) {
  if (pwd === password) {
    localStorage.setItem("blog_login", "yes");
    isLoggedIn = true;
    document.getElementById("modal").classList.add("hidden");
    document.getElementById("pwd-input").value = "";
    updateUI();
    showPosts();
    alert("Logged in!");
    return true;
  } else {
    alert("Wrong password");
    document.getElementById("pwd-input").value = "";
    return false;
  }
}

// LOGOUT
function logout() {
  if (confirm("Logout?")) {
    localStorage.removeItem("blog_login");
    isLoggedIn = false;
    updateUI();
    showPosts();
  }
}

// CHANGE PASSWORD
function changePwd(current, newPwd, confirm) {
  if (current !== password) {
    alert("Current password wrong");
    return;
  }
  if (newPwd !== confirm) {
    alert("Passwords don't match");
    return;
  }
  if (newPwd.length < 6) {
    alert("Min 6 characters");
    return;
  }
  
  password = newPwd;
  localStorage.setItem("blog_pwd", newPwd);
  document.getElementById("password-form").reset();
  alert("Password updated!");
}

// ADD POST
function addPost(title, category, content) {
  const post = {
    id: Date.now(),
    title: title,
    category: category,
    content: content,
    date: new Date().toLocaleDateString("en-US", {year: "numeric", month: "long", day: "numeric"})
  };
  posts.unshift(post);
  localStorage.setItem("blog_posts", JSON.stringify(posts));
  showPosts();
  showCategories();
  document.getElementById("post-form").reset();
  alert("Post published!");
}

// DELETE POST
function deletePost(id) {
  if (!isLoggedIn) return;
  if (confirm("Delete?")) {
    posts = posts.filter(p => p.id !== id);
    localStorage.setItem("blog_posts", JSON.stringify(posts));
    showPosts();
    showCategories();
  }
}

// SHOW POSTS
function showPosts(category = null) {
  const container = document.getElementById("posts-container");
  let filtered = category ? posts.filter(p => p.category === category) : posts;

  if (filtered.length === 0) {
    container.innerHTML = '<p class="no-posts">No posts yet.</p>';
    return;
  }

  let html = "";
  filtered.forEach(post => {
    html += `
      <article class="blog-post">
        <h2 class="post-title">${post.title}</h2>
        <div class="post-meta">
          <span class="post-date">${post.date}</span>
          <span class="post-category">${post.category}</span>
        </div>
        <div class="post-content">${post.content.replace(/\n/g, "<br>")}</div>
        ${isLoggedIn ? `<button class="delete-btn" onclick="deletePost(${post.id})">Delete</button>` : ""}
      </article>
    `;
  });

  container.innerHTML = html;
}

// SHOW CATEGORIES
function showCategories() {
  const list = document.getElementById("categories-list");
  const cats = [...new Set(posts.map(p => p.category))].sort();

  if (cats.length === 0) {
    list.innerHTML = '<li class="no-categories">No categories yet</li>';
    return;
  }

  let html = "";
  cats.forEach(cat => {
    const count = posts.filter(p => p.category === cat).length;
    html += `<li><a href="#" onclick="showPosts('${cat}'); return false;">${cat} (${count})</a></li>`;
  });

  list.innerHTML = html;
}

// EVENTS
document.addEventListener("DOMContentLoaded", function() {
  init();

  // Admin button
  document.getElementById("admin-btn").addEventListener("click", function() {
    document.getElementById("modal").classList.remove("hidden");
    document.getElementById("pwd-input").focus();
  });

  // Close modal
  document.getElementById("close-btn").addEventListener("click", function() {
    document.getElementById("modal").classList.add("hidden");
  });

  // Login form
  document.getElementById("login-form").addEventListener("submit", function(e) {
    e.preventDefault();
    login(document.getElementById("pwd-input").value);
  });

  // Logout
  document.getElementById("logout-btn").addEventListener("click", logout);

  // Password form
  document.getElementById("password-form").addEventListener("submit", function(e) {
    e.preventDefault();
    changePwd(
      document.getElementById("current-pwd").value,
      document.getElementById("new-pwd").value,
      document.getElementById("confirm-pwd").value
    );
  });

  // Post form
  document.getElementById("post-form").addEventListener("submit", function(e) {
    e.preventDefault();
    addPost(
      document.getElementById("post-title").value,
      document.getElementById("post-category").value,
      document.getElementById("post-content").value
    );
  });

  // Mobile nav
  const toggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".nav");
  if (toggle) {
    toggle.addEventListener("click", function() {
      nav.classList.toggle("open");
    });
  }
});
