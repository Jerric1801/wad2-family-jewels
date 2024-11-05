import { db } from "@/config/firebase";
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, getBlob } from "firebase/storage";

export const uploadPhoto = async (userId, photo, imageName) => {
    const storage = getStorage();
    const storageRef = ref(storage, `user-generated/${userId}/${imageName}`);

    try {
        const snapshot = await uploadBytes(storageRef, photo);
        const downloadURL = await getDownloadURL(snapshot.ref);

        // Update Firestore with the image URL
        await updatePhotoUrl(userId, downloadURL, imageName);

        console.log("File uploaded successfully:", downloadURL);
    } catch (error) {
        console.error("Error uploading file:", error);
        throw error;
    }
};

export const updatePhotoUrl = async (userId, imageURL, imageName) => {
    const docRef = doc(db, "user-generated", userId);
    try {
        await setDoc(docRef, { imageURL: { [imageName]: { url: imageURL, listed: false } } }, { merge: true });
    } catch (error) {
        console.error("Error updating document:", error);
        throw error;
    }
};



export const retrieveImagesFromDatabase = async (userId, limit = 5) => {
    const docRef = doc(db, `user-generated/${userId}`);
    try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
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

export const getBlobsFromUrls = async (urls) => {
    const storage = getStorage();
    try {
        const blobs = await Promise.all(urls.map(async (url) => {
            const imageRef = ref(storage, url);
            const blob = await getBlob(imageRef);
            return blob;
        }));
        return blobs;
    } catch (error) {
        console.error("Error fetching blobs:", error);
        throw error;
    }
};