import { Navigate } from "react-router-dom";
import { getSideLinks } from "@/data/sidelinks";

export default function HomeRedirect() {
  const links = getSideLinks();

  if (!links.length) {
    return <Navigate to="/sign-in" replace />;
  }

  return <Navigate to={links[0].href} replace />;
}