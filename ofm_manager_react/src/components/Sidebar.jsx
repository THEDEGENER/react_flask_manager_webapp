import { useState } from "react";
import { NavLink } from "react-router";

export default function Sidebar({ navItems, setSidebar, sidebarIsOpen }) {
  const listItems = navItems.map((item, index) => (
    <div key={index}>
      <li>
        <NavLink
          to={item.link}
          className={({ isActive }) =>
            isActive
              ? "bg-gray-700/25 text-white rounded-md flex px-2 py-1"
              : item.classList
          }
        >
          <span className={`${sidebarIsOpen && "mr-2"}`}>{item.icon}</span>
          <span
            className={`transition-all ${sidebarIsOpen ? "block" : "hidden"}`}
          >
            {item.name}
          </span>
        </NavLink>
      </li>
    </div>
  ));

  return (
    <div
      className={`min-h-dvh bg-blue-700 py-5 inset-shadow-sm transition-all duration-500 ease-in-out ${
        sidebarIsOpen ? "block w-65" : "w-16"
      }`}
    >
      <ul className="flex flex-col gap-5 text-lg px-3">
        <div className="flex items-center justify-between px-2">
          {sidebarIsOpen && <p className="text-white/50 text-sm">Tabs</p>}
          <button
            onClick={setSidebar}
            className={`${!sidebarIsOpen && "rotate-180"}`}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              height="24px"
              viewBox="0 -960 960 960"
              width="24px"
              fill="#e3e3e3"
            >
              <path d="M660-320v-320L500-480l160 160ZM200-120q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v560q0 33-23.5 56.5T760-120H200Zm120-80v-560H200v560h120Zm80 0h360v-560H400v560Zm-80 0H200h120Z" />
            </svg>
          </button>
        </div>
        {listItems}
      </ul>
    </div>
  );
}
