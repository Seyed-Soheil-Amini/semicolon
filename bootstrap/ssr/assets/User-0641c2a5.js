import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { Head } from "@inertiajs/react";
import { isEmpty } from "lodash";
import "react";
const User = ({ user, favoriteCategory }) => {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsxs(Head, { children: [
      /* @__PURE__ */ jsx("meta", { name: "keywords", content: user.job_title }),
      /* @__PURE__ */ jsx("meta", { name: "description", content: user.about }),
      /* @__PURE__ */ jsx("meta", { name: "author", content: user.name }),
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
      /* @__PURE__ */ jsx("title", { children: user.name })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "max-w-6xl flex items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0", children: /* @__PURE__ */ jsxs(
      "div",
      {
        id: "profile",
        className: "flex justify-between w-full lg:w-6.5/7 rounded-lg shadow-2xl bg-white opacity-75 mx-auto h-4/7",
        children: [
          /* @__PURE__ */ jsxs("div", { className: "p-4 md:p-12 w-3/5 text-center lg:text-left", children: [
            /* @__PURE__ */ jsx(
              "div",
              {
                className: "block lg:hidden rounded-full shadow-xl mx-auto -mt-16 h-48 w-48 bg-cover bg-center",
                style: {
                  backgroundImage: 'url("https://source.unsplash.com/MP0IUfwrn0A")'
                }
              }
            ),
            /* @__PURE__ */ jsx("h1", { className: "text-4xl font-sans pt-8 lg:pt-0 text-gray-500", children: /* @__PURE__ */ jsx("b", { children: user.name }) }),
            /* @__PURE__ */ jsx("div", { className: "mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-orange-500 opacity-25" }),
            /* @__PURE__ */ jsxs("p", { className: "pt-2 text-2xl font-bold flex items-center justify-center lg:justify-start", children: [
              /* @__PURE__ */ jsx(
                "svg",
                {
                  className: "h-8 fill-current text-orange-500 pr-4",
                  xmlns: "http://www.w3.org/2000/svg",
                  viewBox: "0 0 20 20",
                  children: /* @__PURE__ */ jsx("path", { d: "M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" })
                }
              ),
              " ",
              user.job_title
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-md", children: "Favorite Category" }),
              /* @__PURE__ */ jsx("div", { className: "mx-auto lg:mx-0 pt-1 w-4/5 border-b-2 border-orange-500 opacity-25" }),
              /* @__PURE__ */ jsx("p", { className: "pt-1 text-xl font-medium text-gray-500", children: isEmpty(favoriteCategory) ? "All Category" : favoriteCategory.name })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "mt-4", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-md", children: "Biography" }),
              /* @__PURE__ */ jsx("div", { className: "mx-auto lg:mx-0 pt-1 w-4/5 border-b-2 border-orange-500 opacity-25" }),
              /* @__PURE__ */ jsx("p", { className: "pt-2 text-sm font-serif text-gray-500", children: isEmpty(user.about) ? "Author of Semicolon Weblog" : user.about })
            ] })
          ] }),
          /* @__PURE__ */ jsx("div", { className: " bg-gray-300 w-2/5 rounded-lg p-5 ", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: `${isEmpty(user.image) ? "/images/altUserImage.jpg" : `${location.origin}/storage/${user.image}`}`,
              className: "rounded-lg shadow-2xl h-full w-full"
            }
          ) })
        ]
      }
    ) })
  ] });
};
export {
  User as default
};
