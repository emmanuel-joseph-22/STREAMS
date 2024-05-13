import store from "./store/index.js";
import { firestore as db } from './main.js';
import { getDoc, doc, updateDoc } from "firebase/firestore";
//import { getAuth } from "firebase/auth";
export async function getUserInfo(){    
    try {
        const userRef = doc(db, 'users', store.state.userID);
        const docSnapshot = await getDoc(userRef)
    
        if(docSnapshot.exists()){
            return [docSnapshot.data().name, docSnapshot.data().email];
        } else {
            console.log('no user')
            return [null, null]
        }
    } catch(error){
        console.log(error)
    }
}

export async function updateDisplayName(name){
    try{
        const userRef = doc(db, 'users', store.state.userID);
        await updateDoc(userRef, { name: name })
        console.log('Updated succesfully')
    } catch(error){
        console.log(error)
    }
}

/*
export function changePassword(newPassword) {
    const user = getAuth(db).currentUser;
  
    if (!user) {
      // User not logged in
      return Promise.reject("User not logged in.");
    }
    console.log('password updated')
    return user.updatePassword(newPassword);
  }*/