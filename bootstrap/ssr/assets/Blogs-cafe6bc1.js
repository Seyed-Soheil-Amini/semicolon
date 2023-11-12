import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import React, { useState, useEffect, useCallback } from "react";
import TextTruncate from "react-text-truncate";
import { isEmpty } from "lodash";
import { FaTags, FaPen, FaTrashAlt, FaBan, FaPaperPlane, FaEdit, FaBlog } from "react-icons/fa/index.esm.js";
import Modal from "react-modal";
import Select from "react-select";
import { useDropzone } from "react-dropzone";
import { Transition, Dialog } from "@headlessui/react";
import { WithContext } from "react-tag-input";
/* empty css                            */import { ToastContainer, toast } from "react-toastify";
import { c as useUpdateBlog, d as useGetCategories, e as useAllBlogs, f as useDeleteBlog, g as useTogglePublish, h as useCreateBlog } from "./index-72e73b3b.js";
import { useForm } from "react-hook-form";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
/* empty css                   */import { P as PrimaryButton } from "./PrimaryButton-38b01d37.js";
import Fuse from "fuse.js";
import { D as DangerButton } from "./DangerButton-44d86612.js";
import { A as Authenticated } from "./AuthenticatedLayout-9e7d963a.js";
import { Head } from "@inertiajs/react";
import "axios";
import "react-query";
import "./ApplicationLogo-fd1fea94.js";
const BlogCard = (props) => {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col rounded border-2 border-gray-400 relative h-100", children: [
    /* @__PURE__ */ jsxs("div", { className: "relative overflow-hidden w-full rounded-md bg-gray-200 lg:aspect-none h-60", children: [
      /* @__PURE__ */ jsx(
        "img",
        {
          src: `${isEmpty(props.blog.image) ? "/images/altBlogImage.jpg" : `${location.origin}/storage/${props.blog.image}`}`,
          alt: "Blog Image",
          className: "object-center lg:h-full lg:w-full"
        }
      ),
      !isEmpty(props.blog.category) && /* @__PURE__ */ jsx("div", { className: "absolute top-0 left-0 m-2 bg-gray-300 rounded px-3 py-1 text-sm font-semibold text-gray-700", children: /* @__PURE__ */ jsxs("div", { className: "flex", children: [
        /* @__PURE__ */ jsx(
          FaTags,
          {
            className: "flex text-center my-auto mr-1",
            "aria-hidden": "true"
          }
        ),
        props.blog.category.name
      ] }) })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex-grow mt-3 row justify-between h-60", children: /* @__PURE__ */ jsxs("div", { className: "flex-row px-6 w-full h-full", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-md text-gray-200 font-bold", children: props.blog.title }),
      /* @__PURE__ */ jsx("p", { className: "flex mt-1 text-sm text-gray-400 py-1", children: /* @__PURE__ */ jsx(
        TextTruncate,
        {
          line: !isEmpty(props.blog.labels) ? 4 : 8,
          element: "span",
          truncateText: "...",
          text: props.blog.body
        }
      ) }),
      !isEmpty(props.blog.labels) && /* @__PURE__ */ jsx("div", { className: "px-4 pt-1 pb-1 h-2/7", children: props.blog.labels.map((label) => {
        return /* @__PURE__ */ jsxs("span", { className: "inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700", children: [
          "#",
          label.name
        ] });
      }) }),
      (() => {
        if (props.parent === "edit") {
          return /* @__PURE__ */ jsxs("div", { className: "flex justify-between", children: [
            /* @__PURE__ */ jsx(
              "button",
              {
                type: "button",
                className: "text-orange-600 hover:text-white border border-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-500 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-orange-500 dark:text-orange-500 dark:hover:text-white dark:hover:bg-orange-600 dark:focus:ring-orange-900 w-1/4",
                onClick: () => handleEditClick(),
                children: /* @__PURE__ */ jsx(FaPen, { className: "mx-auto" })
              }
            ),
            /* @__PURE__ */ jsx(
              "button",
              {
                className: "text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900 w-1/4",
                onClick: () => props.onClickDelete(props.blog.id),
                children: /* @__PURE__ */ jsx(FaTrashAlt, { className: "mx-auto" })
              }
            )
          ] });
        } else if (props.parent === "publish") {
          return /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: "text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800",
              onClick: () => props.onTogglePublish(props.blog.id),
              children: props.blog.published_at !== null ? "UNPUBLISH" : "PUBLISH"
            }
          ) });
        } else {
          return /* @__PURE__ */ jsx("div", { className: "flex justify-center", children: /* @__PURE__ */ jsx(
            "button",
            {
              className: "text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900 w-1/4",
              onClick: () => props.onClickDelete(props.blog.id),
              children: /* @__PURE__ */ jsx(FaTrashAlt, { className: "mx-auto" })
            }
          ) });
        }
      })()
    ] }) })
  ] });
  function handleEditClick() {
    props.onClickEdit(props.blog);
  }
};
const tailwind = "";
const BlogEditForm = (props) => {
  var _a, _b, _c, _d, _e;
  const [blog, setBlog] = useState({
    id: props.blog.id,
    title: props.blog.title,
    category: {
      value: props.blog.category.id,
      label: props.blog.category.name
    },
    body: props.blog.body,
    image: props.blog.image,
    imageBaseCode: "",
    labels: !isEmpty(props.blog.labels) ? props.blog.labels : []
  });
  useEffect(() => {
    console.log(blog);
  }, [blog]);
  const { data: updatedBlog, mutateAsync: updateBlog } = useUpdateBlog();
  const { data: categories } = useGetCategories();
  const MAX_IMAGE_SIZE = 2 * 1024 * 1024;
  const {
    register,
    formState: { errors },
    handleSubmit: submit
  } = useForm();
  const [disabledDropZone, setDisabledDropZone] = useState(!isEmpty(blog.image));
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState({
    isShow: false,
    message: null,
    success: false,
    data: null
  });
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      handleChange({ name: "imageBaseCode", value: reader.result });
      handleChange({ name: "image", value: file });
      setDisabledDropZone(!disabledDropZone);
    };
    if (file) {
      if (file.size > MAX_IMAGE_SIZE) {
        toast.info(`Image size exceeds the limit (Max size 2MB)`);
        return;
      }
      if (!file.type.startsWith("image/")) {
        toast.info("Only image files are allowed");
        return;
      }
      reader.readAsDataURL(file);
    }
  };
  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    disabled: disabledDropZone
  });
  function handleSubmit(event) {
    setLoading(true);
    try {
      Promise.resolve(updateBlog(blog)).then((response) => {
        setShowPopup({
          isShow: true,
          message: "Blog Was Updated Successfully.",
          data: response.data.data,
          success: true
        });
      });
    } catch (error) {
      setShowPopup({
        isShow: true,
        message: `Blog Was Not Updated Successfully.(error:${error})`,
        data: null,
        success: false
      });
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  const handleChange = (event) => {
    const { name, value } = event;
    setBlog((prevBlog) => {
      return {
        ...prevBlog,
        [name]: value
      };
    });
  };
  const handleCloseAfterSaved = () => {
    props.onSave();
    setShowPopup({
      ...showPopup,
      isShow: false,
      data: null,
      message: null
    });
  };
  const Keys = {
    TAB: 9,
    SPACE: 32,
    ENTER: 13
  };
  const onAddLabel = useCallback(
    (newTag) => {
      setBlog({ ...blog, labels: [...blog.labels, newTag] });
    },
    [blog]
  );
  const onDeleteLabel = useCallback(
    (tagIndex) => {
      setBlog({
        ...blog,
        labels: blog.labels.filter((_, i) => i !== tagIndex)
      });
    },
    [blog]
  );
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(ToastContainer, { position: "top-center" }),
    /* @__PURE__ */ jsx(Transition, { show: showPopup.isShow, as: React.Fragment, children: /* @__PURE__ */ jsx(
      Dialog,
      {
        open: showPopup.isShow,
        onClose: handleCloseAfterSaved,
        className: "fixed z-10 inset-0 overflow-y-auto",
        children: /* @__PURE__ */ jsxs("div", { className: "flex items-center justify-center min-h-screen", children: [
          /* @__PURE__ */ jsx(
            Dialog.Overlay,
            {
              className: "fixed z-10 inset-y-0 bg-zinc-950 bg-opacity-30",
              style: { pointerEvents: "none" }
            }
          ),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: "flex-row z-20 mx-auto bg-opacity-100 w-2/5 h-40 rounded-lg border-4 p-4",
              style: {
                borderColor: showPopup.success ? "#16a34a" : "#b91c1c",
                backgroundColor: showPopup.success ? "#bbf7d0" : "#fecaca"
              },
              children: [
                /* @__PURE__ */ jsx(Dialog.Title, { className: "text-lg font-medium mb-2", children: "Server Message" }),
                /* @__PURE__ */ jsx(Dialog.Description, { className: "text-gray-700 mb-4", children: showPopup.message }),
                /* @__PURE__ */ jsx("div", { className: "flex justify-end", children: /* @__PURE__ */ jsx(
                  "button",
                  {
                    className: "hover:bg-red-400 text-white font-bold py-2 px-3 rounded",
                    onClick: handleCloseAfterSaved,
                    style: {
                      zIndex: 100,
                      pointerEvents: "auto",
                      backgroundColor: showPopup.success ? "#16a34a" : "#b91c1c",
                      ":hover": {
                        backgroundColor: showPopup.success ? "#10b981" : "#ef4444"
                      }
                    },
                    children: "Close"
                  }
                ) })
              ]
            }
          )
        ] })
      }
    ) }),
    /* @__PURE__ */ jsx(
      Modal,
      {
        isOpen: props.isOpen,
        className: " overflow-auto max-h-90vh h-6.5/7 w-4/5 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 rounded-md px-5 py-1 w-400 max-w-full",
        children: /* @__PURE__ */ jsx(
          "form",
          {
            onSubmit: submit(handleSubmit),
            encType: "multipart/form-data",
            className: "flex-md-row h-full w-full fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 rounded-md px-5 py-1 w-400 max-w-full",
            children: /* @__PURE__ */ jsxs("div", { className: "max-h-80vh h-6.5/7 flex-md-row", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-lg font-bold mb-1", children: "Edit Blog" }),
              /* @__PURE__ */ jsxs("div", { className: "flex-row mb-0 mx-auto h-3/7", children: [
                /* @__PURE__ */ jsx(
                  "label",
                  {
                    className: "h-1/7 block text-gray-500 text-md font-bold mb-0 text-center",
                    htmlFor: "file",
                    children: "Image File"
                  }
                ),
                /* @__PURE__ */ jsxs(
                  "div",
                  {
                    className: "flex h-6/7 items-center w-1/2 mb-3 border-dashed border-2 border-gray-300 rounded mx-auto my-auto text-center text-white",
                    ...getRootProps(),
                    children: [
                      /* @__PURE__ */ jsx(
                        "input",
                        {
                          type: "file",
                          name: "image",
                          ...getInputProps()
                        }
                      ),
                      !isEmpty(blog.image) ? /* @__PURE__ */ jsxs(Fragment, { children: [
                        /* @__PURE__ */ jsx(
                          "img",
                          {
                            className: "flex mx-auto my-auto h-full w-4/6",
                            src: isEmpty(blog.imageBaseCode) ? `${location.origin}/storage/${blog.image}` : blog.imageBaseCode,
                            alt: "Selected image preview"
                          }
                        ),
                        /* @__PURE__ */ jsx("div", { className: "absolute h-2/6", children: /* @__PURE__ */ jsx(
                          "button",
                          {
                            className: "align-content-center bg-red-600 px-3 text-2xl rounded-md",
                            onClick: () => {
                              setBlog({
                                ...blog,
                                image: null,
                                imageBaseCode: ""
                              });
                              setDisabledDropZone(
                                !disabledDropZone
                              );
                            },
                            children: "×"
                          }
                        ) })
                      ] }) : /* @__PURE__ */ jsx("p", { className: "mx-auto my-auto text-black", children: "Drag and drop an image here, or click to select a file" })
                    ]
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "flex w-full text-gray-600", children: [
                /* @__PURE__ */ jsxs("div", { className: "mb-1 w-2/4", children: [
                  /* @__PURE__ */ jsx(
                    "label",
                    {
                      htmlFor: "title",
                      className: "block text-gray-500 text-md font-bold mb-1",
                      children: "Title"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "input",
                    {
                      type: "text",
                      id: "title",
                      className: "form-input w-full",
                      value: blog.title,
                      name: "title",
                      required: true,
                      ...register("title", {
                        required: true,
                        maxLength: 80
                      }),
                      "aria-invalid": errors.title ? "true" : "false",
                      onChange: (event) => handleChange({
                        name: "title",
                        value: event.target.value
                      })
                    }
                  ),
                  ((_a = errors.title) == null ? void 0 : _a.type) === "required" && /* @__PURE__ */ jsx("p", { role: "alert", className: "text-red-500", children: "* Title is required" }),
                  ((_b = errors.title) == null ? void 0 : _b.type) === "maxLength" && /* @__PURE__ */ jsx("p", { role: "alert", className: "text-red-500", children: "* Length of title is more than standard limit(16000 characters)" })
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "ml-6 w-2/4", children: [
                  /* @__PURE__ */ jsx(
                    "label",
                    {
                      className: "block text-gray-500 text-md font-bold mb-1",
                      htmlFor: "category",
                      children: "Category"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    Select,
                    {
                      className: "appearance-none border rounded bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
                      id: "category",
                      value: blog.category,
                      name: "category",
                      options: categories,
                      onChange: (event) => handleChange({
                        name: "category",
                        value: event
                      })
                    }
                  )
                ] })
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "mb-1 h-2/7 text-gray-600", children: [
                /* @__PURE__ */ jsx(
                  "label",
                  {
                    htmlFor: "content",
                    className: "block text-gray-500 text-md font-bold mb-1",
                    children: "Body"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "textarea",
                  {
                    id: "content",
                    className: "form-textarea h-full w-full",
                    value: blog.body,
                    name: "body",
                    required: true,
                    ...register("body", {
                      required: true,
                      maxLength: 16e3,
                      minLength: 120
                    }),
                    "aria-invalid": errors.body ? "true" : "false",
                    onChange: (event) => handleChange({
                      name: "body",
                      value: event.target.value
                    })
                  }
                ),
                ((_c = errors.body) == null ? void 0 : _c.type) === "required" && /* @__PURE__ */ jsx("p", { role: "alert", className: "text-red-500", children: "* Context is required" }),
                ((_d = errors.body) == null ? void 0 : _d.type) === "maxLength" && /* @__PURE__ */ jsx("p", { role: "alert", className: "text-red-500", children: "* Length of context is more than standard limit(16000 characters)" }),
                ((_e = errors.body) == null ? void 0 : _e.type) === "minLength" && /* @__PURE__ */ jsx("p", { role: "alert", className: "text-red-500", children: "* Length of context is less than standard limit(min 80 characters)" }),
                /* @__PURE__ */ jsxs("div", { className: "shadow appearance-none border rounded w-full py-2 px-3 bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", children: [
                  /* @__PURE__ */ jsx(
                    WithContext,
                    {
                      tags: blog.labels,
                      suggestions: [],
                      delimiters: [
                        Keys.TAB,
                        Keys.SPACE,
                        Keys.ENTER
                      ],
                      handleAddition: onAddLabel,
                      handleDelete: onDeleteLabel,
                      labelField: "name",
                      placeholder: "Add a label",
                      maxLength: "20",
                      allowUnique: true,
                      inputProps: {
                        disabled: !isEmpty(blog.labels) && blog.labels.length >= 5
                      }
                    }
                  ),
                  /* @__PURE__ */ jsxs(
                    "div",
                    {
                      className: "my-auto float-right",
                      style: { width: "fit-content" },
                      children: [
                        !isEmpty(blog.labels) ? blog.labels.length : 5,
                        "/5"
                      ]
                    }
                  )
                ] }),
                /* @__PURE__ */ jsxs("div", { className: "flex justify-end mt-2", children: [
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      disabled: loading,
                      type: "submit",
                      className: "flex w-auto h-1/7 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 mr-2 rounded",
                      children: loading ? "Waiting..." : "Save"
                    }
                  ),
                  /* @__PURE__ */ jsx(
                    "button",
                    {
                      disabled: loading,
                      className: "bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded",
                      onClick: () => props.onClose(),
                      children: "Cancel"
                    }
                  )
                ] })
              ] })
            ] })
          }
        )
      }
    )
  ] });
};
const EditBlog = (props) => {
  const { data: blogs, isLoading, isRefetching } = useAllBlogs(props.user.id);
  const {
    data: deletedBlog,
    mutateAsync: deleteBlog,
    isLoading: deleting,
    isSuccess: deleteOk,
    isError: deleteError
  } = useDeleteBlog();
  const [selectedBlog, setSelectedBlog] = useState(null);
  const [searchBlog, setSearchBlog] = useState();
  const optionsFuseAlogrithm = {
    keys: ["title"],
    threshold: 0.3
  };
  const fuse = new Fuse(blogs, optionsFuseAlogrithm);
  const handleSearchBlogChange = (event) => {
    setSearchBlog(event.target.value);
  };
  useEffect(() => {
    isRefetching ? toast.loading("Receiveing the new data...", {
      toastId: "loading"
    }) : toast.dismiss("loading");
  }, [isRefetching]);
  return /* @__PURE__ */ jsx("div", { className: "w-full", children: !isLoading ? /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(ToastContainer, { position: "top-center" }),
    !isEmpty(blogs) ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between pb-4", children: [
        /* @__PURE__ */ jsx(
          "label",
          {
            htmlFor: "table-search",
            className: "sr-only",
            children: "Search"
          }
        ),
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
              className: "block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
              placeholder: "Search for blogs based on name",
              onChange: handleSearchBlogChange
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "bg-gray-950 h-full mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-5 lg:max-w-7xl lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8", children: isEmpty(searchBlog) ? blogs.map((blog) => /* @__PURE__ */ jsx(
        BlogCard,
        {
          blog,
          parent: "edit",
          onClickEdit: handleEditBlog,
          onClickDelete: handleDeleteBlog
        }
      )) : fuse.search(searchBlog).map((res) => /* @__PURE__ */ jsx(
        BlogCard,
        {
          blog: res.item,
          parent: "edit",
          onClickEdit: handleEditBlog,
          onClickDelete: handleDeleteBlog
        }
      )) }) })
    ] }) : /* @__PURE__ */ jsx("div", { className: "flex w-3/5 mx-auto text-center h-screen", children: /* @__PURE__ */ jsxs("div", { className: "flex-row w-full", children: [
      /* @__PURE__ */ jsx("h3", { className: "text-gray-200 mx-auto text-4xl mt-10", children: "There are no blogs." }),
      /* @__PURE__ */ jsx("div", { className: "items-center mt-4", children: /* @__PURE__ */ jsx(
        PrimaryButton,
        {
          onClick: () => props.onClickCreate(),
          children: "Create New Blog"
        }
      ) })
    ] }) }),
    selectedBlog && /* @__PURE__ */ jsx(
      BlogEditForm,
      {
        blog: selectedBlog,
        isOpen: true,
        onClose: handleCancelEdit,
        onSave: handleEditSave
      }
    )
  ] }) : /* @__PURE__ */ jsx("div", { className: "h-full mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-5 lg:max-w-7xl lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "flex-col mt-0 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8", children: [...Array(6)].map((_, index) => /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(
    SkeletonTheme,
    {
      baseColor: "#171717",
      highlightColor: "#444",
      children: [
        /* @__PURE__ */ jsx(Skeleton, { height: 240 }),
        /* @__PURE__ */ jsx(Skeleton, { height: 20, width: 200 }),
        /* @__PURE__ */ jsx(Skeleton, { height: 60, count: 2 })
      ]
    }
  ) }, index)) }) }) });
  function handleEditBlog(blog) {
    setSelectedBlog(blog);
  }
  function handleCancelEdit() {
    setSelectedBlog(null);
  }
  function handleEditSave() {
    setSelectedBlog(null);
  }
  function handleDeleteBlog(blogId) {
    toast.promise(async () => await Promise.resolve(deleteBlog(blogId)), {
      pending: "Deleting...",
      success: "Your Blog Was Deleted Successfully!",
      error: {
        render({ data }) {
          if (data.response && data.response.status === 404) {
            return "Blog not found";
          } else {
            return "Unfortunately, there is a problem in the process of deleting the blog.";
          }
        }
      }
    });
  }
};
const EditBlog$1 = EditBlog;
const PublishedBlog = (props) => {
  const { data: blogs, isLoading, isRefetching } = useAllBlogs(props.user.id);
  const { data: toggled, mutateAsync: togglePublishBlog } = useTogglePublish();
  let successMessage = "";
  const [searchBlog, setSearchBlog] = useState();
  useEffect(() => {
    isRefetching ? toast.loading("Receiveing the new data...", {
      toastId: "loading"
    }) : toast.dismiss("loading");
  }, [isRefetching]);
  const optionsFuseAlogrithm = {
    keys: ["title"],
    threshold: 0.3
  };
  const fuse = new Fuse(blogs, optionsFuseAlogrithm);
  const handleSearchBlogChange = (event) => {
    setSearchBlog(event.target.value);
  };
  return /* @__PURE__ */ jsx("div", { className: "w-full h-screen", children: !isLoading ? /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(ToastContainer, { position: "top-center" }),
    !isEmpty(blogs) && blogs.some((blog) => blog.status === "publish") ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between pb-4", children: [
        /* @__PURE__ */ jsx(
          "label",
          {
            htmlFor: "table-search",
            className: "sr-only",
            children: "Search"
          }
        ),
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
              className: "block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
              placeholder: "Search for users based on name",
              onChange: handleSearchBlogChange
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "bg-gray-950 h-full mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-5 lg:max-w-7xl lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8", children: isEmpty(searchBlog) ? blogs.map((blog) => {
        if (blog.status === "publish")
          return /* @__PURE__ */ jsx(
            BlogCard,
            {
              blog,
              onTogglePublish: handleTogglePublish,
              parent: "publish"
            }
          );
      }) : fuse.search(searchBlog).map((res) => /* @__PURE__ */ jsx(
        BlogCard,
        {
          blog: res.item,
          onTogglePublish: handleTogglePublish,
          parent: "publish"
        }
      )) }) })
    ] }) : /* @__PURE__ */ jsx("div", { className: "flex items-center w-3/5 mx-auto text-center h-40", children: /* @__PURE__ */ jsx("h3", { className: "text-gray-200 mx-auto text-4xl", children: "There are no verified blogs." }) })
  ] }) : /* @__PURE__ */ jsx("div", { className: "h-full mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-5 lg:max-w-7xl lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "flex-col mt-0 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8", children: [...Array(6)].map((_, index) => /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(
    SkeletonTheme,
    {
      baseColor: "#171717",
      highlightColor: "#444",
      children: [
        /* @__PURE__ */ jsx(Skeleton, { height: 240 }),
        /* @__PURE__ */ jsx(Skeleton, { height: 20, width: 200 }),
        /* @__PURE__ */ jsx(Skeleton, { height: 60, count: 2 })
      ]
    }
  ) }, index)) }) }) });
  function handleTogglePublish(blogId) {
    const toggledPublishBlog = blogs.filter((blog) => blog.id === blogId);
    successMessage = toggledPublishBlog[0].published_at === null ? "Your blog has been successfully published." : "Your blog has been successfully unpublished.";
    toast.promise(
      async () => await Promise.resolve(togglePublishBlog(blogId)),
      {
        pending: "Waiting...",
        success: successMessage,
        error: {
          render({ data }) {
            if (data.response && data.response.status === 404) {
              return "Blog not found";
            } else {
              return "Unfortunately, there is a problem in the process of publishing the blog.";
            }
          }
        }
      }
    );
  }
};
const PublishedBlog$1 = PublishedBlog;
const CreateBlog = () => {
  var _a, _b, _c, _d, _e;
  const [blog, setBlog] = useState(() => {
    const lastEdited = JSON.parse(localStorage.getItem("blogCreating"));
    return isEmpty(lastEdited) ? {
      title: "",
      category: null,
      body: "",
      imageBaseCode: "",
      image: {},
      labels: []
    } : lastEdited;
  });
  const MAX_IMAGE_SIZE = 2 * 1024 * 1024;
  const { data: categories } = useGetCategories();
  const {
    data,
    mutateAsync: storeBlog,
    isLoading,
    isError,
    isSuccess,
    error
  } = useCreateBlog();
  const {
    register,
    formState: { errors },
    handleSubmit: submit
  } = useForm();
  const Keys = {
    TAB: 9,
    SPACE: 32,
    ENTER: 13
  };
  useEffect(() => {
    return () => {
      localStorage.setItem("blogCreating", JSON.stringify(blog));
    };
  }, [blog]);
  const handleChange = (event) => {
    const { name, value } = event;
    setBlog((prevBlog) => {
      return {
        ...prevBlog,
        [name]: value
      };
    });
  };
  function handleSubmit(event) {
    try {
      toast.promise(async () => await Promise.resolve(storeBlog(blog)), {
        pending: "Storing...",
        success: {
          render() {
            setBlog({
              title: "",
              category: null,
              body: "",
              imageBaseCode: "",
              image: {},
              labels: []
            });
            return "Your Blog Was Stored Successfully!";
          }
        },
        error: {
          render({ data: data2 }) {
            if (data2.response && data2.response.status === 400) {
              return "Blog not found";
            } else {
              return "Unfortunately, there is a problem in the process of storing the blog.";
            }
          }
        }
      });
    } catch (error2) {
      console.log(error2);
    }
  }
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      handleChange({ name: "imageBaseCode", value: reader.result });
      handleChange({ name: "image", value: file });
    };
    if (file) {
      if (file.size > MAX_IMAGE_SIZE) {
        toast.info(`Image size exceeds the limit (Max size 2MB)`);
        return;
      }
      if (!file.type.startsWith("image/")) {
        toast.info("Only image files are allowed");
        return;
      }
      reader.readAsDataURL(file);
    }
  };
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  const onAddLabel = useCallback(
    (newTag) => {
      setBlog({ ...blog, labels: [...blog.labels, newTag] });
    },
    [blog]
  );
  const onDeleteLabel = useCallback(
    (tagIndex) => {
      setBlog({
        ...blog,
        labels: blog.labels.filter((_, i) => i !== tagIndex)
      });
    },
    [blog]
  );
  return /* @__PURE__ */ jsxs("div", { className: "", children: [
    /* @__PURE__ */ jsx(ToastContainer, { position: "top-center" }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit(handleSubmit), encType: "multipart/form-data", children: [
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: "flex mx-5 mb-4",
          "data-te-animation-init": true,
          "data-te-animation-start": "onHover",
          "data-te-animation-reset": "true",
          "data-te-animation": "[fade-in_1s_ease-in-out]",
          children: [
            /* @__PURE__ */ jsxs("div", { className: "w-3/4", children: [
              /* @__PURE__ */ jsx(
                "label",
                {
                  className: "block text-gray-400 text-lg font-bold mb-1",
                  htmlFor: "title",
                  children: "Title"
                }
              ),
              /* @__PURE__ */ jsx(
                "input",
                {
                  className: "shadow appearance-none border rounded w-full py-2 px-3 bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
                  id: "title",
                  type: "text",
                  placeholder: "Enter title",
                  value: blog.title,
                  ...register("title", {
                    required: true,
                    maxLength: 80
                  }),
                  "aria-invalid": errors.title ? "true" : "false",
                  onChange: (event) => handleChange({
                    name: "title",
                    value: event.target.value
                  })
                }
              ),
              ((_a = errors.title) == null ? void 0 : _a.type) === "required" && /* @__PURE__ */ jsx("p", { role: "alert", className: "text-red-500", children: "* Title is required" }),
              ((_b = errors.title) == null ? void 0 : _b.type) === "maxLength" && /* @__PURE__ */ jsx("p", { role: "alert", className: "text-red-500", children: "* Length of title is more than standard limit(16000 characters)" })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "ml-6 w-1/4", children: [
              /* @__PURE__ */ jsx(
                "label",
                {
                  className: "block text-gray-400 text-lg font-bold mb-1",
                  htmlFor: "category",
                  children: "Category"
                }
              ),
              /* @__PURE__ */ jsx(
                Select,
                {
                  className: "appearance-none border rounded bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
                  id: "category",
                  value: blog.category,
                  name: "category",
                  options: categories,
                  required: true,
                  onChange: (event) => handleChange({
                    name: "category",
                    value: event
                  })
                }
              )
            ] })
          ]
        }
      ),
      /* @__PURE__ */ jsxs("div", { className: "mx-5 mb-4", children: [
        /* @__PURE__ */ jsx(
          "label",
          {
            className: "block text-gray-400 text-lg font-bold mb-1",
            htmlFor: "context",
            children: "Body"
          }
        ),
        /* @__PURE__ */ jsx(
          "textarea",
          {
            className: "shadow appearance-none border rounded w-full py-2 px-3 bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:shadow-outline",
            rows: "8",
            cols: "50",
            id: "context",
            placeholder: "Enter context",
            value: blog.body,
            ...register("body", {
              required: true,
              maxLength: 16e3,
              minLength: 120
            }),
            "aria-invalid": errors.body ? "true" : "false",
            onChange: (event) => handleChange({
              name: "body",
              value: event.target.value
            })
          }
        ),
        ((_c = errors.body) == null ? void 0 : _c.type) === "required" && /* @__PURE__ */ jsx("p", { role: "alert", className: "text-red-500", children: "* Context is required" }),
        ((_d = errors.body) == null ? void 0 : _d.type) === "maxLength" && /* @__PURE__ */ jsx("p", { role: "alert", className: "text-red-500", children: "* Length of context is more than standard limit(16000 characters)" }),
        ((_e = errors.body) == null ? void 0 : _e.type) === "minLength" && /* @__PURE__ */ jsx("p", { role: "alert", className: "text-red-500", children: "* Length of context is less than standard limit(min 80 characters)" })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-3 mx-5", children: [
        /* @__PURE__ */ jsx(
          "label",
          {
            className: "text-gray-400 text-lg font-bold mb-1",
            htmlFor: "labels",
            children: "Labels"
          }
        ),
        /* @__PURE__ */ jsxs("div", { className: "shadow appearance-none border rounded w-full py-2 px-3 bg-gray-200 text-gray-700 leading-tight focus:outline-none focus:shadow-outline", children: [
          /* @__PURE__ */ jsx(
            WithContext,
            {
              tags: blog.labels,
              suggestions: [],
              delimiters: [Keys.TAB, Keys.SPACE, Keys.ENTER],
              handleAddition: onAddLabel,
              handleDelete: onDeleteLabel,
              labelField: "name",
              placeholder: "Add a label",
              maxLength: "20",
              allowUnique: true,
              inputProps: {
                disabled: blog.labels.length >= 5
              }
            }
          ),
          /* @__PURE__ */ jsxs(
            "div",
            {
              className: "my-auto float-right",
              style: { width: "fit-content" },
              children: [
                blog.labels.length,
                "/5"
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mb-4 mx-auto", children: [
        /* @__PURE__ */ jsx(
          "label",
          {
            className: "block text-gray-400 text-lg font-bold mb-3 text-center",
            htmlFor: "file",
            children: "Image File"
          }
        ),
        /* @__PURE__ */ jsxs(
          "div",
          {
            className: "flex items-center w-1/2 h-80 mb-3 border-dashed border-2 border-gray-300 rounded mx-auto text-center text-white",
            ...getRootProps(),
            children: [
              /* @__PURE__ */ jsx("input", { type: "file", name: "image", ...getInputProps() }),
              !isEmpty(blog.image) ? /* @__PURE__ */ jsx(
                "img",
                {
                  className: "flex mx-auto my-auto w-4/5 h-full",
                  src: blog.imageBaseCode,
                  alt: "Selected image preview"
                }
              ) : /* @__PURE__ */ jsxs("p", { className: "mx-auto my-auto", children: [
                "Drag and drop an image here, or click to select a file ",
                /* @__PURE__ */ jsx("br", {}),
                "Maximum file size is 2 MB"
              ] })
            ]
          }
        ),
        !isEmpty(blog.image) && /* @__PURE__ */ jsx("div", { className: "w-20 mx-auto my-3", children: /* @__PURE__ */ jsx(
          DangerButton,
          {
            className: "w-20 align-content-center",
            onClick: () => setBlog({ ...blog, image: null }),
            children: "Reset"
          }
        ) }),
        /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center", children: /* @__PURE__ */ jsx(
          "button",
          {
            className: "bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline",
            type: "submit",
            disabled: isLoading,
            children: isLoading ? "Saving" : "Save"
          }
        ) })
      ] })
    ] })
  ] });
};
const CreateBlog$1 = CreateBlog;
const BlogMenuItem = (props) => {
  let icon, componentDetector, itemStyle, buttonStyle, iconStyle;
  if (props.activeItem) {
    itemStyle = "relative flex pl-6 py-2 bg-gray-300 hover:bg-gray-200";
    buttonStyle = "pr-3 pl-10 block text-gray-700 font-semibold";
    iconStyle = "w-5 h-5 absolute text-gray-700 ml-3 pointer-events-none";
  } else {
    itemStyle = "relative flex pl-6 py-2 bg-gray-700 hover:bg-gray-600";
    buttonStyle = "pr-3 pl-10 block text-gray-100 font-semibold";
    iconStyle = "w-5 h-5 absolute text-gray-100 ml-3 pointer-events-none";
  }
  switch (props.icon) {
    case "add":
      icon = /* @__PURE__ */ jsx(
        FaBlog,
        {
          className: iconStyle,
          "aria-hidden": "true"
        }
      );
      componentDetector = "create";
      break;
    case "edit":
      icon = /* @__PURE__ */ jsx(
        FaEdit,
        {
          className: iconStyle,
          "aria-hidden": "true"
        }
      );
      componentDetector = "edit";
      break;
    case "pub":
      icon = /* @__PURE__ */ jsx(
        FaPaperPlane,
        {
          className: iconStyle,
          "aria-hidden": "true"
        }
      );
      componentDetector = "published";
      break;
    default:
      icon = /* @__PURE__ */ jsx(
        FaBan,
        {
          className: iconStyle,
          "aria-hidden": "true"
        }
      );
      componentDetector = "blocked";
      break;
  }
  return /* @__PURE__ */ jsxs(
    "li",
    {
      className: itemStyle,
      onClick: () => props.onClickItem(componentDetector),
      children: [
        icon,
        /* @__PURE__ */ jsx("button", { className: buttonStyle, children: props.itemName })
      ]
    }
  );
};
const BlogSideBar = (props) => {
  return /* @__PURE__ */ jsxs("div", { className: "flex flex-col md:flex-row h-full", children: [
    /* @__PURE__ */ jsxs("div", { className: "bg-gray-800 text-gray-100 flex-shrink-0 w-full", children: [
      /* @__PURE__ */ jsx("div", { className: "flex items-center justify-center h-10 border-b border-gray-700", children: /* @__PURE__ */ jsx("span", { className: "text-lg font-bold uppercase", children: "blogs" }) }),
      /* @__PURE__ */ jsxs("ul", { className: "py-4", children: [
        /* @__PURE__ */ jsx(
          BlogMenuItem,
          {
            onClickItem: props.onChangeComponent,
            itemName: "Add Blog",
            icon: "add",
            activeItem: props.currentCmp === "create"
          }
        ),
        /* @__PURE__ */ jsx(
          BlogMenuItem,
          {
            onClickItem: props.onChangeComponent,
            itemName: "All Blogs",
            icon: "edit",
            activeItem: props.currentCmp === "edit"
          }
        ),
        /* @__PURE__ */ jsx(
          BlogMenuItem,
          {
            onClickItem: props.onChangeComponent,
            itemName: "Publishing Blogs",
            icon: "pub",
            activeItem: props.currentCmp === "published"
          }
        ),
        /* @__PURE__ */ jsx(
          BlogMenuItem,
          {
            onClickItem: props.onChangeComponent,
            itemName: "Blocked Blogs",
            icon: "ban",
            activeItem: props.currentCmp === "blocked"
          }
        )
      ] })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "flex-1 overflow-y-auto" })
  ] });
};
const BlogSideBar$1 = BlogSideBar;
const BlockedBlog = (props) => {
  const { data: blogs, isLoading, isRefetching } = useAllBlogs(props.user.id);
  const {
    data: deletedBlog,
    mutateAsync: deleteBlog,
    isLoading: deleting,
    isSuccess: deleteOk,
    isError: deleteError
  } = useDeleteBlog();
  const [searchBlog, setSearchBlog] = useState();
  const optionsFuseAlogrithm = {
    keys: ["title"],
    threshold: 0.3
  };
  const fuse = new Fuse(blogs, optionsFuseAlogrithm);
  const handleSearchBlogChange = (event) => {
    setSearchBlog(event.target.value);
  };
  useEffect(() => {
    isRefetching ? toast.loading("Receiveing the new data...", {
      toastId: "loading"
    }) : toast.dismiss("loading");
  }, [isRefetching]);
  return /* @__PURE__ */ jsx("div", { className: "w-full h-screen", children: !isLoading ? /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(ToastContainer, { position: "top-center" }),
    !isEmpty(blogs) && blogs.some((blog) => blog.status === "block") ? /* @__PURE__ */ jsxs(Fragment, { children: [
      /* @__PURE__ */ jsxs("div", { className: "flex justify-between pb-4", children: [
        /* @__PURE__ */ jsx(
          "label",
          {
            htmlFor: "table-search",
            className: "sr-only",
            children: "Search"
          }
        ),
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
              className: "block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
              placeholder: "Search for users based on name",
              onChange: handleSearchBlogChange
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "bg-gray-950 h-full mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-5 lg:max-w-7xl lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8", children: isEmpty(searchBlog) ? blogs.map((blog) => {
        if (blog.status === "block")
          return /* @__PURE__ */ jsx(
            BlogCard,
            {
              blog,
              parent: "block",
              onClickDelete: handleDeleteBlog
            }
          );
      }) : fuse.search(searchBlog).map((res) => /* @__PURE__ */ jsx(
        BlogCard,
        {
          blog: res.item,
          parent: "block",
          onClickDelete: handleDeleteBlog
        }
      )) }) })
    ] }) : /* @__PURE__ */ jsx("div", { className: "flex items-center w-3/5 mx-auto text-center h-40", children: /* @__PURE__ */ jsx("h3", { className: "text-gray-200 mx-auto text-4xl", children: "There are no blocked blogs." }) })
  ] }) : /* @__PURE__ */ jsx("div", { className: "h-full mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-5 lg:max-w-7xl lg:px-8", children: /* @__PURE__ */ jsx("div", { className: "flex-col mt-0 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8", children: [...Array(6)].map((_, index) => /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsxs(
    SkeletonTheme,
    {
      baseColor: "#171717",
      highlightColor: "#444",
      children: [
        /* @__PURE__ */ jsx(Skeleton, { height: 240 }),
        /* @__PURE__ */ jsx(Skeleton, { height: 20, width: 200 }),
        /* @__PURE__ */ jsx(Skeleton, { height: 60, count: 2 })
      ]
    }
  ) }, index)) }) }) });
  function handleDeleteBlog(blogId) {
    toast.promise(async () => await Promise.resolve(deleteBlog(blogId)), {
      pending: "Deleting...",
      success: "Your Blog Was Deleted Successfully!",
      error: {
        render({ data }) {
          if (data.response && data.response.status === 404) {
            return "Blog not found";
          } else {
            return "Unfortunately, there is a problem in the process of deleting the blog.";
          }
        }
      }
    });
  }
};
const BlockedBlog$1 = BlockedBlog;
function Blogs({ auth }) {
  const [currentComponent, setcurrentComponent] = useState(() => {
    const lastComponent = JSON.parse(localStorage.getItem("lastComponent"));
    return isEmpty(lastComponent) ? "create" : lastComponent;
  });
  useEffect(() => {
    return () => {
      localStorage.setItem(
        "lastComponent",
        JSON.stringify(currentComponent)
      );
    };
  }, [currentComponent]);
  function handleCreateNewBlogWhenEmpty() {
    setcurrentComponent("create");
  }
  return /* @__PURE__ */ jsxs(Authenticated, { user: auth.user, children: [
    /* @__PURE__ */ jsx(Head, { title: "Blogs" }),
    /* @__PURE__ */ jsxs("div", { className: "container-fluid h-auto flex", children: [
      /* @__PURE__ */ jsxs("div", { className: "w-5/6 h-100 pt-6", children: [
        currentComponent === "create" && /* @__PURE__ */ jsx(CreateBlog$1, {}),
        currentComponent === "edit" && /* @__PURE__ */ jsx(
          EditBlog$1,
          {
            user: auth.user,
            onClickCreate: handleCreateNewBlogWhenEmpty
          }
        ),
        currentComponent === "published" && /* @__PURE__ */ jsx(PublishedBlog$1, { user: auth.user }),
        currentComponent === "blocked" && /* @__PURE__ */ jsx(BlockedBlog$1, { user: auth.user })
      ] }),
      /* @__PURE__ */ jsx("div", { className: "w-1/6 h-100 bg-zinc-200", children: /* @__PURE__ */ jsx(
        BlogSideBar$1,
        {
          onChangeComponent: setcurrentComponent,
          currentCmp: currentComponent
        }
      ) })
    ] })
  ] });
}
export {
  Blogs as default
};
