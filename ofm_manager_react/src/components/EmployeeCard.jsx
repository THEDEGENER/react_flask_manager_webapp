import { useEffect, useState } from "react";

export default function EmployeeCard({ employee }) {
  const [expanded, setExpanded] = useState(false);
  function handleClick() {
    setExpanded(!expanded);
  }

  return (
    <li className="flex flex-col justify-between gap-x-6 py-5 relative mt-5">
      <div className="flex min-w-0 gap-x-4" id="employee-hero-bg">
        <button
          onClick={handleClick}
          type="button"
          className="cursor-pointer employee-info-button"
          id="employee-info-button"
          aria-expanded="true"
          aria-haspopup="true"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="2.5"
            stroke="currentColor"
            className={`-mr-1 size-4 text-gray-500 ${
              expanded ? "rotate-90" : null
            }`}
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
        <img
          className="size-12 flex-none rounded-full bg-gray-50"
          src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
          alt=""
        />
        <div className="min-w-0 flex-auto">
          <p className="text-sm/6 font-semibold text-gray-900">
            {employee.name}
          </p>
          <p className="mt-1 truncate text-xs/5 text-gray-500"></p>
        </div>

        <div className="shrink-0 sm:flex sm:flex-col sm:items-end">
          <p className="text-sm/6 text-gray-900"></p>
          <p className="mt-1 text-xs/5 text-gray-500">
            Assigned to <span className="capitalize"></span>
          </p>
        </div>
      </div>
      <div className={`mt-15 ${expanded ? "block" : "hidden"}`}>
        <div className="px-4 sm:px-0">
          <h3 className="text-base/7 font-semibold text-gray-900">
            Employee information
          </h3>
        </div>
        <div className="mt-6 border-t border-gray-300">
          <dl className="divide-y divide-gray-300">
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">Full name</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0"></dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">Username</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0"></dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">Role</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0"></dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">
                Contact Info
              </dt>
              <dd className="mt-1 text-sm/6 text-gray-700  sm:mt-0"></dd>
              <dd className="mt-1 text-sm/6 text-gray-700 col-start-2 sm:mt-0"></dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">Location</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0"></dd>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-start-2 sm:mt-0"></dd>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-start-2 sm:mt-0"></dd>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-start-2 sm:mt-0"></dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">Pay rates</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                %
              </dd>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-start-2 sm:mt-0">
                $ per hour
              </dd>
            </div>
            <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
              <dt className="text-sm/6 font-medium text-gray-900">Comments</dt>
              <dd className="mt-1 text-sm/6 text-gray-700 sm:col-span-2 sm:mt-0">
                {employee.comment}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </li>
  );
}
