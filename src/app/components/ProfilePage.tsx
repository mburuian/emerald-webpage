"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { onAuthStateChanged, signOut, updateEmail, updatePassword, User } from "firebase/auth";
import { auth } from "@/lib/firebase";

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [email, setEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [profileImage, setProfileImage] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      if (!currentUser) {
        router.push("/");
      } else {
        setUser(currentUser);
        setEmail(currentUser.email || "");
      }
    });
    return () => unsubscribe();
  }, [router]);

  const handleLogout = async () => {
    await signOut(auth);
    router.push("/");
  };

  const handleEmailChange = async () => {
    if (user) {
      await updateEmail(user, email);
      alert("Email updated!");
    }
  };

  const handlePasswordChange = async () => {
    if (user && newPassword.length >= 6) {
      await updatePassword(user, newPassword);
      alert("Password updated!");
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setProfileImage(reader.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-tr from-[#f5f5f5] to-[#e3e3e3] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-lg text-center">
        <h1 className="text-3xl font-bold mb-6">👤 My Profile</h1>

        <div className="flex flex-col items-center space-y-3">
          {profileImage ? (
            <img src={profileImage} alt="Profile" className="w-24 h-24 rounded-full object-cover border-4 border-[#6a4a2e]" />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-300 flex items-center justify-center text-white text-xl font-semibold">
              {user?.email?.charAt(0).toUpperCase()}
            </div>
          )}
          <input type="file" accept="image/*" onChange={handleImageUpload} className="text-sm" />
        </div>

        <div className="mt-6 text-left">
          <label className="block font-medium">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full mt-1 p-2 border rounded"
            type="email"
          />
          <button onClick={handleEmailChange} className="w-full mt-2 bg-blue-600 text-white py-2 rounded hover:bg-blue-700">
            Update Email
          </button>
        </div>

        <div className="mt-4 text-left">
          <label className="block font-medium">New Password</label>
          <input
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full mt-1 p-2 border rounded"
            type="password"
          />
          <button onClick={handlePasswordChange} className="w-full mt-2 bg-green-600 text-white py-2 rounded hover:bg-green-700">
            Update Password
          </button>
        </div>

        <button
          onClick={handleLogout}
          className="w-full mt-6 bg-red-600 text-white py-2 rounded hover:bg-red-700"
        >
          Logout
        </button>
      </div>
    </div>
  );
}
