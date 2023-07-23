import Link from "next/link";
import { SigninButton } from "./SiginButton";

const DEFAULT_STYLES = "text-sm font-medium text-white hover:bg-gray-700 px-3 py-2 rounded-md";
const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/cash", label: "Cash" },
  { href: "/history", label: "History" },
];

interface Props {
  className?: string;
}

export const NavItems = ({ className = DEFAULT_STYLES }: Props) => {
  return (
    <>
      {NAV_LINKS.map((link) => (
        <Link key={link.href} href={link.href} className={className}>
          {link.label}
        </Link>
      ))}
      <SigninButton />
    </>
  );
};

