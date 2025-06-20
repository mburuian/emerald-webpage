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
      <h1 className="text-4xl font-bold mb-2 text-center text-[#4b2e19]">
        Book a Session
      </h1>
      <p className="text-center text-gray-700 mb-6">
        Each counseling session costs <strong>Ksh 1,000</strong>. Please fill out the form
        below and we’ll get back to you shortly.
      </p>

      {submitted ? (
        <p className="text-green-600 text-center text-lg font-medium">
          Thank you! We&apos;ll get back to you soon.
        </p>
      ) : (
        <form
          onSubmit={handleSubmit}
          className="space-y-4 bg-white p-6 rounded shadow-md"
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
            className="w-full bg-[#6a4a2e] hover:bg-[#4b2e19] text-white py-3 rounded font-semibold transition"
          >
            Submit
          </button>
        </form>
      )}
    </main>
  );
}
