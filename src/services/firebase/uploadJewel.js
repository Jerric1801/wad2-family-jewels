import { db } from "@/config/firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";



export const uploadPhoto = async (userId, photo,imageName) => {
  const storage = getStorage();
  const storageRef = ref(
    storage,
    `${userId}/${imageName}`
  );

  try {
    // Upload the file
    

    const snapshot = await uploadBytes(storageRef, photo);

    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);

    // Update the user profile with the new photo URL
    updatePhotoUrl(userId, downloadURL,imageName);
    console.log("File uploaded successfully:", downloadURL);
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

export const updatePhotoUrl = async (userId, imageURL,imageName) => {
  const docRef = doc(db, "user-jewelery", userId);

  // Update only the imageUrl field, merging it with the existing data
  let image = {[imageName]:{url:imageURL,listed:false}};
  await setDoc(docRef, { imageURL: image }, { merge: true });
};

export const retrieveImagesFromDatabase = async (userId) => {
  const docRef = doc(db, `user-jewelery/${userId}`);
  try {
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data();
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error retrieving document:", error);
    throw error;
  }
};
