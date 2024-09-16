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
        const passwordMatch = await comparePassword(password, user.password);

        if (!passwordMatch) {
            throw new Error('Invalid password. Please try again.');
        }

        return user;
    } catch (error) {
        if (error.code === 'auth/user-not-found') {
            throw new Error('No account found with that email.');
        } else {
            console.error("Error during login:", error);
            throw new Error('An error occurred during login. Please try again later.');
        }
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
        if (error.code === 'auth/email-already-in-use') {
            throw new Error('Email is already in use. Please try a different one or log in.');
        } else {
            console.error("Error during signup:", error);
            throw new Error('An error occurred during signup. Please try again later.');
        }
    }
}