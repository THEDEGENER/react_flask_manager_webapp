import { useState } from "react";
import Login from "/src/components/Login.jsx";
import "/src/css/index.css";
import Header from "../components/Header";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router";
import { navItems } from "../assets/navItems";

export default function App() {
  const [sidebarIsOpen, setSidebarIsOpen] = useState(true);
  function handleSidebar() {
    setSidebarIsOpen(!sidebarIsOpen);
  }
  return (
    <>
      <div className="bg-blue-700">
        <Header setSidebar={handleSidebar} sidebarIsOpen={sidebarIsOpen} />
        <div className="flex">
          <Sidebar
            navItems={navItems}
            setSidebar={handleSidebar}
            sidebarIsOpen={sidebarIsOpen}
          />
          <Outlet />
        </div>
      </div>
    </>
  );
}

// use Link when routing to access the :active property when switching
// between header links so user knows which link in the header they are at
// the :linkParam (blog/:title or :id) can be used for the dynamic fetching from the server
// useParams() => const { link } = useParams() where { link } can be injected into a function or jsx ie fetch calls
// <Outlet /> needs to be included in the parent element to render child components when the index url is appended with the child url
// <Navigate to="/" /> use a prop to determine if a user is logged in and if not return navigate which will redirect to ?login page
// useNavigate() is used for imperative paths where a path is passed as a string to useNavigate which can then be
// used in a handle function for instance, negative and positive integers will traverse the users page history
