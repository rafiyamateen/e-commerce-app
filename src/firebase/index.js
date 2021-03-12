import firebase from 'firebase/app'
import 'firebase/storage'

const firebaseConfig = {
  apiKey: "AIzaSyDLkFYZLTBsvlRou2b9Mw-tJ_KcqZT9JM0",
  authDomain: "e-commerce-app-c6f92.firebaseapp.com",
  projectId: "e-commerce-app-c6f92",
  storageBucket: "e-commerce-app-c6f92.appspot.com",
  messagingSenderId: "1062770441995",
  appId: "1:1062770441995:web:387413c4290fa99e716c0e",
  measurementId: "G-Q0VFQ8V37G"
}
firebase.initializeApp(firebaseConfig)
const storage = firebase.storage()
export {
  storage, firebase as default
}