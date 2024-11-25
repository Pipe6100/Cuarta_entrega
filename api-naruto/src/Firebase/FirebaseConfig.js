import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAPuWp63QiOnAOzqfgNIm0JxGdgdC_EhG8",
  authDomain: "entrega4web-56b06.firebaseapp.com",
  projectId: "entrega4web-56b06",
  storageBucket: "entrega4web-56b06.appspot.com",
  messagingSenderId: "922268845986",
  appId: "1:922268845986:web:15c29cde42bb2f444614fb"
};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db };
