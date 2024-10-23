import { db } from "@/config/firebase";
import { doc, getDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytesResumable } from "firebase/storage";

export const retrieveUserProfile = async (userId) => {
  const docRef = doc(db, "user-profile", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
};

export const uploadPhoto = async (userId, photo) => {
  const storage = getStorage();
  const storageRef = ref(storage, `user-profile-photos/${userId}`);

  return new Promise((resolve, reject) => {
    const uploadTask = uploadBytesResumable(storageRef, photo);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
      },
      (error) => {
        // Handle unsuccessful uploads
        console.error("Error uploading photo:", error);
        reject(error);
      },
      () => {
        // Handle successful uploads on complete
        console.log("Photo uploaded successfully");
        resolve(uploadTask.snapshot);
      }
    );
  });
};

// export const updateUserProfile = async (userId, updatedData) => {
//   const docRef = doc(db, "user-profile", userId);
//   await setDoc(docRef, updatedData);
// };
