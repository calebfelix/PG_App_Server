// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-app.js";
import { getStorage, ref  } from "https://www.gstatic.com/firebasejs/9.1.1/firebase-storage.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB7BMa_lGNXlgk9SsGtaY0aKGgA9-swrrw",
  authDomain: "pg-website-7495d.firebaseapp.com",
  projectId: "pg-website-7495d",
  storageBucket: "pg-website-7495d.appspot.com",
  messagingSenderId: "901304699853",
  appId: "1:901304699853:web:54236ac6f2a0e386d01284",
  databaseURL: ""
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
console.log(app)

