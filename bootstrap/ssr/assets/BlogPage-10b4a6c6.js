import { jsx, Fragment, jsxs } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { FaEye, FaHeart, FaRegHeart, FaUserCircle } from "react-icons/fa/index.esm.js";
import { isEmpty } from "lodash";
import { a as useAddView, b as useToggleLike } from "./index-72e73b3b.js";
import "axios";
import "react-query";
const BlogPage = ({ blog }) => {
  const [ipAddress, setAddress] = useState(window.location.hostname);
  const [isLiked, setIsLiked] = useState(
    !isEmpty(blog.likes) ? blog.likes.some((like) => like.ip_address == ipAddress) : false
  );
  const [likes, setLikes] = useState(blog.like);
  const handleClickLike = () => {
    try {
      useToggleLike(blog.id);
      setLikes(isLiked ? likes - 1 : likes + 1);
      setIsLiked(!isLiked);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    const previousView = !isEmpty(blog.viewers) ? blog.viewers.find((viewer) => viewer.ip === ipAddress) : null;
    if (isEmpty(previousView))
      useAddView(ipAddress, blog.id);
  }, []);
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "container-fluid bg-gray-900", children: [
    /* @__PURE__ */ jsxs(
      "button",
      {
        type: "button",
        className: "flex text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-2.5 py-1.5 text-center inline-flex items-center mr-2 my-2 mx-3",
        onClick: () => window.history.back(),
        children: [
          /* @__PURE__ */ jsx(
            "svg",
            {
              className: "w-5 h-5 rotate-180 mr-1",
              "aria-hidden": "true",
              xmlns: "http://www.w3.org/2000/svg",
              fill: "none",
              viewBox: "0 0 14 10",
              children: /* @__PURE__ */ jsx(
                "path",
                {
                  stroke: "currentColor",
                  strokeLinecap: "round",
                  strokeLinejoin: "round",
                  strokeWidth: 2,
                  d: "M1 5h12m0 0L9 1m4 4L9 9"
                }
              )
            }
          ),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Icon description" }),
          "Back to",
          " ",
          JSON.parse(localStorage.getItem("filter")) || "all",
          " blogs"
        ]
      }
    ),
    /* @__PURE__ */ jsxs("div", { className: "pt-1 px-5", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex mt-0", children: [
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex-row px-3 w-1/2",
            style: { height: "92vh" },
            children: [
              /* @__PURE__ */ jsx(
                "img",
                {
                  src: `${isEmpty(blog.image) ? "/images/altBlogImage.jpg" : `${location.origin}/storage/${blog.image}`}`,
                  alt: "Blog Image",
                  className: "shadow-inner shadow-3xl h-6/7 w-full rounded-lg"
                }
              ),
              /* @__PURE__ */ jsxs("div", { className: "flex justify-between w-1/2 h-1/7 px-3 py-3", children: [
                /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
                  /* @__PURE__ */ jsx(FaEye, { className: "mx-1 text-2xl text-gray-300" }),
                  /* @__PURE__ */ jsx("b", { className: "text-gray-400", children: blog.view })
                ] }),
                /* @__PURE__ */ jsxs(
                  "button",
                  {
                    className: "flex items-center p-2",
                    onClick: handleClickLike,
                    children: [
                      isLiked ? /* @__PURE__ */ jsx(FaHeart, { className: "mx-1 text-2xl text-red-500 animate-ping-once" }) : /* @__PURE__ */ jsx(FaRegHeart, { className: "mx-1 text-2xl text-red-500" }),
                      " ",
                      /* @__PURE__ */ jsx("b", { className: "text-gray-400", children: likes })
                    ]
                  }
                )
              ] })
            ]
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "flex-row mt-10 px-3 py-2 w-1/2 h-6/7", children: [
          /* @__PURE__ */ jsx("h1", { className: "flex text-4xl font-bold tracking-tight text-gray-200 sm:text-5xl pb-5", children: /* @__PURE__ */ jsx("strong", { children: blog.title }) }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center font-mono text-lg text-neutral-400", children: [
            isEmpty(blog.user.image) ? /* @__PURE__ */ jsx(
              FaUserCircle,
              {
                className: `mr-2 text-5xl ${blog.user.isAdmin == 1 && "text-amber-500"}`
              }
            ) : /* @__PURE__ */ jsx(
              "img",
              {
                src: `${location.origin}/storage/${blog.user.image}`,
                className: "rounded-full h-10 w-10 mr-2 "
              }
            ),
            /* @__PURE__ */ jsx("h2", { className: "text-2xl hover:text-blue-500", children: /* @__PURE__ */ jsx(
              "a",
              {
                href: route(
                  "showUser",
                  btoa(blog.user.id)
                ),
                rel: "noopener noreferrer",
                onClick: (e) => e.stopPropagation(),
                target: "_blank",
                as: "a",
                children: blog.user.name
              }
            ) })
          ] }),
          !isEmpty(blog.category) && /* @__PURE__ */ jsxs("div", { className: "mt-5", children: [
            /* @__PURE__ */ jsx("h2", { className: "font-mono text-gray-200 text-xl", children: "Category" }),
            /* @__PURE__ */ jsx("div", { className: "flex border border-gray-300 rounded-lg my-2" }),
            /* @__PURE__ */ jsx("div", { className: "flex rounded px-3 py-1 text-4xl font-semibold text-gray-300", children: /* @__PURE__ */ jsx("div", { className: "flex", children: blog.category.name }) })
          ] }),
          !isEmpty(blog.labels) && /* @__PURE__ */ jsxs("div", { className: "mt-5", children: [
            /* @__PURE__ */ jsx("h2", { className: "font-mono text-gray-200 text-xl", children: "Labels" }),
            /* @__PURE__ */ jsx("div", { className: "flex border border-gray-300 rounded-lg my-2" }),
            /* @__PURE__ */ jsx("div", { className: "px-4 pt-1 pb-1 h-2/7", children: blog.labels.map((label) => {
              return /* @__PURE__ */ jsxs("span", { className: "inline-block bg-gray-500 rounded-full mx-3 px-4 py-2 text-lg font-semibold text-gray-200", children: [
                "#",
                label.name
              ] });
            }) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "flex px-3", children: /* @__PURE__ */ jsx("p", { className: "font-semibold text-gray-300 text-2xl pb-10 tracking-normal leading-relaxed capitalize", children: blog.body }) })
    ] })
  ] }) });
};
export {
  BlogPage as default
};
