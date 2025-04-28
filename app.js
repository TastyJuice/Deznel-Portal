// Your Firebase project config
const firebaseConfig = {
  apiKey: "AIzaSyCjthh-d1TmjyLMcbjiZ1jbi_mJxtPQlYY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "241764051010",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();
const db = firebase.firestore();

// DOM Elements
const loginForm = document.getElementById('loginForm');
const dashboard = document.getElementById('dashboard');
const dealerName = document.getElementById('dealerName');
const currentStock = document.getElementById('currentStock');
const quantitySold = document.getElementById('quantitySold');
const error = document.getElementById('error');

// Login
function login() {
  const email = document.getElementById('email').value;
  const password = document.getElementById('password').value;

  auth.signInWithEmailAndPassword(email, password)
    .then(userCredential => {
      loadDealerData(userCredential.user.uid);
    })
    .catch(err => {
      error.textContent = err.message;
    });
}

// Load dealer data
function loadDealerData(uid) {
  db.collection('dealers').doc(uid).get()
    .then(doc => {
      if (doc.exists) {
        dealerName.textContent = doc.data().name;
        currentStock.textContent = doc.data().stock;
        loginForm.classList.add('hidden');
        dashboard.classList.remove('hidden');
      } else {
        error.textContent = "Dealer not found.";
      }
    });
}

// Record Sale
function recordSale() {
  const quantity = parseInt(quantitySold.value);
  if (!quantity || quantity <= 0) {
    alert("Please enter a valid quantity sold.");
    return;
  }

  const user = auth.currentUser;
  if (!user) return;

  const dealerRef = db.collection('dealers').doc(user.uid);

  dealerRef.get().then(doc => {
    if (doc.exists) {
      const current = doc.data().stock;
      if (current >= quantity) {
        dealerRef.update({
          stock: current - quantity
        }).then(() => {
          alert("Sale recorded!");
          loadDealerData(user.uid);
          quantitySold.value = '';
        });
      } else {
        alert("Not enough stock!");
      }
    }
  });
}

// Logout
function logout() {
  auth.signOut().then(() => {
    loginForm.classList.remove('hidden');
    dashboard.classList.add('hidden');
    dealerName.textContent = '';
    currentStock.textContent = '';
  });
}

