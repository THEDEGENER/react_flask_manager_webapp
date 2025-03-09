import { useState, useEffect } from "react";
import EmployeeCard from "./EmployeeCard";

export default function Employees() {
  const [loading, setLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await fetch("/api/employees/get_employees");
        if (response.ok) {
          const employeesData = await response.json();
          console.log(employeesData);
          setEmployees(employeesData.employees);
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchEmployees();
  }, []);

  const employeeList = employees.map((employee) => (
    <EmployeeCard key={employee.id} employee={employee} />
  ));

  return (
    <div className="p-4 bg-white w-full rounded-tl-md max-h-screen overflow-auto">
      <div className="flex justify-end ">
        <div className="relative inline-block text-left">
          <div>
            <button
              type="button"
              className="cursor-pointer inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 ring-1 shadow-xs ring-gray-300 ring-inset hover:bg-gray-50"
              id="menu-button"
              aria-expanded="true"
              aria-haspopup="true"
            >
              Options
              <svg
                className="-mr-1 size-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
                data-slot="icon"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.22 8.22a.75.75 0 0 1 1.06 0L10 11.94l3.72-3.72a.75.75 0 1 1 1.06 1.06l-4.25 4.25a.75.75 0 0 1-1.06 0L5.22 9.28a.75.75 0 0 1 0-1.06Z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>
          <div
            id="teams-dropdown"
            className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 focus:outline-hidden transition hidden ease-in-out duration-300"
            role="menu"
            aria-orientation="vertical"
            aria-labelledby="menu-button"
            tabindex="-1"
          >
            <div className="py-1" role="none">
              <a
                href=""
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                tabindex="-1"
                id="menu-item-0"
              >
                Add employee
              </a>
              <a
                href=""
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                tabindex="-1"
                id="menu-item-0"
              >
                Manage employee
              </a>
              <a
                href="{{ url_for('home.manage_employees') }}"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                role="menuitem"
                tabindex="-1"
                id="menu-item-0"
              >
                Manage teams
              </a>
            </div>
          </div>
        </div>
      </div>
      <ul
        role="list"
        className="divide-y divide-gray-100 mb-15"
        id="employee-list"
      >
        {employeeList}
      </ul>
    </div>
  );
}
