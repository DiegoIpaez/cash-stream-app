"use client";
import { signIn, signOut, useSession } from "next-auth/react";
import React from "react";

export const SigninButton = () => {
  const { data: session } = useSession();
  console.log({ session });

  if (session && session.user) {
    return (
      <>
        {/* <p className="text-sky-600">{session.user.name}</p> */}
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
