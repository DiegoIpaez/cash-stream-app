import { SVGC } from "@/interfaces";

const DeleteOutline = ({
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
    className={`feather feather-trash-2 ${className}`}
    viewBox={viewBox}
  >
    <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6" />
  </svg>
);

export default DeleteOutline;
