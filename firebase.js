import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyCcH5uGzI92-FzZJFPh3pLUepiYPHpJ9OU",
  authDomain: "uber-eats-clone-341316.firebaseapp.com",
  projectId: "uber-eats-clone-341316",
  storageBucket: "uber-eats-clone-341316.appspot.com",
  messagingSenderId: "335447898594",
  appId: "1:335447898594:web:28e077c47da4deb0f161bb",
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app();

export default firebase;
