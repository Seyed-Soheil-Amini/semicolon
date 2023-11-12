import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import "react";
import { usePage, Head, Link } from "@inertiajs/react";
import { FaUserCircle } from "react-icons/fa/index.esm.js";
import { isEmpty } from "lodash";
const HeaderLayouts = ({ auth }) => {
  const { url, component } = usePage();
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Head, { children: [
      /* @__PURE__ */ jsx("meta", { name: "keywords", content: "" }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: "" }),
      /* @__PURE__ */ jsx("meta", { name: "author", content: "Seyed Soheil Amini" }),
      /* @__PURE__ */ jsx("meta", { charSet: "utf-8" }),
      /* @__PURE__ */ jsx("meta", { httpEquiv: "X-UA-Compatible", content: "IE=edge" }),
      /* @__PURE__ */ jsx(
        "meta",
        {
          name: "viewport",
          content: "width=device-width, initial-scale=1.0, shrink-to-fit=no"
        }
      ),
      /* @__PURE__ */ jsx(
        "link",
        {
          rel: "stylesheet",
          type: "text/css",
          href: "css/bootstrap.css"
        }
      ),
      /* @__PURE__ */ jsx("link", { href: "css/style.css", rel: "stylesheet" }),
      /* @__PURE__ */ jsx("link", { href: "css/responsive.css", rel: "stylesheet" }),
      /* @__PURE__ */ jsx(
        "link",
        {
          rel: "stylesheet",
          type: "text/css",
          href: "https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.1.3/assets/owl.carousel.min.css"
        }
      ),
      /* @__PURE__ */ jsx(
        "link",
        {
          rel: "icon",
          type: "image/jpg",
          href: "/images/semicolon.jpg"
        }
      ),
      /* @__PURE__ */ jsx(
        "link",
        {
          rel: "stylesheet",
          href: "https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
        }
      ),
      /* @__PURE__ */ jsx("title", { children: "Semicolon" })
    ] }),
    /* @__PURE__ */ jsx("header", { className: "bg-gray-950 d-flex justify-content-between header_section fixed-top w-100 h-14 shadow-lg", children: /* @__PURE__ */ jsx("div", { className: "container pt-0", children: /* @__PURE__ */ jsxs("nav", { className: "navbar navbar-expand-lg custom_nav-container pt-0", children: [
      /* @__PURE__ */ jsxs("div", { className: "w-25", children: [
        /* @__PURE__ */ jsxs("a", { className: "navbar-brand mr-5", href: "/", children: [
          /* @__PURE__ */ jsx("img", { src: "images/Layer_2.svg", alt: "" }),
          /* @__PURE__ */ jsx("span", { children: "Semicolon" })
        ] }),
        /* @__PURE__ */ jsx(
          "button",
          {
            className: "navbar-toggler",
            type: "button",
            "data-toggle": "collapse",
            "data-target": "#navbarSupportedContent",
            "aria-controls": "navbarSupportedContent",
            "aria-expanded": "false",
            "aria-label": "Toggle navigation",
            children: /* @__PURE__ */ jsx("span", { className: "navbar-toggler-icon" })
          }
        )
      ] }),
      /* @__PURE__ */ jsx("div", { className: "w-50 mx-auto nav nav-item d-flex flex-col flex-lg-row align-items-center", children: /* @__PURE__ */ jsxs("ul", { className: "navbar-nav", children: [
        /* @__PURE__ */ jsx("li", { className: "nav-item active", children: /* @__PURE__ */ jsxs(
          Link,
          {
            className: `nav-link ${url === "/" && "active"}`,
            href: "/",
            children: [
              "Home",
              " ",
              /* @__PURE__ */ jsx("span", { className: "sr-only", children: "(current)" })
            ]
          }
        ) }),
        /* @__PURE__ */ jsx("li", { className: "nav-item", children: /* @__PURE__ */ jsx(
          Link,
          {
            className: `nav-link ${url === "/about" && "active"}`,
            href: "/about",
            children: "About"
          }
        ) }),
        /* @__PURE__ */ jsx("li", { className: "nav-item", children: /* @__PURE__ */ jsx(
          Link,
          {
            className: `nav-link ${url === "/blog" && "active"}`,
            href: "/blog",
            children: "Blog"
          }
        ) }),
        /* @__PURE__ */ jsx("li", { className: "nav-item", children: /* @__PURE__ */ jsx(
          Link,
          {
            className: `nav-link ${url === "/contactus" && "active"}`,
            href: "/contactus",
            children: "Contact us"
          }
        ) })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "flex justify-end w-25 right-0 text-right", children: auth.user ? /* @__PURE__ */ jsx(
        Link,
        {
          href: route("dashboard"),
          className: "flex justify-content-end font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white",
          children: isEmpty(auth.user.image) ? /* @__PURE__ */ jsx(
            FaUserCircle,
            {
              className: `mr-2 text-3xl ${auth.user.isAdmin == 1 && "text-amber-500"}`
            }
          ) : /* @__PURE__ */ jsx(
            "img",
            {
              src: `${location.origin}/storage/${auth.user.image}`,
              className: "rounded-full h-10 w-10 mr-2 "
            }
          )
        }
      ) : /* @__PURE__ */ jsxs(Fragment, { children: [
        /* @__PURE__ */ jsx(
          Link,
          {
            href: route("register"),
            className: "mr-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500",
            children: "Register"
          }
        ),
        /* @__PURE__ */ jsx(
          Link,
          {
            href: route("login"),
            className: "font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500",
            children: "login"
          }
        )
      ] }) })
    ] }) }) })
  ] });
};
const HeaderLayouts$1 = HeaderLayouts;
const FooterLayout = () => {
  return /* @__PURE__ */ jsx("section", { className: "container-fluid footer_section", children: /* @__PURE__ */ jsx("p", { children: "Copyright © 2022 All Rights Reserved By Semicolon." }) });
};
const FooterLayout$1 = FooterLayout;
export {
  FooterLayout$1 as F,
  HeaderLayouts$1 as H
};
