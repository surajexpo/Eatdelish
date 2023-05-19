// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.
import firebase from "firebase";
export const environment = {
  production: false,
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

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
