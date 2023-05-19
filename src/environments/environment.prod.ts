import firebase from "firebase";
export const environment = {
  production: true,
  firebaseConfig : {
    apiKey: "AIzaSyCmij0dR_TbQsyPVXxysIIzOTNnOFl2LSE",
    authDomain: "eatdelish-7e3d1.firebaseapp.com",
    projectId: "eatdelish-7e3d1",
    storageBucket: "eatdelish-7e3d1.appspot.com",
    messagingSenderId: "143793079054",
    appId: "1:143793079054:web:a9a09325bc1e3320c48d5f",
    measurementId: "G-TZCP96HWKB"
  }
};
firebase.initializeApp(environment.firebaseConfig);

