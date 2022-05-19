// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD5XmT8YP-YjwLmQCpRcG5RamHgw5Gjh-w",
  authDomain: "ecommerce-1b09f.firebaseapp.com",
  projectId: "ecommerce-1b09f",
  storageBucket: "ecommerce-1b09f.appspot.com",
  messagingSenderId: "571849781619",
  appId: "1:571849781619:web:4edd39d86b55c8081b9506",
  measurementId: "G-8CNC0CZBJW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
//const analytics = getAnalytics(app);