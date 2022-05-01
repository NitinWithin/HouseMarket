
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAgIsV0adZxTZxTK8Y6NME1Ynnx_mn9tVI",
    authDomain: "housemarketplace-2e70d.firebaseapp.com",
    projectId: "housemarketplace-2e70d",
    storageBucket: "housemarketplace-2e70d.appspot.com",
    messagingSenderId: "103583500687",
    appId: "1:103583500687:web:cc1762ca6d8a4c7b12e3fa"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore();