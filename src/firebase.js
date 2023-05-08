// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
    apiKey: "AIzaSyBtGieLr7gSLDKPfIR5Di9Q5wfCh7L6pHs",
    authDomain: "shopbecung-999.firebaseapp.com",
    projectId: "shopbecung-999",
    storageBucket: "shopbecung-999.appspot.com",
    messagingSenderId: "186403518675",
    appId: "1:186403518675:web:5bdcc42469054ccc343c26",
    measurementId: "G-NGMB6TVSXK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const storage = getStorage(app);