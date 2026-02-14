import { Navigate } from "react-router-dom";

function ProtectedRoute({ children }) {
  const isLoggedIn = false; // change to true to test

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default ProtectedRoute;
