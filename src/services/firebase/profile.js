import { db } from "@/config/firebase";
import {
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  addDoc,
  deleteDoc,
  writeBatch,
  updateDoc,
} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

export const retrieveUserProfile = async (userId) => {
  const docRef = doc(db, "user-profile", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return docSnap.data();
  } else {
    return null;
  }
};

export async function retrieveUserAddresses(userId) {
  // Ensure the userId is passed and valid
  if (!userId) {
    console.error("UserID is undefined");
    return null;
  }

  // Reference to the user's document inside 'jewellery-lib' collection
  const userDocRef = doc(db, "user-address", userId);

  // Get the 'collections' sub-collection inside the user's document
  const itemsCollectionRef = collection(userDocRef, "addresses");

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

export async function addNewUserAddress(userId, newAddress) {
  try {
    // Reference to the user's addresses collection
    const userDocRef = doc(db, "user-address", userId);
    const addressesCollectionRef = collection(userDocRef, "addresses");

    // Add a new document to the addresses subcollection
    const docRef = await addDoc(addressesCollectionRef, newAddress);
    return docRef.id; // Return the ID of the new document
  } catch (error) {
    console.error("Error adding new address:", error);
    throw error;
  }
}

export async function removeUserAddress(userId, addressId) {
  try {
    const addressRef = doc(db, `user-address/${userId}/addresses`, addressId);
    await deleteDoc(addressRef);
    console.log(`Address ${addressId} deleted successfully.`);
  } catch (error) {
    console.error("Error removing address:", error);
    throw error;
  }
}

export async function updateUserAddress(userId, addressId, updatedAddress) {
  // Reference to the specific address document within the addresses subcollection
  const addressRef = doc(db, "user-address", userId, "addresses", addressId);

  try {
    // Use setDoc with merge: true to update the address document without overwriting the entire document
    await setDoc(addressRef, updatedAddress, { merge: true });

    console.log("Address updated successfully.");
    return true;
  } catch (error) {
    console.error("Error updating user address:", error);
    throw error;
  }
}

export async function setDefaultAddress(userId, addressId) {
  try {
    // Reference to the addresses collection
    const addressesRef = collection(db, "user-address", userId, "addresses");

    // Retrieve all addresses for the user
    const allAddresses = await getDocs(addressesRef);

    // Initialize a batch for updating documents
    const batch = writeBatch(db);

    // Loop through addresses and set the default status
    allAddresses.forEach((docSnapshot) => {
      const addressRef = doc(
        db,
        "user-address",
        userId,
        "addresses",
        docSnapshot.id
      );
      const isDefault = docSnapshot.id === addressId;
      batch.update(addressRef, { isDefault }); // Setting isDefault field based on match
    });

    // Commit the batch
    await batch.commit();

    window.location.reload();
  } catch (error) {
    console.error("Error setting default address:", error);
  }
}

export async function retrieveUserPastOrders(userId) {
  // Ensure the userId is passed and valid
  if (!userId) {
    console.error("UserID is undefined");
    return null;
  }

  // Reference to the user's document inside 'jewellery-lib' collection
  const userDocRef = doc(db, "user-orders", userId);

  // Get the 'collections' sub-collection inside the user's document
  const itemsCollectionRef = collection(userDocRef, "orders");

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

export const uploadPhoto = async (userId, photo) => {
  const storage = getStorage();
  const storageRef = ref(
    storage,
    `${import.meta.env.VITE_FIREBASE_STORAGE_BUCKET}/${userId}`
  );

  try {
    // Upload the file
    const snapshot = await uploadBytes(storageRef, photo);

    // Get the download URL
    const downloadURL = await getDownloadURL(snapshot.ref);

    // Update the user profile with the new photo URL
    updateProfilePhotoUrl(userId, downloadURL);
  } catch (error) {
    console.error("Error uploading file:", error);
    throw error;
  }
};

export const updateProfilePhotoUrl = async (userId, photoUrl) => {
  const docRef = doc(db, "user-profile", userId);

  // Update only the imageUrl field, merging it with the existing data
  await setDoc(docRef, { imageUrl: photoUrl }, { merge: true });
};

export const updateUserProfile = async (userId, fullName, phoneNumber, bio) => {
  const docRef = doc(db, "user-profile", userId);

  try {
    await setDoc(docRef, { fullName, phoneNumber, bio }, { merge: true });
  } catch (error) {
    console.error("Error updating user profile:", error);
    throw error;
  }
};
