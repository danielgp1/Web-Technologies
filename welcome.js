import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-app.js";
import { getDatabase, set, ref, update } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-database.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/9.22.0/firebase-auth.js";

const reg_pwd = document.getElementById("reg_password");
const confirm_pwd = document.getElementById("confirm_password");
const user = document.getElementById('reg_username');
const login_password = document.getElementById("login_password");
const login_box = document.getElementById("login-box");
const labels = document.querySelectorAll("#lbl");
const eye1 = document.getElementById("eye1")
const eye2 = document.getElementById("eye2")
const eye3 = document.getElementById("eye3")

reg_pwd.setCustomValidity("Password should be at least 6 characters.");
user.setCustomValidity("Username should be 8-20 characters.\nCan't start or end with special characters.");

labels.forEach((item) => {
  item.addEventListener("click", function () {
    login_box.classList.toggle('show')
  })
})

eye1.addEventListener("click", function () {
  this.classList.toggle("fa-eye-slash")
  const type = reg_pwd.getAttribute("type") === "password" ? "text" : "password"
  reg_pwd.setAttribute("type", type)
})

eye2.addEventListener("click", function () {
  this.classList.toggle("fa-eye-slash")
  const type = confirm_pwd.getAttribute("type") === "password" ? "text" : "password"
  confirm_pwd.setAttribute("type", type)
})

eye3.addEventListener("click", function () {
  this.classList.toggle("fa-eye-slash")
  const type = login_password.getAttribute("type") === "password" ? "text" : "password"
  login_password.setAttribute("type", type)
})

const firebaseConfig = {
  apiKey: "AIzaSyB5oGp_MCEiQKtHORcRzyeJztiYO0vK_a0",
  authDomain: "issue-tracker-164f0.firebaseapp.com",
  databaseURL: "https://issue-tracker-164f0-default-rtdb.firebaseio.com",
  projectId: "issue-tracker-164f0",
  storageBucket: "issue-tracker-164f0.appspot.com",
  messagingSenderId: "1077361355309",
  appId: "1:1077361355309:web:293aca2b4297fef853a6a4"
};

var app = initializeApp(firebaseConfig);
var database = getDatabase(app);
var auth = getAuth();
var regBtn = document.getElementById('regBtn');
var logBtn = document.getElementById('logBtn');
regBtn.addEventListener('click', (e) => {
  var email = document.getElementById('reg_email').value;
  var password = document.getElementById('reg_password').value;
  var username = document.getElementById('reg_username').value;
  var firstname = document.getElementById('fname').value;
  var lastname = document.getElementById('lname').value;
  var reg_password = document.getElementById("reg_password").value;
  var confirm_password = document.getElementById("confirm_password").value;

  if (firstname == '') {
    alert("Enter your first name!");
    return;
  }

  if (lastname == '') {
    alert("Enter your last name!");
    return;
  }

  if (username == '') {
    alert("Enter a username!");
    return;
  }

  if (!/^(?=.{8,20}$)(?![_.])(?!.*[_.]{2})[a-zA-Z0-9._]+(?<![_.])$/.test(username)) {
    alert("Username should be 8-20 characters.\nCan't start or end with special characters.");
    return;
  }

  if (reg_password != confirm_password) {
    alert("Passwords don't match!");
    return;
  }

  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      set(ref(database, 'users/' + user.uid), {
        first_name: firstname,
        last_name: lastname,
        username: username,
        email: email
      });
      alert('Welcome to IssueTracker!');
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      switch (errorCode) {
        case 'auth/invalid-email': alert("Invalid email!"); break;
        case 'auth/email-already-in-use': alert("Email already in use!"); break;
        case 'auth/missing-password': alert("Enter a password!"); break;
        case 'auth/weak-password': alert("Password should be at least 6 characters!"); break;
        case 'auth/network-request-failed': alert("Check your internet connection!"); break;
        default: alert(errorMessage);
      }
    });
});

logBtn.addEventListener('click', (e) => {
  var email = document.getElementById('login_email').value;
  var password = document.getElementById('login_password').value;
  signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      const user = userCredential.user;
      const dt = new Date();
      update(ref(database, 'users/' + user.uid), {
        last_login: dt
      })
      alert("Welcome back!");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      switch (errorCode) {
        case 'auth/invalid-email': alert("Invalid email!"); break;
        case 'auth/missing-password': alert("Invalid password"); break;
        case 'auth/wrong-password': alert("Wrong password!"); break;
        case 'auth/user-not-found': alert("Account not found! Please register!"); break;
        case 'auth/network-request-failed': alert("Check your internet connection!"); break;
        default: alert(errorMessage);
      }
    });
})