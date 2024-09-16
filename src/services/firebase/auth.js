// src/services/authService.js
import { db } from "@/config/firebase";
import { collection, query, where, getDocs, addDoc } from "firebase/firestore";
import { hashPassword, comparePassword } from "@/utils/authUtils";

export async function handleLogin(email, password) {
    try {
        const usersCollection = collection(db, "accounts");
        const q = query(usersCollection, where("email", "==", email));
        const querySnapshot = await getDocs(q);
        const user = querySnapshot.docs[0].data();
        const passwordMatch = await comparePassword(
            password,
            user.password
        );
        if (passwordMatch) {
            return true
        } else {
            this.errorMessage = "Invalid email or password";
        }
    } catch (error) {
        console.error("Error during login:", error);
        throw error;
    }
}

export async function handleSignUp(name, email, password) {
    try {
        const hashedPassword = await hashPassword(password);
        await addDoc(collection(db, "accounts"), {
          name: name,
          email: email,
          password: hashedPassword,
        });

        return true
    } catch (error) {
        console.error("Error during signup:", error);
        throw error;
    }
}