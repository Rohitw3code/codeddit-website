import firebase from "firebase/compat/app";
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
    apiKey: "AIzaSyANasgb6UtosJMKknlOvbHQoEcS6qyYIcM",
    authDomain: "reactapp-af918.firebaseapp.com",
    projectId: "reactapp-af918",
    storageBucket: "reactapp-af918.appspot.com",
    messagingSenderId: "969605914417",
    appId: "1:969605914417:web:29bb442c02bdf3d9079a10",
    measurementId: "G-5X1LWRXH1E"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";

// //---------------------------------------------------------------------
// const firebaseConfig = {
//     apiKey: "AIzaSyDBJ00sG0InwirhDSkQwuHUZ9eYMYquX3A",
//     authDomain: "codeddit.firebaseapp.com",
//     databaseURL: "https://codeddit-default-rtdb.firebaseio.com",
//     projectId: "codeddit",
//     storageBucket: "codeddit.appspot.com",
//     messagingSenderId: "881940577163",
//     appId: "1:881940577163:web:664b997892592c0c504d8e",
//     measurementId: "G-73RYDJ6D92"
//   };

// // Initialize Firebase
// const app = firebase.initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// //--------------------------------------------------------------------



export default firebase;

