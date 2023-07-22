import React from "react";

interface Props {
  className?: string;
  disabled: boolean;
  handleClick?: () => void;
  isLoading: boolean;
  textContent?: string;
}

const LoadingButton = ({
  isLoading,
  handleClick,
  className = "bg-indigo-700 text-white px-3 py-2 rounded-lg block mb-2 w-full disabled:opacity-50",
  disabled,
  textContent = 'Click me!'
}: Props) => {
  return (
    <button
      onClick={handleClick}
      className={`${className} ${
        isLoading ? "cursor-not-allowed opacity-50" : "hover:bg-blue-600"
      }`}
      disabled={disabled}
    >
      <div className="flex items-center justify-center">
        {isLoading && (
          <svg
            className="animate-spin -mr-1 h-5 w-5 text-white"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM17.938 3c-2.135 1.865-3 4.647-3 7.938h4c0-2.208.896-4.233 2.344-5.657l-3.344-2.281z"
            ></path>
          </svg>
        )}
        <span className={`text-base ${isLoading && "ml-2"}`}>
          {isLoading ? "Cargando..." : textContent}
        </span>
      </div>
    </button>
  );
};

export default LoadingButton;
