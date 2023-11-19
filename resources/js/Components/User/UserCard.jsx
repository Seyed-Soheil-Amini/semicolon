import { isEmpty } from "lodash";
import React from "react";
import { FaUserCircle } from "react-icons/fa";

const UserCard = ({ user, self, onSelect, selected }) => {
    return (
        <tr
            className={`border-b border-gray-700 rounded-lg ${
                self && "bg-gray-900"
            }`}
        >
            <td className="w-4 p-2 md:p-4">
                <div className="flex items-center">
                    <input
                        id={`${user.id}`}
                        type="checkbox"
                        className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded ${
                            !self && "cursor-pointer"
                        } focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600`}
                        onChange={() => onSelect(user.id)}
                        disabled={self}
                        checked={selected}
                    />
                    <label htmlFor={`${user.id}`} className="sr-only">
                        checkbox
                    </label>
                </div>
            </td>
            <td className="px-6 py-4 md:px-4 md:py-2">
                {!isEmpty(user.image) ? (
                    <img
                        src={`${location.origin}/storage/${user.image}`}
                        alt="User Image"
                        className="h-8 w-8 md:h-12 md:w-12 rounded-full"
                    />
                ) : (
                    <FaUserCircle className="text-3xl md:text-4xl text-gray-300" />
                )}
            </td>
            <th
                scope="row"
                className="px-2 py-3 md:px-4 md:py-6 font-semibold whitespace-nowrap"
            >
                <a
                    href={route("showUser", btoa(user.id))}
                    rel="noopener noreferrer"
                    onClick={(e) => e.stopPropagation()}
                    target={"_blank"}
                    as={"a"}
                >
                    <h2
                        className={`hover:text-blue-500 ${
                            user.isAdmin ? "text-yellow-500" : "text-gray-200"
                        } text-sm md:text-base`}
                    >
                        {user.name}
                    </h2>
                </a>
            </th>
            <td className="px-3 py-1.5 md:px-6 md:py-3 text-xs md:text-base">
                {user.job_title}
            </td>
            <td className="px-3 py-1.5 md:px-6 md:py-3 text-xs md:text-base">
                {user.email}
            </td>
            <td className="px-5 py-1.5 md:px-6 md:py-3 text-xs md:text-base">
                {user.last_blog_time}
            </td>
            <td className="px-3 py-1.5 md:px-6 md:py-3 font-medium text-sm md:text-base">
                {user.blog_count}
            </td>
        </tr>
    );
};

export default UserCard;
