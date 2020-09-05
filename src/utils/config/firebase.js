import firebase from "firebase/app"
import "firebase/auth"

const fbConfig = {
    apiKey: "xxx",
    authDomain: "xxx",
    databaseURL: "xxx",
    projectId: "xxx",
}
firebase.initializeApp(fbConfig)

export const auth = firebase.auth()