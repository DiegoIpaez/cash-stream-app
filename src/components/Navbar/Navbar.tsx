import Link from "next/link";

const Navbar = () => {
  const links = [
    { href: "/", label: "Home" },
    { href: "/cash", label: "Cash" },
    { href: "/history", label: "History" },
  ];

  return (
    <header>
      <nav className="bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0"></div>
            <div className="flex items-center space-x-4">
              {links.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-white hover:bg-gray-700 px-3 py-2 rounded-md"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
