export const HamburgerMenu = ({ toggleMenu }: { toggleMenu: () => void }) => {
  return (
    <div className="sm:hidden">
      <button
        type="button"
        className="text-gray-500 hover:text-white focus:outline-none focus:text-white"
        onClick={() => toggleMenu()}
      >
        <svg
          className="h-6 w-6 fill-current"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"
          />
        </svg>
      </button>
    </div>
  );
};
