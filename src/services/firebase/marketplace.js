import { db } from "@/config/firebase";
import { getDocs, collection, doc } from "firebase/firestore"; // Ensure 'collection' and 'doc' are imported

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
