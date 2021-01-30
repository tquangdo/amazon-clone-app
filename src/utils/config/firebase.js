import firebase from "firebase/app"
import "firebase/auth"
import 'firebase/firestore'

const fbConfig = {
    apiKey: "AIzaSyANpwl4nZ1n-xXxc2u8zaRFduRJH9wGLhA",
    authDomain: "clone-7b648.firebaseapp.com",
    databaseURL: "https://clone-7b648.firebaseio.com",
    projectId: "clone-7b648",
}
const firebaseApp = firebase.initializeApp(fbConfig)
const db = firebaseApp.firestore()
const auth = firebase.auth()

export { db, auth }