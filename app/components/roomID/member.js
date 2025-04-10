import React from "react";

const Member = (props) => {
  return (
    <li className="py-3 sm:py-4">
      <div className="flex items-center">
        <div className="flex-1 min-w-0 ms-4">
          <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
            {props.username}
          </p>
          <p className="text-sm text-gray-500 truncate dark:text-gray-400">
            {props.email}
          </p>
        </div>
        <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
          {props.role}
        </div>
      </div>
    </li>
  );
};

export default Member;
