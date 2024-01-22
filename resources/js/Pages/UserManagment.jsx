import { useDeleteUsers, useGetUsers } from "@/hooks";
import { Head } from "@inertiajs/react";
import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import UserCard from "@/Components/User/UserCard";
import UserSkeletonLoading from "@/Components/UserSkeletonLoading";
import { isEmpty } from "lodash";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer, toast } from "react-toastify";
import Fuse from "fuse.js";
import { useTranslation } from "react-i18next";

const UserManagment = ({ auth }) => {
    const { t } = useTranslation();
    const { data: users, isLoading, isFetching } = useGetUsers();
    const { data: deletedMessage, mutateAsync: deleteUsers } = useDeleteUsers();
    const [selectedUsers, setSelectedUsers] = useState([]);
    const [searchUser, setSearchUser] = useState();

    const optionsFuseAlogrithm = {
        keys: ["name"],
        threshold: 0.3,
    };
    const fuse = new Fuse(users, optionsFuseAlogrithm);

    function handleCheckboxChange(userId) {
        if (selectedUsers.includes(userId)) {
            setSelectedUsers(selectedUsers.filter((id) => id != userId));
        } else {
            setSelectedUsers([...selectedUsers, userId]);
        }
    }

    const handleSearchUserChange = (event) => {
        setSearchUser(event.target.value);
    };

    const handleDeleteUsers = () => {
        try {
            toast.promise(
                async () => await Promise.resolve(deleteUsers(selectedUsers)),
                {
                    pending: "Removing...",
                    success: {
                        render() {
                            !isLoading && setSelectedUsers([]);
                            return "Users are deleted successfully.";
                        },
                    },
                    error: {
                        render({ data }) {
                            if (data.response && data.response.status === 404) {
                                return "User not found";
                            } else {
                                return "Unfortunately, there is a problem in the process of deleting the user.";
                            }
                        },
                    },
                }
            );
        } catch (error) {
            console.log(error);
        }
    };

    const handleSelectAllUsers = (event) => {
        if (!event.target.checked) setSelectedUsers([]);
        else {
            setSelectedUsers(
                users.filter((user) => user.isAdmin == 0).map((user) => user.id)
            );
        }
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <ToastContainer position="top-center" />
            <Head title="User Manager" />
            <div className="min-h-screen shadow-md px-5 py-5 md:px-10 md:pt-10">
                {!isLoading ? (
                    <>
                        <div className="flex flex-col md:flex-row justify-between pb-4">
                            <label htmlFor="table-search" className="sr-only">
                                Search
                            </label>
                            <div className="relative mt-1 mx-8">
                                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                    <svg
                                        className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                        aria-hidden="true"
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 20 20"
                                    >
                                        <path
                                            stroke="currentColor"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                        />
                                    </svg>
                                </div>
                                <input
                                    type="text"
                                    id="table-search"
                                    className="block p-2 pl-10 text-xs md:text-sm text-gray-900 border border-gray-300 rounded-lg w-full md:w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Search for blogs based on name"
                                    onChange={handleSearchUserChange}
                                />
                            </div>
                            {!isEmpty(selectedUsers) && (
                                <div className="mt-2 mx-auto md:mx-0 md:mt-0">
                                    <button
                                        type="button"
                                        class="text-red-700 hover:text-gray-200 border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs md:text-sm md:px-4 px-2 py-1.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                                        onClick={handleDeleteUsers}
                                    >
                                        {t("dash.usr-mang.del-btn")}
                                    </button>
                                </div>
                            )}
                        </div>
                        <div class="overflow-x-auto rounded-md">
                            <table class="w-full text-sm text-left text-gray-400 rounded-lg">
                                <thead class="text-xs md:text-base uppercase bg-gray-700 text-gray-400 rounded-lg">
                                    <tr>
                                        <th scope="col" class="p-2 md:p-4">
                                            <div class="flex items-center">
                                                <input
                                                    id="checkbox-all-search"
                                                    type="checkbox"
                                                    class="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded cursor-pointer focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                                    onChange={
                                                        handleSelectAllUsers
                                                    }
                                                />
                                                <label
                                                    for="checkbox-all-search"
                                                    class="sr-only"
                                                >
                                                    checkbox
                                                </label>
                                            </div>
                                        </th>
                                        <th
                                            scope="col"
                                            class="px-4 py-1.5 md:px-6 md:py-3 underline"
                                        >
                                            {t("dash.usr-mang.icn")}
                                        </th>
                                        <th
                                            scope="col"
                                            class="px-3 py-1.5 md:px-6 md:py-3 underline"
                                        >
                                            {t("dash.usr-mang.usr-name")}
                                        </th>
                                        <th
                                            scope="col"
                                            class="px-3 py-1.5 md:px-6 md:py-3 underline"
                                        >
                                            {t("dash.usr-mang.exp")}
                                        </th>
                                        <th
                                            scope="col"
                                            class="px-3 py-1.5 md:px-6 md:py-3 underline"
                                        >
                                            {t("dash.usr-mang.email")}
                                        </th>
                                        <th
                                            scope="col"
                                            class="px-5 py-1.5 md:px-6 md:py-3 underline"
                                        >
                                            {t("dash.usr-mang.lblg")}
                                        </th>
                                        <th
                                            scope="col"
                                            class="px-3 py-1.5 md:px-6 md:py-3 underline"
                                        >
                                            {t("dash.usr-mang.blg")}
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {isEmpty(searchUser)
                                        ? users.map((user) => (
                                              <UserCard
                                                  user={user}
                                                  onSelect={
                                                      handleCheckboxChange
                                                  }
                                                  self={user.id == auth.user.id}
                                                  selected={selectedUsers.includes(
                                                      user.id
                                                  )}
                                              />
                                          ))
                                        : fuse
                                              .search(searchUser)
                                              .map((res) => (
                                                  <UserCard
                                                      user={res.item}
                                                      onSelect={
                                                          handleCheckboxChange
                                                      }
                                                      self={
                                                          res.item.id ==
                                                          auth.user.id
                                                      }
                                                      selected={selectedUsers.includes(
                                                          res.item.id
                                                      )}
                                                  />
                                              ))}
                                </tbody>
                            </table>
                        </div>
                    </>
                ) : (
                    <>
                        <div className="h-8 bg-gray-300 rounded-full dark:bg-gray-700 w-full md:w-1/5 mt-5 mb-8 shadow animate-pulse" />
                        <div
                            role="status"
                            className="p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
                        >
                            {[...Array(6)].map((_, index) => (
                                <div key={index} className="p-4 md:p-6">
                                    <UserSkeletonLoading />
                                </div>
                            ))}
                            <span className="sr-only">
                                {t("dash.usr-mang.lod-btn")}
                            </span>
                        </div>
                    </>
                )}
            </div>
        </AuthenticatedLayout>
    );
};

export default UserManagment;
