import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-9e7d963a.js";
import { j as useGetUserActivity } from "./index-72e73b3b.js";
import { Head } from "@inertiajs/react";
import "lodash";
import "react";
import "./ApplicationLogo-fd1fea94.js";
import "@headlessui/react";
import "react-query";
import "axios";
function Dashboard({ auth }) {
  const {
    data: activities,
    isLoading,
    isRefetching
  } = useGetUserActivity(auth.user.id);
  return /* @__PURE__ */ jsxs(Authenticated, { user: auth.user, children: [
    /* @__PURE__ */ jsx(Head, { title: "Dashboard" }),
    /* @__PURE__ */ jsxs("div", { className: "py-10", children: [
      /* @__PURE__ */ jsx("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg", children: /* @__PURE__ */ jsxs("div", { className: "p-6 text-gray-900 dark:text-gray-100", children: [
        "Welcome Dear ",
        auth.user.name,
        " :)"
      ] }) }) }),
      /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-6 lg:px-8 py-10", children: [
        /* @__PURE__ */ jsx("div", { class: "px-4 sm:px-0", children: /* @__PURE__ */ jsx("h3", { class: "font-semibold leading-7 text-gray-300 text-2xl", children: "User Information" }) }),
        /* @__PURE__ */ jsx("div", { class: "mt-6 border-t border-gray-500", children: /* @__PURE__ */ jsxs("dl", { class: "divide-y divide-gray-500", children: [
          /* @__PURE__ */ jsxs("div", { class: "px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0", children: [
            /* @__PURE__ */ jsx("dt", { class: "text-md leading-6 text-gray-400 font-serif", children: "Full name" }),
            /* @__PURE__ */ jsx("dd", { class: "mt-1 text-sm leading-6 text-blue-500 sm:col-span-2 sm:mt-0", children: auth.user.name })
          ] }),
          /* @__PURE__ */ jsxs("div", { class: "px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0", children: [
            /* @__PURE__ */ jsx("dt", { class: "text-md leading-6 text-gray-400 font-serif", children: "Application for" }),
            /* @__PURE__ */ jsx("dd", { class: "mt-1 text-sm leading-6 text-blue-500 sm:col-span-2 sm:mt-0", children: auth.user.job_title })
          ] }),
          /* @__PURE__ */ jsxs("div", { class: "px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0", children: [
            /* @__PURE__ */ jsx("dt", { class: "text-md leading-6 text-gray-400 font-serif", children: "Email address" }),
            /* @__PURE__ */ jsx("dd", { class: "mt-1 text-sm leading-6 text-blue-500 sm:col-span-2 sm:mt-0", children: auth.user.email })
          ] }),
          /* @__PURE__ */ jsxs("div", { class: "px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0", children: [
            /* @__PURE__ */ jsx("dt", { class: "text-md leading-6 text-gray-400 font-serif", children: "About" }),
            /* @__PURE__ */ jsxs("dd", { class: "mt-1 text-sm leading-6 text-blue-500 sm:col-span-2 sm:mt-0", children: [
              auth.user.about == "null" ? "Author of Semicolon Weblog" : auth.user.about,
              " "
            ] })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "py-10 sm:py-16", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl px-6 lg:px-8", children: /* @__PURE__ */ jsxs("dl", { className: "grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3 bg-gray-900 py-10 rounded-lg", children: [
        /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-xs flex-col gap-y-4", children: [
          /* @__PURE__ */ jsx("dt", { className: "text-base leading-7 text-gray-400 font-serif", children: "Average views of blogs" }),
          !isLoading ? /* @__PURE__ */ jsx("dd", { className: "order-first text-3xl font-semibold tracking-tight text-gray-300 sm:text-5xl", children: activities.avgViews }) : /* @__PURE__ */ jsx(Fragment, {})
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-xs flex-col gap-y-4", children: [
          /* @__PURE__ */ jsx("dt", { className: "text-base leading-7 text-gray-400 font-serif", children: "Favoriate Category" }),
          !isLoading ? /* @__PURE__ */ jsx("dd", { className: "order-first text-3xl font-semibold tracking-tight text-gray-300 sm:text-5xl", children: activities.favoriteCategory.name }) : /* @__PURE__ */ jsx(Fragment, {})
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mx-auto flex max-w-xs flex-col gap-y-4", children: [
          /* @__PURE__ */ jsx("dt", { className: "text-base leading-7 text-gray-400 font-serif", children: "Number of published posts" }),
          !isLoading ? /* @__PURE__ */ jsx("dd", { className: "order-first text-3xl font-semibold tracking-tight text-gray-300 sm:text-5xl", children: activities.numberOfBlogs }) : /* @__PURE__ */ jsx(Fragment, {})
        ] })
      ] }) }) })
    ] })
  ] });
}
export {
  Dashboard as default
};
