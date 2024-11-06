import { db } from "@/config/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";


export const uploadPhoto = async (userId, photo, imageName) => {
    const storage = getStorage();
    const storageRef = ref(storage, `${userId}/${imageName}`);

    try {
        const snapshot = await uploadBytes(storageRef, photo);
        const downloadURL = await getDownloadURL(snapshot.ref);

        // Update Firestore with the image URL and timestamp
        await updatePhotoUrl(userId, downloadURL, imageName, Date.now()); // Pass timestamp

        console.log("File uploaded successfully:", downloadURL);
    } catch (error) {
        console.error("Error uploading file:", error);
        throw error;
    }
};

export const updatePhotoUrl = async (userId, imageURL, imageName, timestamp) => { // Add timestamp parameter
    const docRef = doc(db, "user-uploads", userId);
    try {
        await setDoc(docRef, { 
            imageURL: { 
                [imageName]: { 
                    url: imageURL, 
                    timestamp: timestamp 
                } 
            } 
        }, { merge: true });
    } catch (error) {
        console.error("Error updating document:", error);
        throw error;
    }
};
export const retrieveImagesFromDatabase = async (userId, limit = 5) => {
    const docRef = doc(db, `user-uploads/${userId}`);
    try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            const data = docSnap.data();
            const images = Object.entries(data.imageURL)
                .sort((a, b) => b[1].timestamp - a[1].timestamp) // Sort by timestamp (newest first)
                .slice(0, limit)
                .map(([name, data]) => ({ name, url: data.url }));
            return images;
        } else {
            return []; // Return an empty array if no images are found
        }
    } catch (error) {
        console.error("Error retrieving document:", error);
        throw error;
    }
};

export const listItem = async (userId, imageName, listed) => {
    const docRef = doc(db, "user-uploads", userId);
    try {
        await updateDoc(docRef, { [`imageURL.${imageName}.listed`]: listed });
    } catch (error) {
        console.error("Error updating document:", error);
        throw error;
    }
};

export async function getImageBlob(userId, imageName) { 
    const storage = getStorage();
    const storageRef = ref(storage, `${userId}/${imageName}`);
  
    try {
      const url = await getDownloadURL(storageRef);
  
      return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.responseType = 'blob';
        xhr.onload = (event) => {
          const blob = xhr.response; 
          resolve(blob); // Resolve the Promise with the blob
        };
        xhr.onerror = (error) => {
          reject(error); // Reject the Promise if there's an error
        };
        xhr.open('GET', url);
        xhr.send();
      });
  
    } catch (error) {
      console.error("Error retrieving image blob:", error);
      throw error;
    }
  }