"use client";

import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/lib/firebase";
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";


type LoginModalProps = {
  onCloseAction: () => void;
};

export default function LoginModal({ onCloseAction }: LoginModalProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onCloseAction();
    } catch (err) {
      console.error("Login error:", err);
      setError("Invalid email or password.");
    }
  };

  const handleForgotPassword = () => {
    if (!email) {
      alert("Enter your email above to reset password.");
      return;
    }

    import("firebase/auth").then(({ sendPasswordResetEmail }) => {
      sendPasswordResetEmail(auth, email)
        .then(() => alert("Password reset email sent!"))
        .catch((err) => alert("Error: " + err.message));
    });
  };
const handleGoogleLogin = async () => {
  try {
    const provider = new GoogleAuthProvider();
    await signInWithPopup(auth, provider);
    onCloseAction(); // close modal on success
  } catch (err: unknown) {
  if (err instanceof Error) {
    console.error("Google login error:", err.message);
    alert("Google login failed: " + err.message);
  } else {
    console.error("Google login error:", err);
    alert("Google login failed due to an unknown error.");
  }
}
};

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md animate-fade-in">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-[#6a4a2e]">🔐 Secure Login</h2>
          <button onClick={onCloseAction} className="text-gray-500 hover:text-red-500 text-xl">✕</button>
        </div>

        {error && <p className="text-red-600 mb-4 text-sm">{error}</p>}

        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">Email Address</label>
          <input
  type="email"
  value={email}
  onChange={(e) => setEmail(e.target.value)}
  placeholder="Email"
  className="w-full p-2 mb-3 border rounded text-black"
/>
        </div>

        <div className="mb-2">
          <label className="block mb-1 font-medium text-gray-700">Password</label>
         <input
  type="password"
  value={password}
  onChange={(e) => setPassword(e.target.value)}
  placeholder="Password"
  className="w-full p-2 mb-3 border rounded text-black"
/>
        </div>

        <button onClick={handleForgotPassword} className="text-sm text-blue-600 hover:underline mb-4">
          Forgot Password?
        </button>

        <button
          onClick={handleLogin}
          className="w-full bg-[#6a4a2e] hover:bg-[#4b2e19] text-white py-2 rounded text-lg font-semibold transition"
        >
          Login
        </button>

        <div className="my-6 text-center text-gray-400">or continue with</div>

        <div className="flex gap-4">
         <button
  onClick={handleGoogleLogin}
  className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 transition"
>
  Sign in with Google
</button>


         
        </div>
      </div>
    </div>
  );
}
