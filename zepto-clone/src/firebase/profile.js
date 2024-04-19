import { doc, updateDoc } from "firebase/firestore";
import { firestore } from "./firebase";

export const updateUserProfileName = async (userRefId,name) => {
  const usersCollectionRef = doc(firestore, "users", userRefId.current);
  try {
    await updateDoc(usersCollectionRef, {
      name: name,
    })
    alert("Successfully updated name!")
    
  } catch (err) {
    console.log(err.message);
  }
}
