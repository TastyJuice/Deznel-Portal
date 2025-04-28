// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyCjthh-d1TmjyLMcbjiZ1jbi_mJxtPQlYY",
  authDomain: "deznel-s-snack-pack.firebaseapp.com",
  projectId: "deznel-s-snack-pack",
  storageBucket: "deznel-s-snack-pack.firebasestorage.app",
  messagingSenderId: "241764051010",
  appId: "1:241764051010:web:4fa5c9502fdb618c2625db",
  measurementId: "G-7KFTSZB4ME"
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const firestore = firebase.firestore();

// Get UI Elements
const loginBtn = document.getElementById("login-btn");
const logoutBtn = document.getElementById("logout-btn");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const loginSection = document.getElementById("login-section");
const welcomeSection = document.getElementById("welcome-section");
const userNameDisplay = document.getElementById("user-name");
const loginError = document.getElementById("login-error");

// Login Function
loginBtn.addEventListener("click", async () => {
  const email = emailInput.value;
  const password = passwordInput.value;

  try {
    await auth.signInWithEmailAndPassword(email, password);
    loadUser();
  } catch (error) {
    loginError.classList.remove("hidden");
    console.error(error.message);
  }
});

// Load User Info After Login
function loadUser() {
  const user = auth.currentUser;
  if (user) {
    loginSection.classList.add("hidden");
    welcomeSection.classList.remove("hidden");
    userNameDisplay.innerText = user.email;
  }
}

// Logout Function
logoutBtn.addEventListener("click", () => {
  auth.signOut();
  loginSection.classList.remove("hidden");
  welcomeSection.classList.add("hidden");
  emailInput.value = "";
  passwordInput.value = "";
});

// Firebase Auth State Listener
auth.onAuthStateChanged(user => {
  if (user) {
    loadUser();
  } else {
    loginSection.classList.remove("hidden");
    welcomeSection.classList.add("hidden");
  }
});
