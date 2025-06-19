"use client";

import { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "@/lib/firebase";
import {
  doc,
  setDoc,
  query,
  collection,
  where,
  getDocs,
} from "firebase/firestore";
import { useRouter } from "next/navigation";

const ADMIN_EMAIL = process.env.NEXT_PUBLIC_ADMIN_EMAIL;

export default function RegisterPage() {
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [usernameChecking, setUsernameChecking] = useState(false);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState<boolean | null>(null);

  const router = useRouter();

  const checkUsernameAvailability = async (name: string) => {
    setUsernameChecking(true);
    try {
      const q = query(collection(db, "users"), where("username", "==", name.trim()));
      const snapshot = await getDocs(q);
      setIsUsernameAvailable(snapshot.empty);
    } catch (err) {
      console.error("Error checking username:", err);
      setIsUsernameAvailable(null);
    }
    setUsernameChecking(false);
  };

  const handleUsernameChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setUsername(value);
    if (value.trim().length >= 3) {
      await checkUsernameAvailability(value);
    } else {
      setIsUsernameAvailable(null);
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isUsernameAvailable === false) {
      alert("Username is already taken. Please choose another.");
      return;
    }

    setLoading(true);
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, "users", userCred.user.uid), {
        uid: userCred.user.uid,
        fullName: fullName.trim(),
        username: username.trim(),
        phoneNumber: phoneNumber.trim(),
        email: email.trim(),
        role: email.trim() === ADMIN_EMAIL ? "admin" : "user",
        createdAt: new Date(),
      });

      router.push(email.trim() === ADMIN_EMAIL ? "/admin/blog-post" : "/blog");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Unknown error occurred.";
      alert("Registration failed: " + message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-lg w-full max-w-md shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center">Register an Account</h2>
        <form onSubmit={handleRegister}>
          <input
            type="text"
            placeholder="Full Name"
            className="w-full mb-3 p-2 border rounded"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Username"
            minLength={3}
            className="w-full mb-1 p-2 border rounded"
            value={username}
            onChange={handleUsernameChange}
            required
          />
          {usernameChecking && (
            <p className="text-sm text-yellow-500 mb-2">Checking availability...</p>
          )}
          {isUsernameAvailable === true && (
            <p className="text-sm text-green-600 mb-2">Username is available ✅</p>
          )}
          {isUsernameAvailable === false && (
            <p className="text-sm text-red-600 mb-2">Username is already taken ❌</p>
          )}
          <input
            type="tel"
            placeholder="Phone Number"
            className="w-full mb-3 p-2 border rounded"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            required
          />
          <input
            type="email"
            placeholder="Email"
            className="w-full mb-3 p-2 border rounded"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            className="w-full mb-4 p-2 border rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="submit"
            disabled={loading || isUsernameAvailable === false}
            className="w-full bg-[#6a4a2e] text-white py-2 rounded hover:bg-[#4b2e19] transition"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
      </div>
    </div>
  );
}
