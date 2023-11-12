import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { useState, useEffect } from "react";
import { A as Authenticated } from "./AuthenticatedLayout-9e7d963a.js";
import { p as useGetPendingBlogs, q as useVerifyBlogs, r as useBlockBlogs } from "./index-72e73b3b.js";
import { Head } from "@inertiajs/react";
import { isEmpty } from "lodash";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
/* empty css                   */import { FaTags, FaUserEdit, FaEye, FaHeart } from "react-icons/fa/index.esm.js";
import TextTruncate from "react-text-truncate";
import Modal from "react-modal";
/* empty css                            */import { toast, ToastContainer } from "react-toastify";
import "./ApplicationLogo-fd1fea94.js";
import "@headlessui/react";
import "react-query";
import "axios";
const BlogPreview = (props) => {
  console.log(props);
  return /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
    Modal,
    {
      isOpen: props.isOpen,
      className: "overflow-auto max-h-90vh h-6.5/7 w-4/5 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 rounded-md px-5 py-0 w-400 max-w-full",
      children: /* @__PURE__ */ jsxs("div", { className: "max-h-80vh h-6.5/7 flex-md-row", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-content-around mb-0 mx-auto h-4/7", children: [
          /* @__PURE__ */ jsx("div", { className: "flex h-6/7 w-2/3 mb-3 border-gray-300 rounded mx-auto my-auto text-center text-white", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: `${isEmpty(props.blog.image) ? "/images/altBlogImage.jpg" : `${location.origin}/storage/${props.blog.image}`}`,
              alt: "Blog Image",
              className: "flex mx-auto my-auto h-full w-full rounded-md"
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "flex-row w-1/3 mx-2 my-10", children: [
            /* @__PURE__ */ jsx("div", { className: "flex text-3xl font-bold my-2 text-gray-500", children: /* @__PURE__ */ jsx("h2", { className: "w-2/4", children: props.blog.title }) }),
            /* @__PURE__ */ jsx("div", { className: "flex", children: /* @__PURE__ */ jsxs("div", { className: "flex text-sm items-center px-1 py-2 rounded-md bg-gray-800 text-gray-200", children: [
              /* @__PURE__ */ jsx(FaTags, { className: "mx-1" }),
              props.blog.category.name
            ] }) }),
            /* @__PURE__ */ jsxs("div", { className: "flex my-2 items-center", children: [
              /* @__PURE__ */ jsx(FaUserEdit, { className: "mx-1 text-2xl" }),
              ":",
              " ",
              /* @__PURE__ */ jsx("h2", { className: "text-gray-700 hover:text-blue-500", children: /* @__PURE__ */ jsx(
                "a",
                {
                  href: route(
                    "showUser",
                    props.blog.user.id
                  ),
                  rel: "noopener noreferrer",
                  onClick: (e) => e.stopPropagation(),
                  target: "_blank",
                  as: "a",
                  children: props.blog.user.name
                }
              ) })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "flex my-2 items-center", children: !isEmpty(props.blog.labels) && /* @__PURE__ */ jsxs("div", { className: " pt-1 pb-1 h-2/7", children: [
              /* @__PURE__ */ jsx("h2", { className: "py-1 mb-1", children: "Labels :" }),
              props.blog.labels.map((label) => {
                return /* @__PURE__ */ jsxs("span", { className: "inline-block mx-1 bg-gray-600 rounded-full px-3 py-1 text-sm font-semibold text-gray-100", children: [
                  "#",
                  label.name
                ] });
              })
            ] }) })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between w-1/4 px-3 text-gray-500", children: [
          /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx(FaEye, { className: "mx-1 text-2xl" }),
            /* @__PURE__ */ jsx("b", { children: props.blog.view })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "flex items-center", children: [
            /* @__PURE__ */ jsx(FaHeart, { className: "mx-1 text-2xl" }),
            /* @__PURE__ */ jsx("b", { children: props.blog.like })
          ] })
        ] }),
        /* @__PURE__ */ jsx("div", { className: "my-3 h-2.5/7 text-gray-500", children: /* @__PURE__ */ jsx("p", { className: "h-full w-full px-2 py-2", children: props.blog.body }) }),
        /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(
          "button",
          {
            className: "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded",
            onClick: () => props.onClose(),
            children: "Close"
          }
        ) })
      ] })
    }
  ) });
};
const VerificationCard = (props) => {
  const [preview, setPreview] = useState(false);
  const handleClosePreview = () => {
    setPreview(false);
  };
  return /* @__PURE__ */ jsxs(
    "div",
    {
      className: `flex container-fluid border-b-2 my-4 ${props.checkBox.checked ? "bg-gray-700" : "bg-gray-900"} cursor-pointer rounded-lg`,
      onClick: () => props.onChengeCheckBox(props.blog.id, props.checkBox.checked),
      children: [
        /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row p-3", children: [
          /* @__PURE__ */ jsx("div", { className: "h-40 w-full md:w-1/7 my-2 bg-emerald-500", children: /* @__PURE__ */ jsx(
            "img",
            {
              src: `${isEmpty(props.blog.image) ? "/images/altBlogImage.jpg" : `${location.origin}/storage/${props.blog.image}`}`,
              alt: "Blog Image",
              className: "justify-start object-center lg:h-full lg:w-full"
            }
          ) }),
          /* @__PURE__ */ jsxs("div", { className: "flex flex-col mx-2 w-full md:w-2/7 my-3", children: [
            /* @__PURE__ */ jsx("h1", { className: "px-2 items-center mx-2 text-2xl mt-3 font-weight-bold font-bold", children: props.blog.title }),
            /* @__PURE__ */ jsxs("h4", { className: "px-3 items-center mx-2 text-md mt-4 text-gray-400", children: [
              "Author: ",
              props.blog.user.name
            ] }),
            /* @__PURE__ */ jsx("div", { className: "px-2 flex items-center mx-2 mt-3", children: /* @__PURE__ */ jsxs("div", { className: "flex text-sm items-center px-1 py-2 rounded-md bg-gray-200 text-gray-800", children: [
              /* @__PURE__ */ jsx(FaTags, { className: "mx-1" }),
              props.blog.category.name
            ] }) })
          ] }),
          /* @__PURE__ */ jsx("div", { className: "w-full md:w-3/7 my-auto", children: /* @__PURE__ */ jsx("p", { className: "px-2 items-center mx-4", children: /* @__PURE__ */ jsx(
            TextTruncate,
            {
              line: 5,
              element: "span",
              truncateText: "...",
              text: props.blog.body,
              textTruncateChild: /* @__PURE__ */ jsx("a", { children: "Read more" })
            }
          ) }) })
        ] }),
        /* @__PURE__ */ jsxs("div", { className: "justify-end mt-3", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              class: "flex p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-gray-950 dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800",
              onClick: () => setPreview(true),
              children: /* @__PURE__ */ jsx("span", { class: "px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0", children: /* @__PURE__ */ jsx(FaEye, { className: "text-xl" }) })
            }
          ),
          " "
        ] }),
        preview && /* @__PURE__ */ jsx(
          BlogPreview,
          {
            blog: props.blog,
            isOpen: true,
            onClose: handleClosePreview
          }
        )
      ]
    }
  );
};
const Verification = ({ auth }) => {
  const {
    data: blogs,
    isLoading,
    isFetching,
    isSuccess,
    isRefetching
  } = useGetPendingBlogs();
  const { data: verified, mutateAsync: verify } = useVerifyBlogs();
  const { data: blocked, mutateAsync: block } = useBlockBlogs();
  const [checkedItems, setCheckedItems] = useState([]);
  useEffect(() => {
    !isLoading && setCheckedItems(
      blogs.map((blog) => ({ id: blog.id, checked: false }))
    );
  }, [isLoading]);
  useEffect(() => {
    isRefetching ? toast.loading("Receiveing the new data...", {
      toastId: "loading"
    }) : toast.dismiss("loading");
  }, [isRefetching]);
  const handleCheckboxChange = (id, newState) => {
    setCheckedItems(() => {
      return checkedItems.map((item) => {
        return item.id == id ? { id: item.id, checked: !newState } : item;
      });
    });
  };
  const handleClickVerify = () => {
    const arrayIds = checkedItems.filter((blog) => blog.checked).map((blog) => blog.id);
    try {
      toast.promise(async () => await Promise.resolve(verify(arrayIds)), {
        pending: "Verifing...",
        success: {
          render() {
            !isLoading && setCheckedItems(
              blogs.map((blog) => ({
                id: blog.id,
                checked: false
              }))
            );
            return "Blogs are verified successfully.";
          }
        },
        error: {
          render({ data }) {
            if (data.response && data.response.status === 400) {
              return "Blog not found";
            } else {
              return "Unfortunately, there is a problem in the process of publishing the blog.";
            }
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleClickBlock = () => {
    const arrayIds = checkedItems.filter((blog) => blog.checked).map((blog) => blog.id);
    try {
      toast.promise(async () => await Promise.resolve(block(arrayIds)), {
        pending: "Blocking...",
        success: {
          render() {
            !isLoading && setCheckedItems(
              blogs.map((blog) => ({
                id: blog.id,
                checked: false
              }))
            );
            return "Blogs are blocked successfully.";
          }
        },
        error: {
          render({ data }) {
            if (data.response && data.response.status === 400) {
              return "Blog not found";
            } else {
              return "Unfortunately, there is a problem in the process of blocking the blog.";
            }
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleCancleClick = () => {
    setCheckedItems(
      blogs.map((blog) => ({
        id: blog.id,
        checked: false
      }))
    );
  };
  return /* @__PURE__ */ jsxs(Authenticated, { user: auth.user, children: [
    /* @__PURE__ */ jsx(Head, { title: "Verification" }),
    /* @__PURE__ */ jsx(ToastContainer, { position: "top-center" }),
    !isLoading ? /* @__PURE__ */ jsx("div", { className: "container-fluid flex min-h-screen", children: !isEmpty(blogs) && !isEmpty(checkedItems) ? /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs("div", { className: "text-gray-200 grid grid-cols-1 gap-4 my-4 px-3 py-5 rounded w-6.5/7 mx-auto h-1/5", children: [
      !checkedItems.every(
        (el) => el.checked === false
      ) && /* @__PURE__ */ jsxs("div", { className: "flex", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex justify-between w-1/6", children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              class: "text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800",
              onClick: handleClickVerify,
              children: "Verify"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              class: "text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900",
              onClick: handleClickBlock,
              children: "Block"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex justify-end w-6/7", children: /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            class: "text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2",
            onClick: handleCancleClick,
            children: "Cancle"
          }
        ) })
      ] }),
      /* @__PURE__ */ jsx("ul", { children: blogs.map((blog) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
        VerificationCard,
        {
          blog,
          checkBox: checkedItems.filter(
            (el) => el.id == blog.id
          )[0],
          onChengeCheckBox: handleCheckboxChange
        }
      ) })) })
    ] }) }) : /* @__PURE__ */ jsx("div", { className: "flex items-center w-3/5 mx-auto text-center h-screen", children: /* @__PURE__ */ jsx("h3", { className: "text-gray-200 mx-auto text-4xl", children: "There are no pending blogs." }) }) }) : /* @__PURE__ */ jsx("div", { className: "h-full mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-5 lg:max-w-7xl lg:px-8 mt-10", children: /* @__PURE__ */ jsx("div", { className: "flex-row mt-0 grid gap-y-5 items-center", children: [...Array(6)].map((_, index) => /* @__PURE__ */ jsx(
      "div",
      {
        className: "flex container-fluid bg-gray-900 rounded-lg p-3 justify-between",
        children: /* @__PURE__ */ jsxs(
          SkeletonTheme,
          {
            baseColor: "#171717",
            highlightColor: "#444",
            children: [
              /* @__PURE__ */ jsx(
                Skeleton,
                {
                  className: "flex flex-col md:flex-row",
                  height: 170,
                  width: 200
                }
              ),
              /* @__PURE__ */ jsx("div", { className: "flex-row mx-2 my-10", children: /* @__PURE__ */ jsxs(
                SkeletonTheme,
                {
                  baseColor: "#171717",
                  highlightColor: "#444",
                  children: [
                    /* @__PURE__ */ jsx(
                      Skeleton,
                      {
                        className: "",
                        height: 15,
                        width: 250
                      }
                    ),
                    /* @__PURE__ */ jsx(
                      Skeleton,
                      {
                        className: "",
                        height: 15,
                        width: 250
                      }
                    ),
                    /* @__PURE__ */ jsx(Skeleton, { height: 5, width: 150 }),
                    /* @__PURE__ */ jsx(Skeleton, { height: 20, width: 100 })
                  ]
                }
              ) }),
              /* @__PURE__ */ jsxs("div", { className: "w-full md:w-3/7 my-auto mx-4", children: [
                /* @__PURE__ */ jsx(Skeleton, { height: 5, width: 450 }),
                /* @__PURE__ */ jsx(Skeleton, { height: 5, width: 450 }),
                /* @__PURE__ */ jsx(Skeleton, { height: 5, width: 450 }),
                /* @__PURE__ */ jsx(Skeleton, { height: 5, width: 450 }),
                /* @__PURE__ */ jsx(Skeleton, { height: 5, width: 450 }),
                /* @__PURE__ */ jsx(Skeleton, { height: 5, width: 450 })
              ] }),
              /* @__PURE__ */ jsx("div", { className: "justify-end mt-3", children: /* @__PURE__ */ jsx(Skeleton, { height: 40, width: 80 }) })
            ]
          }
        )
      },
      index
    )) }) })
  ] });
};
export {
  Verification as default
};
