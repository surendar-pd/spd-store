import firebase from 'firebase'

const firebaseConfig = {
    apiKey: "AIzaSyApDkxxmHCuo-WzzzlJtjHJXG7jv8HF8Qo",
    authDomain: "spd-store.firebaseapp.com",
    projectId: "spd-store",
    storageBucket: "spd-store.appspot.com",
    messagingSenderId: "931010472816",
    appId: "1:931010472816:web:d441caa83d4152a648bdb5",
    measurementId: "G-R05670X3SX"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const provider = new firebase.auth.GoogleAuthProvider();
export const db = firebaseApp.firestore();
export const storage = firebase.storage();