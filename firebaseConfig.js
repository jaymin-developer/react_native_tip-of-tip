import firebase from "firebase/compat/app";

// 사용할 파이어베이스 서비스 주석을 해제합니다
//import "firebase/compat/auth";
import "firebase/compat/database";
//import "firebase/compat/firestore";
//import "firebase/compat/functions";
import "firebase/compat/storage";

// Initialize Firebase
//파이어베이스 사이트에서 봤던 연결정보를 여기에 가져옵니다
const firebaseConfig = {
  apiKey: "AIzaSyDJ7auGl_-aJToaaqktcVbgdRJ9w1DL9y8",
  authDomain: "tip-of-tip.firebaseapp.com",
  databaseURL:
    "https://tip-of-tip-default-rtdb.asia-southeast1.firebasedatabase.app/",
  projectId: "tip-of-tip",
  storageBucket: "tip-of-tip.appspot.com",
  messagingSenderId: "232508699015",
  appId: "1:232508699015:web:7ad5b41f64e628a51ea322",
  measurementId: "G-JL58BFJJWW",
};

//사용 방법입니다.
//파이어베이스 연결에 혹시 오류가 있을 경우를 대비한 코드로 알아두면 됩니다.
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

export const firebase_db = firebase.database();
