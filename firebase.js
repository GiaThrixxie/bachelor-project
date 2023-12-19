// Import the functions you need from the SDKs you need
import "dotenv/config.js";
import {applicationDefault, initializeApp as initializeAdminApp} from "firebase-admin/app";
import {getAuth as getAdminAuth} from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { initializeApp } from "firebase/app";
import admin from "firebase-admin";
import { getAuth,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    signOut,
 } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

//const{firebaseConfig, firebaseURL} = process.env;
const {firebaseURL, apiKey, authDomain, projectId, storageBucket, messagingSenderId, appId} = process.env;
const firebaseConfig = {
  apiKey: apiKey,
  authDomain: authDomain,
  databaseURL: firebaseURL,
  projectId: projectId,
  storageBucket: storageBucket,
  messagingSenderId: messagingSenderId,
  appId: appId

};




if (!admin.apps.length) {
  initializeAdminApp({
    credential: applicationDefault(),
    databaseURL: firebaseURL,
  })
}

const db = getFirestore();
const adminAuth = getAdminAuth();

let Firebase;

if (!Firebase?.apps?.length) {
  // Initialize Firebase
  initializeApp(firebaseConfig);
}

async function signUp(email, password) {
  const auth = getAuth();
  return createUserWithEmailAndPassword(auth, email, password)
}

async function getSessionToken(idToken) {
  const decodedToken = await adminAuth.verifyIdToken(idToken);
  if (new Date().getTime() / 1000 - decodedToken.auth_time > 5 * 60) {
  throw new Error('Recent sign in required!');
  }
  const twoWeeks = 60 * 60 * 24 * 14 * 1000;
  return adminAuth.createSessionCookie(idToken, {expiresIn: twoWeeks});
}

async function signOutFirebase() {
  await signOut(getAuth());
}

async function signIn(email, password) {
  const auth = getAuth();
  return signInWithEmailAndPassword(auth, email, password)
}

export {
  adminAuth,
  signUp,
  db,
  getSessionToken,
  signOutFirebase,
  signIn
};