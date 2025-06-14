import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, query, orderBy } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

// Define BlogPost type if not imported
interface BlogPost {
  id: string;
  title: string;
  content: string;
  createdAt: any;
  likes: number;
}

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBvtvelB43kOWouALfVEVJDAVadNn5ErvI",
  authDomain: "emerald-counselling.firebaseapp.com",
  projectId: "emerald-counselling",
  storageBucket: "emerald-counselling.firebasestorage.app",
  messagingSenderId: "1018887751221",
  appId: "1:1018887751221:web:aa03df6a0759d48d6e537c",
  measurementId: "G-FGVTWSWP98"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
export const storage = getStorage(app);


// Fetch blog posts
export async function fetchBlogPosts(): Promise<BlogPost[]> {
  const postsCol = collection(db, "blogPosts");
  const q = query(postsCol, orderBy("createdAt", "desc"));
  const snapshot = await getDocs(q);
  return snapshot.docs.map((doc) => {
    const data = doc.data();
    return {
      id: doc.id,
      title: data.title || "",
      content: data.content || "",
      createdAt: data.createdAt,
      likes: data.likes || 0,
    };
  });
}

