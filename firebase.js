 // Import the functions you need from the SDKs you need
      
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-app.js";
import { addDoc, collection, getFirestore } from "https://www.gstatic.com/firebasejs/10.5.2/firebase-firestore.js";

 // TODO: Add SDKs for Firebase products that you want to use

 // https://firebase.google.com/docs/web/setup#available-libraries


 // Your web app's Firebase configuration

 const firebaseConfig = {

   apiKey: "AIzaSyAyf9jJPihfXRvG7qyngJ27o9W58O9ibwg",

   authDomain: "tareas-app-2-b9750.firebaseapp.com",

   projectId: "tareas-app-2-b9750",

   storageBucket: "tareas-app-2-b9750.appspot.com",

   messagingSenderId: "294072100092",

   appId: "1:294072100092:web:d0b11ac8be2f63a007a379"

 };


 // Initialize Firebase

 const app = initializeApp(firebaseConfig);

 const db = getFirestore(app);

 export async function addTareaFire(tarea){
 try {
     const docRef = await addDoc(collection(db, "tareas"), tarea);
     console.log("Document written with ID: ", docRef.id);
   } catch (e) {
     console.error("Error adding document: ", e);
   }
 }