import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { H as HeaderLayouts, F as FooterLayout } from "./Footer-c9844f58.js";
import "react";
import "@inertiajs/react";
import "react-icons/fa/index.esm.js";
import "lodash";
const About = ({ auth }) => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(HeaderLayouts, { auth }),
    /* @__PURE__ */ jsxs("div", { className: "relative saturate-50 overflow-hidden bg-gray-900 py-24 sm:py-32", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply",
          alt: "",
          className: "absolute inset-0 -z-10 h-full w-full object-cover object-center md:object-center"
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl",
          "aria-hidden": "true",
          children: /* @__PURE__ */ jsx(
            "div",
            {
              className: "aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20",
              style: {
                clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
              }
            }
          )
        }
      ),
      /* @__PURE__ */ jsx(
        "div",
        {
          className: "absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu",
          "aria-hidden": "true",
          children: /* @__PURE__ */ jsx(
            "div",
            {
              className: "aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20",
              style: {
                clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
              }
            }
          )
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-6 lg:px-8", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex max-w-7x lg:mx-0", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex-row w-1/2", children: [
            /* @__PURE__ */ jsx("h2", { className: "text-4xl font-bold tracking-tight text-gray-200 sm:text-6xl", children: "About Semicolon" }),
            /* @__PURE__ */ jsx("p", { className: "mt-6 text-lg leading-8 text-gray-300 font-serif", children: "Semicolon scientific team was founded by computer students of Yazd University on June 22, 1401. This organization was formed for big goals and implementation of practical ideas in the field of technology in the form of web and application. This group is currently one of the active university teams in the field of software development and is currently registering ideas, this organization is currently a start-up company." })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "flex items-center w-1/2", children: /* @__PURE__ */ jsx(
            "img",
            {
              className: "flex w-1/2 mx-auto animate-bounce",
              src: "images\\semicolon.gif",
              alt: "Semicolon gif"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none", children: [
          /* @__PURE__ */ jsxs("dl", { className: "mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4", children: [
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col-reverse", children: [
              /* @__PURE__ */ jsx("dt", { className: "text-base leading-7 text-gray-300", children: "Team history years" }),
              /* @__PURE__ */ jsx("dd", { className: "text-2xl font-bold leading-9 tracking-tight text-white", children: "1+" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col-reverse", children: [
              /* @__PURE__ */ jsx("dt", { className: "text-base leading-7 text-gray-300", children: "Hours per week" }),
              /* @__PURE__ */ jsx("dd", { className: "text-2xl font-bold leading-9 tracking-tight text-white", children: "40+" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col-reverse", children: [
              /* @__PURE__ */ jsx("dt", { className: "text-base leading-7 text-gray-300", children: "Members of team" }),
              /* @__PURE__ */ jsx("dd", { className: "text-2xl font-bold leading-9 tracking-tight text-white", children: "10+" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex flex-col-reverse", children: [
              /* @__PURE__ */ jsx("dt", { className: "text-base leading-7 text-gray-300", children: "Interest in work" }),
              /* @__PURE__ */ jsx("dd", { className: "text-2xl font-bold leading-9 tracking-tight text-white", children: "Unlimited" })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "mt-10 text-base font-semibold leading-7 text-white sm:grid-cols-2 md:flex lg:gap-x-10", children: [
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: "#history",
                className: "text-lg hover:text-gray-200",
                children: [
                  "History of team formation",
                  " ",
                  /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "→" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: "#future",
                className: "text-lg hover:text-gray-200",
                children: [
                  "Future vision ",
                  /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "→" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: "#service",
                className: "text-lg hover:text-gray-200",
                children: [
                  "Semicolon services",
                  " ",
                  /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "→" })
                ]
              }
            ),
            /* @__PURE__ */ jsxs(
              "a",
              {
                href: "#value",
                className: "text-lg hover:text-gray-200",
                children: [
                  "Our core values",
                  " ",
                  /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "→" })
                ]
              }
            )
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "container-fluid flex-row mt-20 pt-10", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex-row mt-10", id: "history", children: [
          /* @__PURE__ */ jsx("h3", { className: "flex justify-start text-gray-100 uppercase", children: "History" }),
          /* @__PURE__ */ jsx("div", { className: "flex justify-start", children: /* @__PURE__ */ jsx("hr", { className: "my-2 border-gray-500 w-1/2" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex px-3 py-10 h-1/4 text-gray-200 rounded backdrop-saturate-150 shadow-2xl backdrop-blur-md", children: [
          /* @__PURE__ */ jsx("div", { className: "order-1 items-center w-1/3 my-auto", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: "images/about/history.png",
              className: "flex w-1/3 mx-auto animate-snake"
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "order-2 text-center my-auto items-center text-lg font-serif w-2/3", children: "Semicolon scientific-student team was founded and formed on June 22, 2022, this organization was formed for big goals and implementation of practical ideas in the field of technology in the form of web and app." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex-row mt-20 pt-16", id: "future", children: [
          /* @__PURE__ */ jsx("h3", { className: "flex justify-end text-gray-100 uppercase", children: "Future Vision" }),
          /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx("hr", { className: "my-2 border-gray-300 w-1/2" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex px-3 py-10 h-1/4 text-gray-200 rounded backdrop-saturate-150 shadow-2xl backdrop-blur-md", children: [
          /* @__PURE__ */ jsx("div", { className: "order-2 text-center w-1/3", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: "images/about/future.png",
              className: "flex w-1/3 mx-auto animate-snake"
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "order-1 text-center my-auto items-center text-lg font-serif w-2/3", children: "At Semikalon, we are looking for big and practical and smart goals. Our future vision is reflected in the horizons of the world and the exchange and management of big data. We are researching and developing different parts of the team so that we can improve the quality of our response." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex-row mt-10 pt-16", id: "service", children: [
          /* @__PURE__ */ jsx("h3", { className: "flex justify-start text-gray-100 uppercase", children: "Services" }),
          /* @__PURE__ */ jsx("div", { className: "flex justify-start", children: /* @__PURE__ */ jsx("hr", { className: "my-2 border-gray-500 w-1/2" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex px-3 py-10 h-1/4 text-gray-200 rounded backdrop-saturate-150 shadow-2xl backdrop-blur-md", children: [
          /* @__PURE__ */ jsx("div", { className: "order-1 text-center w-1/3", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: "images/about/service.png",
              className: "flex w-1/3 mx-auto animate-snake"
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "order-2 text-center my-auto items-center text-lg font-serif w-2/3", children: "Our services include web-based software development, server and host management, analysis and design of database scenarios, game creation and data analysis using artificial intelligence algorithms. Our experts are constantly updating themselves in all these fields." })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex-row mt-20 pt-16", id: "value", children: [
          /* @__PURE__ */ jsx("h3", { className: "flex justify-end text-gray-100 uppercase", children: "Core Values" }),
          /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx("hr", { className: "my-2 border-gray-300 w-1/2" }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex px-3 py-10 h-1/4 text-gray-200 rounded backdrop-saturate-150 shadow-2xl backdrop-blur-md", children: [
          /* @__PURE__ */ jsx("div", { className: "order-2 text-center w-1/3", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: "images/about/hand.png",
              className: "flex w-1/3 mx-auto animate-snake"
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "order-1 text-center my-auto items-center text-lg font-serif w-2/3", children: "Our collection is to truly serve our customers by empowering, listening and collaborating with other stackers. Also, communicate openly and honestly both inside and outside the company. Encourage transparency in others by being empathetic, trustworthy, and acting with integrity." })
        ] })
      ] })
    ] }),
    /* @__PURE__ */ jsx(FooterLayout, {})
  ] });
};
export {
  About as default
};
