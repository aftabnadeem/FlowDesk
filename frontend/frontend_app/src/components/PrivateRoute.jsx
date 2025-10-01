import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

export default function PrivateRoute({ children }) {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/" replace />;

  try {
    const decoded = jwtDecode(token);
    if (decoded.exp * 1000 < Date.now()) {
      localStorage.removeItem("token");
      return <Navigate to="/" replace />;
    }
  } catch (err) {
    return <Navigate to="/" replace />;
  }

  return children;
}
