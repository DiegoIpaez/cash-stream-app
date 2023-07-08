"use client";
import React, { useState } from "react";

export const SigninButton = () => {
  const [session, setSession] = useState({ user: true });

  const signOut = () => setSession({ user: false });
  const signIn = () => setSession({ user: true });

  if (session && session.user) {
    return (
      <>
        <button onClick={() => signOut()} className="text-red-600 pl-3">
          Sign Out
        </button>
      </>
    );
  }
  return (
    <button onClick={() => signIn()} className="text-green-600 ml-auto pl-3">
      Sign In
    </button>
  );
};
