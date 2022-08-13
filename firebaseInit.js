import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBuTxmN0H4XZ7LBwqBQ5Ss6AkrgYKO9iag",
  authDomain: "commune-924a1.firebaseapp.com",
  projectId: "commune-924a1",
  storageBucket: "commune-924a1.appspot.com",
  messagingSenderId: "516787964438",
  appId: "1:516787964438:web:fe5fa531c48a8d72204337",
  measurementId: "G-PCZX4L5R01"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
export const analytics = getAnalytics(firebaseApp);

export default firebaseApp