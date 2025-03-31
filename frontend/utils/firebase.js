// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyA03LhqlmlMECNbW3K2UTG4336JTzMuNZI",
  authDomain: "portfolio-22162.firebaseapp.com",
  projectId: "portfolio-22162",
  storageBucket: "portfolio-22162.appspot.com",
  messagingSenderId: "926384510031",
  appId: "1:926384510031:web:db1cb67888e9646728463a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Your web app's Firebase configuration
// const firebaseConfig = {
//   apiKey: "AIzaSyBGeuapwVssdQERs9_fC_MNU8Pa7jbdMoc",
//   authDomain: "doct-i-12883.firebaseapp.com",
//   projectId: "doct-i-12883",
//   storageBucket: "doct-i-12883.firebasestorage.app",
//   messagingSenderId: "974976774467",
//   appId: "1:974976774467:web:56b03a661bcfb2bfff7ff6"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);