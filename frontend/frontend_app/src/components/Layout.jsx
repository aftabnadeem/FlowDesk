import Sidebar from "./Sidebar";

export default function Layout({ children }) {
  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 bg-gray-50 h-screen p-6 overflow-y-auto">{children}</div>
    </div>
  );
}
