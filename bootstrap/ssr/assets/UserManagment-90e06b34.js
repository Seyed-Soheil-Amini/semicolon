import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { n as useGetUsers, o as useDeleteUsers } from "./index-72e73b3b.js";
import { Head } from "@inertiajs/react";
import { useState } from "react";
import { A as Authenticated } from "./AuthenticatedLayout-9e7d963a.js";
import { isEmpty } from "lodash";
import { FaUserCircle } from "react-icons/fa/index.esm.js";
/* empty css                            */import { ToastContainer, toast } from "react-toastify";
import Fuse from "fuse.js";
import "axios";
import "react-query";
import "./ApplicationLogo-fd1fea94.js";
import "@headlessui/react";
const UserCard = ({ user, self, onSelect, selected }) => {
  return /* @__PURE__ */ jsxs(
    "tr",
    {
      className: `border-b border-gray-700 rounded-lg ${self && "bg-gray-900"}`,
      children: [
        /* @__PURE__ */ jsx("td", { className: "w-4 p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              id: `${user.id}`,
              type: "checkbox",
              className: `w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded ${!self && "cursor-pointer"} focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600`,
              onChange: () => onSelect(user.id),
              disabled: self,
              checked: selected
            }
          ),
          /* @__PURE__ */ jsx("label", { htmlFor: `${user.id}`, className: "sr-only", children: "checkbox" })
        ] }) }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: !isEmpty(user.image) ? /* @__PURE__ */ jsx(
          "img",
          {
            src: `${location.origin}/storage/${user.image}`,
            alt: "User Image",
            class: "h-8 w-8 rounded-full"
          }
        ) : /* @__PURE__ */ jsx(FaUserCircle, { className: "text-3xl text-gray-300" }) }),
        /* @__PURE__ */ jsx(
          "th",
          {
            scope: "row",
            className: `px-6 py-4 font-semibold whitespace-nowrap`,
            children: /* @__PURE__ */ jsx(
              "a",
              {
                href: route("showUser", btoa(user.id)),
                rel: "noopener noreferrer",
                onClick: (e) => e.stopPropagation(),
                target: "_blank",
                as: "a",
                children: /* @__PURE__ */ jsx(
                  "h2",
                  {
                    className: `hover:text-blue-500 ${user.isAdmin ? "text-yellow-500" : "text-gray-200"}`,
                    children: user.name
                  }
                )
              }
            )
          }
        ),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: user.job_title }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: user.email }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4", children: user.last_blog_time }),
        /* @__PURE__ */ jsx("td", { className: "px-6 py-4 font-medium", children: user.blog_count })
      ]
    }
  );
};
const UserSkeletonLoading = () => {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-between pt-4", children: [
    /* @__PURE__ */ jsx(
      "svg",
      {
        class: "w-8 h-8 text-gray-200 dark:text-gray-700 mr-4",
        "aria-hidden": "true",
        xmlns: "http://www.w3.org/2000/svg",
        fill: "currentColor",
        viewBox: "0 0 20 20",
        children: /* @__PURE__ */ jsx("path", { d: "M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" })
      }
    ),
    /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx("div", { className: "h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" }),
      /* @__PURE__ */ jsx("div", { className: "w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-32" }),
    /* @__PURE__ */ jsx("div", { className: "h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12" }),
    /* @__PURE__ */ jsx("div", { className: "h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-4" })
  ] });
};
const UserManagment = ({ auth }) => {
  const { data: users, isLoading, isFetching } = useGetUsers();
  const { data: deletedMessage, mutateAsync: deleteUsers } = useDeleteUsers();
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [searchUser, setSearchUser] = useState();
  const optionsFuseAlogrithm = {
    keys: ["name"],
    threshold: 0.3
  };
  const fuse = new Fuse(users, optionsFuseAlogrithm);
  function handleCheckboxChange(userId) {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
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
            }
          },
          error: {
            render({ data }) {
              if (data.response && data.response.status === 404) {
                return "User not found";
              } else {
                return "Unfortunately, there is a problem in the process of deleting the user.";
              }
            }
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  const handleSelectAllUsers = (event) => {
    if (!event.target.checked)
      setSelectedUsers([]);
    else {
      setSelectedUsers(
        users.filter((user) => user.isAdmin === 0).map((user) => user.id)
      );
    }
  };
  return /* @__PURE__ */ jsxs(Authenticated, { user: auth.user, children: [
    /* @__PURE__ */ jsx(ToastContainer, { position: "top-center" }),
    /* @__PURE__ */ jsx(Head, { title: "User Manager" }),
    /* @__PURE__ */ jsx("div", { className: "min-h-screen shadow-md sm:rounded-lg px-10 pt-10", children: !isLoading ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between pb-4", children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "table-search", className: "sr-only", children: "Search" }),
        /* @__PURE__ */ jsxs("div", { className: "relative mt-1", children: [
          /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none", children: /* @__PURE__ */ jsx(
            "svg",
            {
              className: "w-4 h-4 text-gray-500 dark:text-gray-400",
              "aria-hidden": "true",
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 20 20",
              children: /* @__PURE__ */ jsx(
                "path",
                {
                  stroke: "currentColor",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                }
              )
            }
          ) }),
          /* @__PURE__ */ jsx(
            "input",
            {
              type: "text",
              id: "table-search",
              className: "block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
              placeholder: "Search for users based on name",
              onChange: handleSearchUserChange
            }
          )
        ] }),
        !isEmpty(selectedUsers) && /* @__PURE__ */ jsx("div", { className: "", children: /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            class: "text-red-700 hover:text-gray-200 border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-1.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900",
            onClick: handleDeleteUsers,
            children: "Delete"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsxs("table", { className: "w-full text-sm text-left text-gray-400 rounded-lg", children: [
        /* @__PURE__ */ jsx("thead", { className: "text-md uppercase bg-gray-700 text-gray-400 rounded-lg", children: /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("th", { scope: "col", className: "p-4", children: /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                id: "checkbox-all-search",
                type: "checkbox",
                className: "w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded cursor-pointer focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600",
                onChange: handleSelectAllUsers
              }
            ),
            /* @__PURE__ */ jsx(
              "label",
              {
                htmlFor: "checkbox-all-search",
                className: "sr-only",
                children: "checkbox"
              }
            )
          ] }) }),
          /* @__PURE__ */ jsx(
            "th",
            {
              scope: "col",
              className: "px-6 py-3 underline",
              children: "Icon"
            }
          ),
          /* @__PURE__ */ jsx(
            "th",
            {
              scope: "col",
              className: "px-6 py-3 underline",
              children: "User name"
            }
          ),
          /* @__PURE__ */ jsx(
            "th",
            {
              scope: "col",
              className: "px-6 py-3 underline",
              children: "Expertise"
            }
          ),
          /* @__PURE__ */ jsx(
            "th",
            {
              scope: "col",
              className: "px-6 py-3 underline",
              children: "Email"
            }
          ),
          /* @__PURE__ */ jsx(
            "th",
            {
              scope: "col",
              className: "px-6 py-3 underline",
              children: "Last Blog"
            }
          ),
          /* @__PURE__ */ jsx(
            "th",
            {
              scope: "col",
              className: "px-6 py-3 underline",
              children: "Blogs"
            }
          )
        ] }) }),
        /* @__PURE__ */ jsx("tbody", { children: isEmpty(searchUser) ? users.map((user) => /* @__PURE__ */ jsx(
          UserCard,
          {
            user,
            onSelect: handleCheckboxChange,
            self: user.id === auth.user.id,
            selected: selectedUsers.includes(
              user.id
            )
          }
        )) : fuse.search(searchUser).map((res) => /* @__PURE__ */ jsx(
          UserCard,
          {
            user: res.item,
            onSelect: handleCheckboxChange,
            self: res.item.id === auth.user.id,
            selected: selectedUsers.includes(
              res.item.id
            )
          }
        )) })
      ] })
    ] }) : /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsx("div", { className: "h-8 bg-gray-300 rounded-full dark:bg-gray-700 w-1/5 mt-5 mb-8 shadow animate-pulse" }),
      /* @__PURE__ */ jsxs(
        "div",
        {
          role: "status",
          className: "p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700",
          children: [
            [...Array(6)].map((_, index) => /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(UserSkeletonLoading, {}) }, index)),
            /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Loading..." })
          ]
        }
      )
    ] }) })
  ] });
};
export {
  UserManagment as default
};
