// app/book-session/page.tsx
"use client";

import { useState } from "react";
import { db } from "@/lib/firebase";
import { collection, addDoc } from "firebase/firestore";

export default function BookSession() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "sessionRequests"), form);
      setSubmitted(true);
    } catch (error: unknown) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <main className="max-w-2xl mx-auto p-8">
      <h1 className="text-3xl font-bold mb-4 text-center">Book a Session</h1>

      {submitted ? (
        <p className="text-green-600 text-center">
          Thank you! We&apos;ll get back to you soon.
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="space-y-4"
          aria-label="Book a counseling session"
        >
          <input
            name="name"
            type="text"
            placeholder="Your Name"
            className="w-full p-3 border border-gray-300 rounded"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Your Email"
            className="w-full p-3 border border-gray-300 rounded"
            value={form.email}
            onChange={handleChange}
            required
          />
          <textarea
            name="message"
            placeholder="Your Message"
            className="w-full p-3 border border-gray-300 rounded"
            rows={4}
            value={form.message}
            onChange={handleChange}
            required
          />
          <button
            type="submit"
            className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-2 rounded font-semibold"
          >
            Submit
          </button>
        </form>
      )}
    </main>
  );
}
