
import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword, signOut } from "firebase/auth";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { addDoc, collection } from "firebase/firestore/lite";
import { toast } from "react-toastify";

const firebaseConfig = {
  apiKey: "AIzaSyBtmRR6if7g1BElmFm9F1kFSd2fMXkbLN4",
  authDomain: "netflix-36a51.firebaseapp.com",
  projectId: "netflix-36a51",
  storageBucket: "netflix-36a51.firebasestorage.app",
  messagingSenderId: "1056606571191",
  appId: "1:1056606571191:web:1f0026f23f326c06f21b32"
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const signup = async (name,email,password)=>{
    try {
        const res = await createUserWithEmailAndPassword(auth,email,password);
        const user =res.user;
        await addDoc(collection(db,"user"),{
            uid: user.uid,
            name,
            authProvider: "local",
            email,
        })
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }

}

const login =  async (email,password)=>{
    try {
        await  signInWithEmailAndPassword(auth,email,password)
    } catch (error) {
        console.log(error);
        toast.error(error.code.split('/')[1].split('-').join(" "));
    }
}


const logout=()=>{
    signOut(auth);

}

export{auth,db,login,signup,logout};