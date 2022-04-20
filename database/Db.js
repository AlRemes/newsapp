import { initializeApp, getApps, getApp } from "firebase/app";
import { getDatabase, push, ref, onValue } from "firebase/database";

import { useEffect, useState } from "react";

const Db = () => {

const firebaseConfig = {
    apiKey: "AIzaSyCfeJ_4xvVIVpB74bZPm1cKXlGCk7VS_O4",
    authDomain: "newsapp-e63d8.firebaseapp.com",
    databaseURL:
      " https://newsapp-e63d8-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "newsapp-e63d8",
    storageBucket: "newsapp-e63d8.appspot.com",
    messagingSenderId: "215531470596",
    appId: "1:215531470596:web:df6853a0a8b1a458f49a51",
  };
  global.app = app;
  global.apiKey = apiKey;
  // Initialize Firebase
  getApps().length === 0
    ? (app = initializeApp(firebaseConfig))
    : (app = getApp());


    useEffect(() => {
        const itemsRef = ref(database, "api/");
    
        get(child(itemsRef)).then((snapshot) => {
          let key = ''
          key = snapshot.val();
          apiKey = key;
        }).catch((err) =>{
            console.error(err);
        });
      }, []);

    }
    export default Db;