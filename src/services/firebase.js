// Firebase App (the core Firebase SDK) is always required and
// must be listed before other Firebase SDKs
import * as firebase from "firebase/app";

// Add the Firebase services that you want to use
// We only want to use Firebase Auth here
import "firebase/auth";

// Your app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyDbc1mKUkxSU6VbFkcc0JMG4ybRFLH9atg",
  authDomain: "shinkansen-5ac87.firebaseapp.com",
  databaseURL: "https://shinkansen-5ac87.firebaseio.com",
  projectId: "shinkansen-5ac87",
  storageBucket: "shinkansen-5ac87.appspot.com",
  messagingSenderId: "698376700291",
  appId: "1:698376700291:web:0be5e26b5e6196375236b6"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Finally, export it to use it throughout your app
export default firebase;
