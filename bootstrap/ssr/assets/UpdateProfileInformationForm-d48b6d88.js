import { jsx, jsxs, Fragment } from "react/jsx-runtime";
import { I as InputLabel } from "./InputLabel-2849fc87.js";
import { P as PrimaryButton } from "./PrimaryButton-38b01d37.js";
import { T as TextInput } from "./TextInput-027ef123.js";
import { usePage, Link } from "@inertiajs/react";
import { useDropzone } from "react-dropzone";
import { isEmpty } from "lodash";
import { m as useUpdateUser } from "./index-72e73b3b.js";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa/index.esm.js";
/* empty css                            */import { ToastContainer, toast } from "react-toastify";
import { D as DangerButton } from "./DangerButton-44d86612.js";
import "axios";
import "react-query";
function UpdateProfileInformation({
  mustVerifyEmail,
  status,
  className = ""
}) {
  const user = usePage().props.auth.user;
  const [processing, setProcessing] = useState(false);
  const [data, setData] = useState({
    name: user.name,
    email: user.email,
    jobTitle: user.job_title,
    about: user.about,
    image: user.image,
    imageBaseCode: ""
  });
  const MAX_IMAGE_USER_SIZE = 2 * 1024 * 1024;
  const handleChange = (event) => {
    const { name, value } = event;
    setData((prevData) => {
      return {
        ...prevData,
        [name]: value
      };
    });
  };
  const submit = async (e) => {
    e.preventDefault();
    setProcessing(true);
    toast.promise(async () => await Promise.resolve(useUpdateUser(data)), {
      pending: "Updating...",
      success: {
        render({ data: data2 }) {
          setData(data2);
          setProcessing(false);
          return "Your information has been successfully saved.";
        }
      },
      error: {
        render({ data: data2 }) {
          if (data2.response && data2.response.status === 404) {
            return "User not found";
          } else {
            return "Unfortunately, there is a problem in the process of updating your information.";
          }
        }
      }
    });
  };
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.onload = () => {
      handleChange({ name: "imageBaseCode", value: reader.result });
      handleChange({ name: "image", value: file });
    };
    if (file) {
      if (file.size > MAX_IMAGE_USER_SIZE) {
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
  let imageElement;
  if (!isEmpty(data.imageBaseCode)) {
    imageElement = /* @__PURE__ */ jsx(
      "img",
      {
        className: "flex mx-auto my-auto h-full object-cover rounded-md mask-circle",
        src: data.imageBaseCode,
        alt: "Selected image preview"
      }
    );
  } else if (!isEmpty(data.image)) {
    imageElement = /* @__PURE__ */ jsx(
      "img",
      {
        className: "flex mx-auto my-auto h-full object-cover rounded-md mask-circle",
        src: `${location.origin}/storage/${data.image}`,
        alt: "User image preview"
      }
    );
  } else {
    imageElement = /* @__PURE__ */ jsxs("div", { className: "flex-col mx-auto my-auto h-full", children: [
      /* @__PURE__ */ jsx(FaUserCircle, { className: "mx-auto h-16 w-16 text-gray-300 my-auto" }),
      /* @__PURE__ */ jsx("p", { className: "mx-auto my-auto pt-6", children: "Drag and drop an image here, or click to select a file" })
    ] });
  }
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(ToastContainer, { position: "top-center" }),
    /* @__PURE__ */ jsxs("section", { className, children: [
      /* @__PURE__ */ jsxs("header", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900 dark:text-gray-100", children: "Profile Information" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-600 dark:text-gray-400", children: "Update your account's profile information and email address." })
      ] }),
      /* @__PURE__ */ jsxs(
        "form",
        {
          onSubmit: submit,
          className: "mt-6 space-y-6",
          encType: "multipart/form-data",
          children: [
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "name", value: "Name" }),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  id: "name",
                  className: "mt-1 block w-full",
                  value: data.name,
                  onChange: (event) => handleChange({
                    name: "name",
                    value: event.target.value
                  }),
                  required: true,
                  isFocused: true,
                  autoComplete: "name"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "email", value: "Email" }),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  id: "email",
                  type: "email",
                  className: "mt-1 block w-full",
                  value: data.email,
                  onChange: (event) => handleChange({
                    name: "email",
                    value: event.target.value
                  }),
                  required: true,
                  autoComplete: "username"
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "joTitle", value: "Job Title" }),
              /* @__PURE__ */ jsx(
                TextInput,
                {
                  id: "jobTitle",
                  className: "mt-1 block w-full",
                  value: data.jobTitle,
                  onChange: (event) => handleChange({
                    name: "jobTitle",
                    value: event.target.value
                  })
                }
              )
            ] }),
            /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "about", value: "About" }),
              /* @__PURE__ */ jsx("div", { className: "font-sans relative flex items-center focus-within:text-gray-600", children: /* @__PURE__ */ jsx(
                "textarea",
                {
                  id: "about",
                  name: "about",
                  rows: 3,
                  className: "block w-full  border-gray-300 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm input-with-icon",
                  defaultValue: data.about,
                  onChange: (event) => handleChange({
                    name: "about",
                    value: event.target.value
                  })
                }
              ) })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "col-span-full", children: [
              /* @__PURE__ */ jsx(InputLabel, { htmlFor: "image", value: "Icon Photo" }),
              /* @__PURE__ */ jsx(
                "div",
                {
                  className: "mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 cursor-pointer bg-gray-900 px-5 py-2 h-60",
                  ...getRootProps(),
                  children: /* @__PURE__ */ jsxs("div", { className: "items-center", children: [
                    /* @__PURE__ */ jsxs(
                      "div",
                      {
                        className: `${isEmpty(data.image) & isEmpty(data.imageBaseCode) && "mt-6"} text-sm leading-6 text-gray-400 h-full w-full mx-auto`,
                        children: [
                          /* @__PURE__ */ jsx(
                            "label",
                            {
                              htmlFor: "file-upload",
                              className: "relative cursor-pointer rounded-md font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                            }
                          ),
                          /* @__PURE__ */ jsx(
                            "input",
                            {
                              id: "file-upload",
                              name: "file-upload",
                              type: "file",
                              className: "sr-only",
                              ...getInputProps()
                            }
                          ),
                          imageElement
                        ]
                      }
                    ),
                    /* @__PURE__ */ jsx("p", { className: "text-xs leading-5 text-gray-400" })
                  ] })
                }
              )
            ] }),
            mustVerifyEmail && user.email_verified_at === null && /* @__PURE__ */ jsxs("div", { children: [
              /* @__PURE__ */ jsxs("p", { className: "text-sm mt-2 text-gray-800 dark:text-gray-200", children: [
                "Your email address is unverified.",
                /* @__PURE__ */ jsx(
                  Link,
                  {
                    href: route("verification.send"),
                    method: "post",
                    as: "button",
                    className: "underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800",
                    children: "Click here to re-send the verification email."
                  }
                )
              ] }),
              status === "verification-link-sent" && /* @__PURE__ */ jsx("div", { className: "mt-2 font-medium text-sm text-green-600 dark:text-green-400", children: "A new verification link has been sent to your email address." })
            ] }),
            /* @__PURE__ */ jsxs("div", { className: "flex justify-start items-center gap-4", children: [
              /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: "Save" }),
              !isEmpty(data.image) && /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(
                DangerButton,
                {
                  className: "align-content-center",
                  onClick: () => setData({
                    ...data,
                    image: null,
                    imageBaseCode: ""
                  }),
                  children: "Remove"
                }
              ) })
            ] })
          ]
        }
      )
    ] })
  ] });
}
export {
  UpdateProfileInformation as default
};
