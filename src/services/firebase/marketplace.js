import { db } from "@/config/firebase";
import { getDocs, collection } from "firebase/firestore";

export async function getMarketplaceItems() {
  try {
    const querySnapshot = await getDocs(collection(db, "marketplace"));
    const items = [];
    querySnapshot.forEach((doc) => {
      items.push({ id: doc.id, ...doc.data() });
    });
    return items;
  } catch (error) {
    console.error("Error accessing Firestore:", error);
    throw error; 
  }
}