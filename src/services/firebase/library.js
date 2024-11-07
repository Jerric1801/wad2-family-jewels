import { db } from "@/config/firebase";
import {
  getDocs,
  collection,
  doc,
  updateDoc,
  addDoc,
  setDoc,
} from "firebase/firestore"; // Make sure 'doc' is imported
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export async function getLibraryItems(userId) {
  // Ensure the userId is passed and valid
  if (!userId) {
    console.error("UserID is undefined");
    return null;
  }

  // Reference to the user's document inside 'jewellery-lib' collection
  const userDocRef = doc(db, "jewellery-lib", userId);

  // Get the 'collections' sub-collection inside the user's document
  const itemsCollectionRef = collection(userDocRef, "items");

  const itemsSnapshot = await getDocs(itemsCollectionRef);

  const itemsData = [];

  itemsSnapshot.forEach((doc) => {
    itemsData.push({
      id: doc.id,
      data: doc.data(),
    });
  });
  return itemsData.length ? itemsData : null;
}

export async function updateListDetails(userId, itemId, listDetails) {
  try {
    console.log(itemId);
    const itemDocRef = doc(db, "jewellery-lib", userId, "items", itemId);
    await updateDoc(itemDocRef, listDetails);
    return true;
  } catch (error) {
    console.error("Error updating listing status:", error);
    console.log(listDetails);
  }
}

export async function updateListing(userId, itemId, listed) {
  try {
    const itemDocRef = doc(db, "jewellery-lib", userId, "items", itemId);
    await updateDoc(itemDocRef, { listed: listed });
    return true;
  } catch (error) {
    console.error("Error updating listing status:", error);
  }
}

export async function addLibraryItem(userId, itemData) {
  try {
    const storage = getStorage();
    const storageRef = ref(storage, `user-jewellery-lib/${userId}/`);

    // Ensure the userId is passed and valid
    if (!userId) {
      console.error("UserID is undefined");
      return null;
    }

    // Reference to the user's document inside 'jewellery-lib' collection
    const userDocRef = doc(db, "jewellery-lib", userId);

    // Get the 'items' sub-collection inside the user's document
    const itemsCollectionRef = collection(userDocRef, "items");

    const snapshot = await uploadBytes(storageRef, itemData.imageUrl);
    const downloadURL = await getDownloadURL(snapshot.ref);

    await updatePhotoUrl(userId, downloadURL, itemData.imageName, Date.now());

    // Prepare the data to be added
    const newItemData = {
      category: itemData.category || "",
      description: itemData.description || "",
      image: downloadURL,
      listed: itemData.listed || false,
      price: parseFloat(itemData.price) || 0,
      title: itemData.title || "",
    };

    const docRef = await addDoc(itemsCollectionRef, newItemData);

    console.log("Item added with ID:", docRef.id);
    return docRef.id;
  } catch (error) {
    console.error("Error adding item to library:", error);
    return null;
  }
}

export const updatePhotoUrl = async (
  userId,
  imageURL,
  imageName,
  timestamp
) => {
  const docRef = doc(db, "jewellery-lib", userId);
  try {
    await setDoc(
      docRef,
      {
        imageURL: {
          [imageName]: {
            url: imageURL,
            timestamp: timestamp,
          },
        },
      },
      { merge: true }
    );
  } catch (error) {
    console.error("Error updating document:", error);
    throw error;
  }
};
