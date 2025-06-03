// src/app/dashboard/page.tsx
"use client";

import { useUser } from "@clerk/nextjs";
import { UserButton } from "@clerk/nextjs";
import { useQuery, useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";
import { useEffect } from "react";

export default function Dashboard() {
  const { user, isLoaded } = useUser();
  const createUser = useMutation(api.users.createUser);
  const currentUser = useQuery(api.users.getCurrentUser);

  // Create user in Convex when they first sign in
  useEffect(() => {
    if (isLoaded && user && !currentUser) {
      createUser({
        clerkId: user.id,
        email: user.emailAddresses[0]?.emailAddress || "",
        name: user.fullName || user.firstName || "Anonymous",
      });
    }
  }, [user, isLoaded, currentUser, createUser]);

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-lg">Loading...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            <div className="flex items-center">
              <h1 className="text-xl font-semibold text-gray-900">
                Planit Dashboard
              </h1>
            </div>
            <div className="flex items-center space-x-4">
              <span className="text-sm text-gray-700">
                Welcome, {user?.firstName}!
              </span>
              <UserButton afterSignOutUrl="/" />
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg h-96 flex items-center justify-center">
            <div className="text-center">
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Your Trips
              </h2>
              <p className="text-gray-600 mb-6">
                You don&apos;t have any trips yet. Start planning your first
                adventure!
              </p>
              <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                Create Your First Trip
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
