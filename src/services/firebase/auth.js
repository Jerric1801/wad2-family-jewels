import { auth } from "@/config/firebase";
import {
  signInWithEmailAndPassword,
  getAuth,
  signOut,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { useAuthStore } from "@/store/auth";

// Sign in with email/password
export const signIn = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const authStore = useAuthStore();
    authStore.setUser(user);
    return user;
  } catch (error) {
    console.error("Error signing in:", error);
    throw error;
  }
};

// Sign up with email/password
export const signUp = async (email, password) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    const authStore = useAuthStore();
    authStore.setUser(user);
    return user;
  } catch (error) {
    console.error("Error signing up:", error);
    throw error;
  }
};

// Sign out
export const logOut = async () => {
  // Use the existing auth instance
  try {
    await signOut(auth);
    console.log("User signed out");
  } catch (error) {
    console.log("Error signing out:", error);
  }
};
