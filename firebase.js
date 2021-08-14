import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
 apiKey: "AIzaSyASUDZp5JC6SFHZSWzApNTY2_n59oS_uyw",
    authDomain: "stock-prediction-c8061.firebaseapp.com",
    projectId: "stock-prediction-c8061",
    storageBucket: "stock-prediction-c8061.appspot.com",
    messagingSenderId: "28461437342",
    appId: "1:28461437342:web:d3570fc8f0371f0aa0468f",
    measurementId: "G-S7WHSYBP0X"
  };

firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
export const signInWithGoogle = () => {
  auth.signInWithPopup(provider);
};

export const generateUserDocument = async (user, additionalData) => {
  if (!user) return;
  const userRef = firestore.doc(`users/${user.uid}`);
  const snapshot = await userRef.get();
  if (!snapshot.exists) {
    const { email, displayName, photoURL } = user;
    try {
      await userRef.set({
        displayName,
        email,
        photoURL,
        ...additionalData
      });
    } catch (error) {
      console.error("Error creating user document", error);
    }
  }
  return getUserDocument(user.uid);
};
const getUserDocument = async uid => {
  if (!uid) return null;
  try {
    const userDocument = await firestore.doc(`users/${uid}`).get();
    return {
      uid,
      ...userDocument.data()
    };
  } catch (error) {
    console.error("Error fetching user", error);
  }
};



// apiKey: "AIzaSyAIW77a-sDyjC8ZK5ZD61q-d72OnnfFupg",
// authDomain: "stockprediction-d7296.firebaseapp.com",
// projectId: "stockprediction-d7296",
// storageBucket: "stockprediction-d7296.appspot.com",
// messagingSenderId: "920650165320",
// appId: "1:920650165320:web:428b0785ac72534f9a7c7d",
// measurementId: "G-2SX6WQWTNS"