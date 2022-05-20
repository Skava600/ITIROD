import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  doc,
  getDoc,
  setDoc,
  connectFirestoreEmulator,
} from "firebase/firestore";
import {
  getAuth,
  connectAuthEmulator,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithRedirect,
  signOut,
} from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyD6t8a1AV47EEFWgH7tSdJF65ykXQmpdBo",
  authDomain: "alias-game-22902.firebaseapp.com",
  projectId: "alias-game-22902",
  storageBucket: "alias-game-22902.appspot.com",
  messagingSenderId: "117503719795",
  appId: "1:117503719795:web:1fc9af7b6d5dfcde6a2d06",
  measurementId: "G-LSTGZD3CSX"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export const signInWithEmail = async (loginEmail, loginPassword) => {
  await signInWithEmailAndPassword(auth, loginEmail, loginPassword).catch(
    (error) => {
      alert(error.message);
    }
  );
};

export const signUpWithEmail = async (loginEmail, loginPassword) => {
  if (!loginEmail.trim()) return;

  await createUserWithEmailAndPassword(auth, loginEmail, loginPassword).catch(
    (error) => {
      alert(error.message);
    }
  );
};

export const monitorAuthState = async (setUserData, callback) =>
  await onAuthStateChanged(auth, (user) => {
    if (user) {
      const docRef = doc(db, "users", user.uid);

      getDoc(docRef)
        .then((doc) => {
          if (!doc.data()) {
            setDoc(docRef, { savedGameData: null });
          }
        })
        .finally(() =>
          getDoc(docRef).then((doc) => {
            setUserData({
              hasSavedGame: !!doc.data().savedGameData,
              id: user.uid,
              isSignedIn: true,
              name: user.displayName,
            });
            callback();
          })
        );
    } else {
      setUserData({});
      callback();
    }
  });

export const redirectGoogleSignUp = () =>
  signInWithRedirect(auth, provider).catch((error) => {
    alert(error.message);
  });

export const signOutFromApp = async () => {
  await signOut(auth);
};

export const fetchGameData = async (id, setData) => {
  const docRef = doc(db, "users", id);

  await getDoc(docRef).then((doc) => {
    if (doc.data()) {
      setData(doc.data().savedGameData);
    }
  });
  
};

export const backUpGameData = async (userData, gameData) => {
  const docRef = doc(db, "users", userData.id);
  await setDoc(docRef, { savedGameData: gameData });
  console.log("backed up some data", gameData);
  userData.hasSavedGame = true;
};

export const deleteSavedGame = async (userData) => {
  const docRef = doc(db, "users", userData.id);
  console.log(userData.id)
  await setDoc(docRef, { savedGameData: null });
};