import { Link, useLocation } from "react-router-dom";

const navItems = [
  { name: "Clients", path: "/clients" },
  { name: "Products", path: "/products" },
  { name: "Invoices", path: "/invoices" },
];

export default function Sidebar() {
  const location = useLocation();

  return (
    <div className="h-screen w-60 bg-[#023acb] text-white flex flex-col">
      <div className="p-6 text-2xl font-bold">Invoicer</div>
      <nav className="flex-1">
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`block px-6 py-3 hover:bg-blue-800 ${
              location.pathname === item.path ? "bg-blue-900" : ""
            }`}
          >
            {item.name}
          </Link>
        ))}
      </nav>
      <div className="p-6 border-t border-blue-700">
        <button
          className="w-full bg-white text-[#023acb] py-2 rounded"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
