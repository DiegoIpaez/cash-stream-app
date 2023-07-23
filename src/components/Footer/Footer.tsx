import React from "react";
import { GithubOutline } from "../UI/Icons";

export default function Footer() {
  return (
    <footer className="bg-gray-600 py-5 text-center w-full mt-8">
      <div className="flex flex-col md:flex-row justify-around items-center">
        <a
          className="flex"
          target="_blank"
          href="https://github.com/DiegoIpaez?tab=repositories"
          rel="noopener noreferrer"
        >
          <GithubOutline width={17} />
          <p className="ms-2">DiegoIPaez/repositories</p>
        </a>
        <p className="text-white mb-2 md:mb-0">
          © 2023 Cash stream.
        </p>
      </div>
    </footer>
  );
}
