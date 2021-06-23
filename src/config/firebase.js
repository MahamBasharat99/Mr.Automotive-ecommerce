import firebase from 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';


var firebaseConfig = {
    apiKey: "AIzaSyBgEi_l9ChvVcQhaLjL2XCvgAYhDgGE9Zw",
    authDomain: "mrautomotive-dd1f6.firebaseapp.com",
    databaseURL: "https://mrautomotive-dd1f6-default-rtdb.firebaseio.com",
    projectId: "mrautomotive-dd1f6",
    storageBucket: "mrautomotive-dd1f6.appspot.com",
    messagingSenderId: "765955954186",
    appId: "1:765955954186:web:e275dbbceeb7be3b3cf1f3",
    measurementId: "G-970BG2EBLQ"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);



export default firebase;