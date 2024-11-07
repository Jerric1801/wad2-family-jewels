import { db } from "@/config/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, getBlob } from "firebase/storage";
export const uploadPhoto = async (userId, photo, imageName) => {
    const storage = getStorage();
    const storageRef = ref(storage, `user-generated/${userId}/${imageName}`);

    try {
        const snapshot = await uploadBytes(storageRef, photo);
        const downloadURL = await getDownloadURL(snapshot.ref);

        await updatePhotoUrl(userId, downloadURL, imageName, Date.now()); 

        console.log("File uploaded successfully:", downloadURL);
    } catch (error) {
        console.error("Error uploading file:", error);
        throw error;
    }
};

export const updatePhotoUrl = async (userId, imageURL, imageName, timestamp) => { 
    const docRef = doc(db, "user-generated", userId);
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



export const retrieveImagesFromDatabase = async (userId, limit = 4) => {
    const docRef = doc(db, `user-generated/${userId}`);
    try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log(docSnap.data())
            const data = docSnap.data();
            const imageUrls = Object.entries(data.imageURL)
                .sort((a, b) => b[1].timestamp - a[1].timestamp)
                .slice(0, limit)
                .map(([name, data]) => data.url); // Extract only the URLs

            return imageUrls;
        } else {
            return [];
        }
    } catch (error) {
        console.error("Error retrieving document:", error);
        throw error;
    }
};

export const getBlobFromUrl = async (url) => {
    const storage = getStorage();
    try {
      const imageRef = ref(storage, url);
      const blob = await getBlob(imageRef);
      console.log(blob)
      return blob;
    } catch (error) {
      console.error("Error fetching blob:", error);
      throw error;
    }
  };