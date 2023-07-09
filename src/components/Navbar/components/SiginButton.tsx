"use client";
import React from "react";
import { signIn, signOut, useSession } from "next-auth/react";

export const SigninButton = () => {
  const { data: session } = useSession();

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
