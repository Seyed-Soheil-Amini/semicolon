import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useState } from "react";
import { H as HeaderLayouts, F as FooterLayout } from "./Footer-c9844f58.js";
import { FaMailBulk, FaUsers, FaVoicemail } from "react-icons/fa/index.esm.js";
/* empty css                            */import { ToastContainer, toast } from "react-toastify";
import { i as useStoreMessage } from "./index-72e73b3b.js";
import { useForm } from "react-hook-form";
import "@inertiajs/react";
import "lodash";
import "axios";
import "react-query";
const ContactUs = ({ auth }) => {
  var _a, _b, _c, _d, _e, _f, _g, _h, _i, _j;
  const [message, setMessage] = useState({
    senderName: "",
    email: "",
    subject: "",
    body: ""
  });
  const handleChangeMessage = (event) => {
    const { name, value } = event;
    setMessage((prevBlog) => {
      return {
        ...prevBlog,
        [name]: value
      };
    });
  };
  const {
    register,
    formState: { errors },
    handleSubmit: submit
  } = useForm();
  function handleSubmit(event) {
    toast.promise(
      async () => await Promise.resolve(useStoreMessage(message)),
      {
        pending: "Sending...",
        success: {
          render() {
            setMessage({
              senderName: "",
              email: "",
              subject: "",
              body: ""
            });
            return "Your information has been successfully saved.";
          }
        },
        error: "Unfortunately, there is a problem in the process of updating your information."
      }
    );
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(HeaderLayouts, { auth }),
    /* @__PURE__ */ jsx(ToastContainer, { position: "top-center" }),
    /* @__PURE__ */ jsx("div", { className: "py-24 sm:py-32 bg-gray-800", children: /* @__PURE__ */ jsxs("div", { className: "mx-auto max-w-7xl px-6 lg:px-8", children: [
      /* @__PURE__ */ jsxs("div", { className: "mx-auto text-center", children: [
        /* @__PURE__ */ jsx("h2", { className: "text-3xl font-bold tracking-tight text-gray-200 sm:text-4xl", children: "Contact Us" }),
        /* @__PURE__ */ jsx("p", { className: "mt-2 text-lg leading-8 text-gray-300", children: "You can choose the way to communicate with us." })
      ] }),
      /* @__PURE__ */ jsxs("div", { className: "mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3", children: [
        /* @__PURE__ */ jsx("article", { className: "items-center rounded-2xl border-t border-b", children: /* @__PURE__ */ jsxs("div", { className: "flex-row mx-auto shadow-3xl items-center px-5 py-8", children: [
          /* @__PURE__ */ jsx(FaMailBulk, { className: "text-7xl text-orange-600 mx-auto" }),
          /* @__PURE__ */ jsxs("div", { className: "flex-row text-gray-200 text-center mt-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-serif", children: "Email" }),
            /* @__PURE__ */ jsx("p", { className: "pt-2", children: "semicolon@gmail.com" })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("article", { className: "items-center rounded-2xl border-t border-b", children: /* @__PURE__ */ jsxs("div", { className: "flex-row mx-auto shadow-3xl items-center px-5 py-8", children: [
          /* @__PURE__ */ jsx(FaUsers, { className: "text-7xl text-orange-600 mx-auto" }),
          /* @__PURE__ */ jsxs("div", { className: "flex-row text-gray-200 text-center mt-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-serif", children: "Help and Support" }),
            /* @__PURE__ */ jsx("p", { className: "pt-2", children: /* @__PURE__ */ jsx("u", { children: "get supprort" }) })
          ] })
        ] }) }),
        /* @__PURE__ */ jsx("article", { className: "items-center rounded-2xl border-t border-b", children: /* @__PURE__ */ jsxs("div", { className: "flex-row mx-auto shadow-3xl items-center px-5 py-8", children: [
          /* @__PURE__ */ jsx(FaVoicemail, { className: "text-7xl text-orange-600 mx-auto" }),
          /* @__PURE__ */ jsxs("div", { className: "flex-row text-gray-200 text-center mt-4", children: [
            /* @__PURE__ */ jsx("h3", { className: "font-serif", children: "Call" }),
            /* @__PURE__ */ jsx("p", { className: "pt-2", children: "+989103845418" })
          ] })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx("section", { className: "", children: /* @__PURE__ */ jsxs("div", { className: "py-8 lg:py-16 px-4 mx-auto max-w-screen-md", children: [
        /* @__PURE__ */ jsx("p", { className: "mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl", children: "Got a technical issue? Want to send feedback about a beta feature? Need details about our Business plan? Let us know." }),
        /* @__PURE__ */ jsxs(
          "form",
          {
            className: "space-y-8",
            onSubmit: submit(handleSubmit),
            children: [
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(
                  "label",
                  {
                    htmlFor: "senderName",
                    className: "block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300",
                    children: "Your Name"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    id: "senderName",
                    className: "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light",
                    placeholder: "first and last name",
                    value: message.senderName,
                    required: true,
                    ...register("senderName", {
                      required: true,
                      maxLength: 60
                    }),
                    "aria-invalid": errors.senderName ? "true" : "false",
                    onChange: (event) => handleChangeMessage({
                      name: "senderName",
                      value: event.target.value
                    })
                  }
                ),
                ((_a = errors.title) == null ? void 0 : _a.type) === "required" && /* @__PURE__ */ jsx(
                  "p",
                  {
                    role: "alert",
                    className: "text-red-400",
                    children: "* Name is required"
                  }
                ),
                ((_b = errors.title) == null ? void 0 : _b.type) === "maxLength" && /* @__PURE__ */ jsx(
                  "p",
                  {
                    role: "alert",
                    className: "text-red-400",
                    children: "* Length of name is more than standard limit(60 characters)"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(
                  "label",
                  {
                    htmlFor: "email",
                    className: "block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300",
                    children: "Your email"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "email",
                    id: "email",
                    className: "shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light",
                    placeholder: "name@gmail.com",
                    value: message.email,
                    required: true,
                    ...register("email", {
                      required: true,
                      maxLength: 120,
                      pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i
                    }),
                    "aria-invalid": errors.email ? "true" : "false",
                    onChange: (event) => handleChangeMessage({
                      name: "email",
                      value: event.target.value
                    })
                  }
                ),
                ((_c = errors.email) == null ? void 0 : _c.type) === "required" && /* @__PURE__ */ jsx(
                  "p",
                  {
                    role: "alert",
                    className: "text-red-400",
                    children: "* Email is required"
                  }
                ),
                ((_d = errors.email) == null ? void 0 : _d.type) === "maxLength" && /* @__PURE__ */ jsx(
                  "p",
                  {
                    role: "alert",
                    className: "text-red-400",
                    children: "* Length of email is more than standard limit(120 characters)"
                  }
                ),
                ((_e = errors.email) == null ? void 0 : _e.type) === "pattern" && /* @__PURE__ */ jsx(
                  "p",
                  {
                    role: "alert",
                    className: "text-red-400",
                    children: "* Please enter a valid email address"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { children: [
                /* @__PURE__ */ jsx(
                  "label",
                  {
                    htmlFor: "subject",
                    className: "block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300",
                    children: "Subject"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "input",
                  {
                    type: "text",
                    id: "subject",
                    className: "block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light",
                    placeholder: "Let us know how we can help you",
                    value: message.subject,
                    required: true,
                    ...register("subject", {
                      required: true,
                      maxLength: 200
                    }),
                    "aria-invalid": errors.subject ? "true" : "false",
                    onChange: (event) => handleChangeMessage({
                      name: "subject",
                      value: event.target.value
                    })
                  }
                ),
                ((_f = errors.subject) == null ? void 0 : _f.type) === "required" && /* @__PURE__ */ jsx(
                  "p",
                  {
                    role: "alert",
                    className: "text-red-400",
                    children: "* Subject is required"
                  }
                ),
                ((_g = errors.subject) == null ? void 0 : _g.type) === "maxLength" && /* @__PURE__ */ jsx(
                  "p",
                  {
                    role: "alert",
                    className: "text-red-400",
                    children: "* Length of subject is more than standard limit(200 characters)"
                  }
                )
              ] }),
              /* @__PURE__ */ jsxs("div", { className: "sm:col-span-2", children: [
                /* @__PURE__ */ jsx(
                  "label",
                  {
                    htmlFor: "body",
                    className: "block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400",
                    children: "Your message"
                  }
                ),
                /* @__PURE__ */ jsx(
                  "textarea",
                  {
                    id: "body",
                    rows: 6,
                    className: "block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500",
                    placeholder: "Leave a comment...",
                    defaultValue: "",
                    value: message.body,
                    required: true,
                    ...register("body", {
                      required: true,
                      maxLength: 16e3,
                      minLength: 100
                    }),
                    "aria-invalid": errors.body ? "true" : "false",
                    onChange: (event) => handleChangeMessage({
                      name: "body",
                      value: event.target.value
                    })
                  }
                ),
                ((_h = errors.body) == null ? void 0 : _h.type) === "required" && /* @__PURE__ */ jsx(
                  "p",
                  {
                    role: "alert",
                    className: "text-red-400",
                    children: "* Message is required"
                  }
                ),
                ((_i = errors.body) == null ? void 0 : _i.type) === "maxLength" && /* @__PURE__ */ jsx(
                  "p",
                  {
                    role: "alert",
                    className: "text-red-400",
                    children: "* Length of message is more than standard limit(16000 characters)"
                  }
                ),
                ((_j = errors.body) == null ? void 0 : _j.type) === "minLength" && /* @__PURE__ */ jsx(
                  "p",
                  {
                    role: "alert",
                    className: "text-red-400",
                    children: "* Length of message is less than standard limit(100 characters)"
                  }
                )
              ] }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "submit",
                  className: "py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-orange-600 sm:w-fit hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-primary-300",
                  children: "Send message"
                }
              )
            ]
          }
        )
      ] }) })
    ] }) }),
    /* @__PURE__ */ jsx(FooterLayout, {})
  ] });
};
export {
  ContactUs as default
};
