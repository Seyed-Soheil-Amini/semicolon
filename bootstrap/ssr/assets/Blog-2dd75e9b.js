import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { H as HeaderLayouts, F as FooterLayout } from "./Footer-c9844f58.js";
import InfiniteScroll from "react-infinite-scroll-component";
import { u as useRandomBlogs } from "./index-72e73b3b.js";
import { isEmpty } from "lodash";
import { Link } from "@inertiajs/react";
import TextTruncate from "react-text-truncate";
import { FaTags, FaUserCircle, FaEye, FaHeart } from "react-icons/fa/index.esm.js";
import Fuse from "fuse.js";
import "axios";
import "react-query";
function BlogLink({ active = false, className = "", children, ...props }) {
  return /* @__PURE__ */ jsx(
    Link,
    {
      ...props,
      className: "transition duration-150 ease-in-out focus:outline-none " + (active ? "border-indigo-400 dark:border-indigo-600 focus:border-indigo-700 " : "border-transparent") + className,
      children
    }
  );
}
const RandomBlogCard = ({ blog }) => {
  return /* @__PURE__ */ jsxs(
    BlogLink,
    {
      className: "w-full h-100 rounded-lg border-b-2 border-stone-500 border-solid relative shadow-3xl cursor-pointer",
      href: route("showBlog", btoa(blog.id)),
      children: [
        /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden w-full rounded-md bg-gray-200 h-60", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: `${isEmpty(blog.image) ? "/images/altBlogImage.jpg" : `${location.origin}/storage/${blog.image}`}`,
              alt: "Blog Image",
              className: "object-center h-100 w-100"
            }
          ),
          !isEmpty(blog.category) && /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 m-2 bg-gray-300 rounded px-3 py-1 text-sm font-semibold text-gray-700", children: /* @__PURE__ */ jsxs("div", { className: "flex", children: [
            /* @__PURE__ */ jsx(
              FaTags,
              {
                className: "flex text-center my-auto mr-1",
                "aria-hidden": "true"
              }
            ),
            blog.category.name
          ] }) })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "mt-3 row justify-between", children: /* @__PURE__ */ jsxs("div", { className: "flex-row px-6 w-full h-full", children: [
          /* @__PURE__ */ jsx("h3", { className: "text-md text-gray-200 font-bold text-left", children: blog.title }),
          !isEmpty(blog.user) && /* @__PURE__ */ jsxs("div", { className: "flex items-center font-mono text-lg text-neutral-400", children: [
            isEmpty(blog.user.image) ? /* @__PURE__ */ jsx(
              FaUserCircle,
              {
                className: `mr-2 text-3xl ${blog.user.isAdmin == 1 && "text-amber-500"}`
              }
            ) : /* @__PURE__ */ jsx(
              "img",
              {
                src: `${location.origin}/storage/${blog.user.image}`,
                className: "rounded-full h-10 w-10 mr-2 "
              }
            ),
            /* @__PURE__ */ jsx(
              "a",
              {
                href: route("showUser", btoa(blog.user.id)),
                rel: "noopener noreferrer",
                onClick: (e) => e.stopPropagation(),
                target: "_blank",
                as: "a",
                children: blog.user.name
              }
            )
          ] }),
          /* @__PURE__ */ jsx("p", { className: "flex mt-1 text-sm text-gray-400 py-1", children: /* @__PURE__ */ jsx(
            TextTruncate,
            {
              line: 3,
              element: "span",
              truncateText: "...",
              text: blog.body,
              textTruncateChild: /* @__PURE__ */ jsx("a", { children: "Read more" })
            }
          ) })
        ] }) }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between w-1/2 px-3 py-2 mb-2", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx(FaEye, { className: "mx-1 text-lg text-gray-300" }),
            /* @__PURE__ */ jsx("b", { className: "text-gray-400 text-sm", children: blog.view })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx(FaHeart, { className: "mx-1 text-lg text-red-500 animate-pulse" }),
            /* @__PURE__ */ jsx("b", { className: "text-gray-400 text-sm", children: blog.like })
          ] })
        ] })
      ]
    }
  );
};
const LoadingSkeleton = () => {
  return /* @__PURE__ */ jsxs(
    "div",
    {
      role: "status",
      className: "max-w-sm p-4 shadow-3xl border-b-2 rounded shadow animate-pulse md:p-6 border-gray-600",
      children: [
        /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center h-48 mb-4 bg-gray-300 rounded dark:bg-gray-700", children: /* @__PURE__ */ jsxs(
          "svg",
          {
            className: "w-10 h-10 text-gray-200 dark:text-gray-600",
            "aria-hidden": "true",
            xmlns: "http://www.w3.org/2000/svg",
            fill: "currentColor",
            viewBox: "0 0 16 20",
            children: [
              /* @__PURE__ */ jsx("path", { d: "M14.066 0H7v5a2 2 0 0 1-2 2H0v11a1.97 1.97 0 0 0 1.934 2h12.132A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.934-2ZM10.5 6a1.5 1.5 0 1 1 0 2.999A1.5 1.5 0 0 1 10.5 6Zm2.221 10.515a1 1 0 0 1-.858.485h-8a1 1 0 0 1-.9-1.43L5.6 10.039a.978.978 0 0 1 .936-.57 1 1 0 0 1 .9.632l1.181 2.981.541-1a.945.945 0 0 1 .883-.522 1 1 0 0 1 .879.529l1.832 3.438a1 1 0 0 1-.031.988Z" }),
              /* @__PURE__ */ jsx("path", { d: "M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.98 2.98 0 0 0 .13 5H5Z" })
            ]
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-48 mb-2" }),
        /* @__PURE__ */ jsxs("div", { className: "flex items-center mb-3", children: [
          /* @__PURE__ */ jsx(
            "svg",
            {
              className: "w-10 h-10 text-gray-200 dark:text-gray-700 mx-2",
              "aria-hidden": "true",
              xmlns: "http://www.w3.org/2000/svg",
              fill: "currentColor",
              viewBox: "0 0 20 20",
              children: /* @__PURE__ */ jsx("path", { d: "M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z" })
            }
          ),
          /* @__PURE__ */ jsx("div", { className: "h-2.5 bg-gray-200 rounded-full dark:bg-gray-700 w-32" })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" }),
        /* @__PURE__ */ jsx("div", { className: "h-2 bg-gray-200 rounded-full dark:bg-gray-700 mb-2.5" }),
        /* @__PURE__ */ jsx("div", { className: "h-2 bg-gray-200 rounded-full dark:bg-gray-700" }),
        /* @__PURE__ */ jsx("div", { className: "flex items-center mt-4 space-x-3" }),
        /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Loading..." })
      ]
    }
  );
};
const Blog = ({ auth }) => {
  const [filter, setFilter] = useState(() => {
    return JSON.parse(localStorage.getItem("filter")) || "all";
  });
  const {
    data: blogs,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading
  } = useRandomBlogs(filter);
  const [searchBlog, setSearchBlog] = useState();
  const [suitableArrayBlogToSearch, setSuitableArrayBlogToSearch] = useState(
    []
  );
  useEffect(() => {
    if (!isEmpty(blogs)) {
      const combinedBlogs = blogs.pages.flatMap((page) => page.data);
      setSuitableArrayBlogToSearch(combinedBlogs);
    }
  }, [blogs]);
  const optionsFuseAlogrithm = {
    keys: ["title"],
    threshold: 0.3
  };
  const fuse = new Fuse(suitableArrayBlogToSearch, optionsFuseAlogrithm);
  const handleSearchBlogChange = (event) => {
    setSearchBlog(event.target.value);
  };
  const handleFilterChange = (newFilter) => {
    localStorage.setItem("filter", JSON.stringify(newFilter));
    setFilter(newFilter);
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    " ",
    /* @__PURE__ */ jsx(HeaderLayouts, { auth }),
    /* @__PURE__ */ jsx("div", { className: "bg-gray-900 pt-16 sm:pt-20", children: isLoading ? /* @__PURE__ */ jsx("div", { className: "h-full mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-5 lg:max-w-7xl lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "flex-col mt-0 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8", children: [...Array(6)].map((_, index) => /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(LoadingSkeleton, {}) }, index)) }) }) : /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between pb-4", children: [
        /* @__PURE__ */ jsx("label", { htmlFor: "table-search", className: "sr-only", children: "Search" }),
        /* @__PURE__ */ jsxs("div", { className: "relative mt-1 mx-8", children: [
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
              className: "block pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
              placeholder: "Search for blogs based on name",
              onChange: handleSearchBlogChange
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mx-auto lg:mx-0", children: [
        /* @__PURE__ */ jsx("nav", { className: "flex justify-start my-1", children: /* @__PURE__ */ jsxs("ul", { className: "flex space-x-4", children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            "button",
            {
              className: `inline-block font-mono ${filter === "all" ? "bg-gray-200 text-gray-700" : "bg-gray-700 text-gray-200"} rounded-full px-3 py-1 text-md font-semibold  hover:bg-gray-200 hover:text-gray-700`,
              onClick: () => handleFilterChange("all"),
              disabled: filter === "all",
              children: "All"
            }
          ) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            "button",
            {
              className: `inline-block font-mono ${filter === "popular" ? "bg-gray-200 text-gray-700" : "bg-gray-700 text-gray-200"} rounded-full px-3 py-1 text-md font-semibold  hover:bg-gray-200 hover:text-gray-700`,
              onClick: () => handleFilterChange("popular"),
              disabled: filter === "popular",
              children: "Popular"
            }
          ) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            "button",
            {
              className: `inline-block font-mono ${filter === "oldest" ? "bg-gray-200 text-gray-700" : "bg-gray-700 text-gray-200"} rounded-full px-3 py-1 text-md font-semibold  hover:bg-gray-200 hover:text-gray-700`,
              onClick: () => handleFilterChange("oldest"),
              disabled: filter === "oldest",
              children: "Oldest"
            }
          ) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
            "button",
            {
              className: `inline-block font-mono ${filter === "newest" ? "bg-gray-200 text-gray-700" : "bg-gray-700 text-gray-200"} rounded-full px-3 py-1 text-md font-semibold  hover:bg-gray-200 hover:text-gray-700`,
              onClick: () => handleFilterChange("newest"),
              disabled: filter === "newest",
              children: "Newest"
            }
          ) })
        ] }) }),
        " "
      ] }),
      /* @__PURE__ */ jsx("div", { className: "mx-auto mt-0 border-t border-gray-200 pt-3 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3 w-full", children: isEmpty(searchBlog) ? !isEmpty(blogs) && /* @__PURE__ */ jsx(
        InfiniteScroll,
        {
          dataLength: blogs.pages.length,
          next: () => fetchNextPage(),
          hasMore: hasNextPage,
          loader: isFetchingNextPage && /* @__PURE__ */ jsx("p", { children: "Loading..." }),
          className: "flex-row",
          children: /* @__PURE__ */ jsx("div", { className: "h-full mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-5 lg:max-w-7xl lg:px-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8", children: blogs.pages.map(
            (page) => page.data.map((blog) => /* @__PURE__ */ jsx(
              RandomBlogCard,
              {
                blog
              },
              blog.id
            ))
          ) })
        }
      ) : /* @__PURE__ */ jsx("div", { className: "h-full mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-5 lg:max-w-7xl lg:px-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8", children: fuse.search(searchBlog).map((res) => /* @__PURE__ */ jsx(
        RandomBlogCard,
        {
          blog: res.item
        },
        res.item.id
      )) }) }),
      " "
    ] }) }),
    /* @__PURE__ */ jsx(FooterLayout, {})
  ] });
};
export {
  Blog as default
};
