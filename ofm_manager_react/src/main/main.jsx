import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import Login from "../components/Login";
import "../css/index.css";
import App from "./App";
import Register from "../components/Register";
import Employees from "../components/employees";
import Invoicing from "../components/Invoicing";
import AddEmployee from "../components/AddEmployee";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="landing">
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
        </Route>
        <Route path="home" element={<App />}>
          <Route path="employees" element={<Employees />} />
          <Route path="invoicing" element={<Invoicing />} />
          <Route path="add_employee" element={<AddEmployee />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
