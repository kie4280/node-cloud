import firebase from "firebase";
import firebaseui from "firebaseui";

var firebaseConfig = {
  apiKey: "AIzaSyACPSB6wCd1QYqDEvTH7hEqjyeygA5_sE8",
  authDomain: "node-cloud-fcbd4.firebaseapp.com",
  databaseURL: "https://node-cloud-fcbd4-default-rtdb.firebaseio.com",
  projectId: "node-cloud-fcbd4",
  storageBucket: "node-cloud-fcbd4.appspot.com",
  messagingSenderId: "1031166173720",
  appId: "1:1031166173720:web:8d275377a111e4db6d996d",
};
firebase.initializeApp(firebaseConfig);

const ui = new firebaseui.auth.AuthUI(firebase.auth());

export { ui };
