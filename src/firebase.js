import firebase from 'firebase/app';
import 'firebase/storage';
import 'firebase/database';

var firebaseConfig = {
    apiKey: "AIzaSyC8HHwM9k-twco2M9iG1bGa0obrCM1lypw",
    authDomain: "test-firebase-41a87.firebaseapp.com",
    databaseURL: "https://test-firebase-41a87.firebaseio.com",
    projectId: "test-firebase-41a87",
    storageBucket: "test-firebase-41a87.appspot.com",
    messagingSenderId: "525253335643",
    appId: "1:525253335643:web:90d756a72bf79fbc"
  };

  firebase.initializeApp(firebaseConfig)
  const storage = firebase.storage()
  const database = firebase.database()




  export {
      storage, database, firebase as default
  }