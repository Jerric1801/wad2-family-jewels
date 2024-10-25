import { db } from "@/config/firebase";
import { getDocs, collection, doc } from "firebase/firestore"; // Make sure 'doc' is imported

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
