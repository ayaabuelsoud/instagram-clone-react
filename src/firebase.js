// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import firebase from "firebase";

  const firebaseApp = firebase.initializeApp({
    apiKey: "AIzaSyC0Pz3VJxsv-78j41Vq40qKC52pXcLEX6s",
    authDomain: "instagram-clone-1b683.firebaseapp.com",
    projectId: "instagram-clone-1b683",
    storageBucket: "instagram-clone-1b683.appspot.com",
    messagingSenderId: "283588383222",
    appId: "1:283588383222:web:beef3e15ab7891ad8077d7",
    measurementId: "G-Y0SEV800X4"
  });
  
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();
  
  export { db, auth, storage };