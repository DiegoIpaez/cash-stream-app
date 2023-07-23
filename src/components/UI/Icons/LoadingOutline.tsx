import { SVGC } from "@/interfaces";

const LoadingOutline = ({
  className = "",
  width = 24,
  height = 24,
  fill = "none",
  stroke = "currentColor",
  strokeLinecap = "round",
  strokeLinejoin = "round",
  strokeWidth = 2,
  viewBox = "0 0 24 24",
}: SVGC) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={width}
    height={height}
    fill={fill}
    stroke={stroke}
    strokeLinecap={strokeLinecap}
    strokeLinejoin={strokeLinejoin}
    strokeWidth={strokeWidth}
    className={`animate-spin ${className}`}
    viewBox={viewBox}
  >
    <circle cx={12} cy={12} r={10} stroke="currentColor" />
    <path
      fill="currentColor"
      d="M4 12a8 8 0 0 1 8-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 0 1 4 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647zM17.938 3c-2.135 1.865-3 4.647-3 7.938h4c0-2.208.896-4.233 2.344-5.657L17.938 3z"
    />
  </svg>
);

export default LoadingOutline;
