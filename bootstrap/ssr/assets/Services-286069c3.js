import { jsxs, jsx } from "react/jsx-runtime";
import "react";
import { A as Authenticated } from "./AuthenticatedLayout-9e7d963a.js";
import { Head } from "@inertiajs/react";
import { FaUserGraduate, FaTools, FaCoins } from "react-icons/fa/index.esm.js";
import "./ApplicationLogo-fd1fea94.js";
import "@headlessui/react";
import "react-query";
const Services = ({ auth }) => {
  return /* @__PURE__ */ jsxs(Authenticated, { user: auth.user, children: [
    /* @__PURE__ */ jsx(Head, { title: "Verification" }),
    /* @__PURE__ */ jsx("div", { className: "overflow-hidden py-8 sm:py-10", children: /* @__PURE__ */ jsx("div", { className: "mx-auto max-w-7xl px-6 lg:px-8", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2", children: [
      /* @__PURE__ */ jsx("div", { className: "lg:pr-8 lg:pt-4", children: /* @__PURE__ */ jsxs("div", { className: "lg:max-w-lg", children: [
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-3xl font-bold text-gray-300 sm:text-4xl", children: "Unique Work Order Experience" }),
        /* @__PURE__ */ jsx("p", { className: "mt-6 text-lg leading-8 text-gray-400", children: "Carrying out all software projects with high quality and in the fastest time with price guarantee with Semicolon team" }),
        /* @__PURE__ */ jsxs("dl", { className: "mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none", children: [
          /* @__PURE__ */ jsxs("div", { className: "relative pl-9", children: [
            /* @__PURE__ */ jsxs("dt", { className: "inline font-semibold text-gray-300", children: [
              /* @__PURE__ */ jsx(FaUserGraduate, { className: "absolute left-1 top-1 h-5 w-5 text-indigo-600" }),
              "Expert Staff."
            ] }),
            /* @__PURE__ */ jsx("dd", { className: "inline-block text-gray-400", children: "The employees of our team have the necessary expertise in the fields of work for the best quality." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "relative pl-9", children: [
            /* @__PURE__ */ jsxs("dt", { className: "inline font-semibold text-gray-300", children: [
              /* @__PURE__ */ jsx(FaTools, { className: "absolute left-1 top-1 h-5 w-5 text-indigo-600" }),
              "Update Tools"
            ] }),
            /* @__PURE__ */ jsx("dd", { className: "inline-block text-gray-400", children: "In the process of carrying out software projects, the best and most up-to-date tools are used." })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "relative pl-9", children: [
            /* @__PURE__ */ jsxs("dt", { className: "inline font-semibold text-gray-300", children: [
              /* @__PURE__ */ jsx(FaCoins, { className: "absolute left-1 top-1 h-5 w-5 text-indigo-600" }),
              "Guaranteed Price"
            ] }),
            /* @__PURE__ */ jsx("dd", { className: "inline-block text-gray-400", children: "Frequent interaction and correspondence with the employer and delivery of the project with a reasonable and guaranteed price." })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("img", { src: "/images/services-soon.png", className: "animate-snake" })
    ] }) }) })
  ] });
};
export {
  Services as default
};
