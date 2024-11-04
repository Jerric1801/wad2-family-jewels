import { db } from "@/config/firebase";
import {
  doc,
  collection,
  getDocs,
  addDoc,
} from "firebase/firestore";

export const retrieveUserProfile = async (userId) => {
  const docRef = doc(db, "user-profile", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
};

export async function getAllListedItems() {
  // Reference to the 'jewellery-lib' collection
  const jewelleryLibRef = collection(db, "jewellery-lib");

  // Array to store all items with listed = true
  const itemsData = [];

  try {
    // Get all user documents in 'jewellery-lib'
    const usersSnapshot = await getDocs(jewelleryLibRef);

    // Loop through each user document
    for (const userDoc of usersSnapshot.docs) {
      // Reference to the 'items' sub-collection inside each user document
      const itemsCollectionRef = collection(userDoc.ref, "items");

      // Get all items for the current user document
      const itemsSnapshot = await getDocs(itemsCollectionRef);

      // Loop through each item in the 'items' sub-collection
      itemsSnapshot.forEach((itemDoc) => {
        const itemData = itemDoc.data();
        // Check if the item's 'listed' field is true
        if (itemData.listed === true) {
          itemsData.push({
            id: itemDoc.id,
            data: itemData,
          });
        }
      });
    }
  } catch (error) {
    console.error("Error fetching listed items:", error);
    return null;
  }

  return itemsData.length ? itemsData : null;
}

export async function addOrder(userId, orderData) {
  try {
    // Reference to the user's orders collection
    const userDocRef = doc(db, "user-orders", userId); // Assuming user ID is used in 'users' collection
    const ordersCollectionRef = collection(userDocRef, "orders");

    // Add a new document to the orders subcollection
    const docRef = await addDoc(ordersCollectionRef, orderData);
    return docRef.id; // Return the ID of the new document
  } catch (error) {
    console.error("Error adding order:", error);
    throw error;
  }
}