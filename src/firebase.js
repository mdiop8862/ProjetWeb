// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from "firebase/storage"
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCEHRlk4uxoxJzSyS-y3CPBeKeBkifJdFw",
    authDomain: "gestion-des-artticles.firebaseapp.com",
    projectId: "gestion-des-artticles",
    storageBucket: "gestion-des-artticles.appspot.com",
    messagingSenderId: "805920305828",
    appId: "1:805920305828:web:04fe91007df9ba7062ec31",
    measurementId: "G-83R3S7TN26"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);

// initialise storage 

export const storage = getStorage(app)

//initialise firesetore 

export const db = getFirestore(app)


