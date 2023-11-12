import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { useRef } from "react";
import { I as InputError } from "./InputError-9b4cb3a1.js";
import { I as InputLabel } from "./InputLabel-2849fc87.js";
import { P as PrimaryButton } from "./PrimaryButton-38b01d37.js";
import { T as TextInput } from "./TextInput-027ef123.js";
import { useForm } from "@inertiajs/react";
/* empty css                            */import { ToastContainer, toast } from "react-toastify";
import "react-icons/fa/index.esm.js";
function UpdatePasswordForm({ className = "" }) {
  const passwordInput = useRef();
  const currentPasswordInput = useRef();
  const {
    data,
    setData,
    errors,
    put,
    reset,
    processing,
    recentlySuccessful
  } = useForm({
    current_password: "",
    password: "",
    password_confirmation: ""
  });
  const updatePassword = (e) => {
    e.preventDefault();
    put(route("password.update"), {
      preserveScroll: true,
      onSuccess: () => {
        reset();
        toast.success("Your password has been changed.");
      },
      onError: (errors2) => {
        if (errors2.password) {
          reset("password", "password_confirmation");
          passwordInput.current.focus();
        }
        if (errors2.current_password) {
          reset("current_password");
          currentPasswordInput.current.focus();
        }
      }
    });
  };
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(ToastContainer, { position: "top-center" }),
    /* @__PURE__ */ jsxs("section", { className, children: [
      /* @__PURE__ */ jsxs("header", { children: [
        /* @__PURE__ */ jsx("h2", { className: "text-lg font-medium text-gray-900 dark:text-gray-100", children: "Update Password" }),
        /* @__PURE__ */ jsx("p", { className: "mt-1 text-sm text-gray-600 dark:text-gray-400", children: "Ensure your account is using a long, random password to stay secure." })
      ] }),
      /* @__PURE__ */ jsxs("form", { onSubmit: updatePassword, className: "mt-6 space-y-6", children: [
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(
            InputLabel,
            {
              htmlFor: "current_password",
              value: "Current Password"
            }
          ),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "current_password",
              ref: currentPasswordInput,
              value: data.current_password,
              onChange: (e) => setData("current_password", e.target.value),
              type: "password",
              className: "mt-1 block w-full",
              autoComplete: "current-password"
            }
          ),
          /* @__PURE__ */ jsx(
            InputError,
            {
              message: errors.current_password,
              className: "mt-2"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(InputLabel, { htmlFor: "password", value: "New Password" }),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "password",
              ref: passwordInput,
              value: data.password,
              onChange: (e) => setData("password", e.target.value),
              type: "password",
              className: "mt-1 block w-full",
              autoComplete: "new-password"
            }
          ),
          /* @__PURE__ */ jsx(
            InputError,
            {
              message: errors.password,
              className: "mt-2"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(
            InputLabel,
            {
              htmlFor: "password_confirmation",
              value: "Confirm Password"
            }
          ),
          /* @__PURE__ */ jsx(
            TextInput,
            {
              id: "password_confirmation",
              value: data.password_confirmation,
              onChange: (e) => setData("password_confirmation", e.target.value),
              type: "password",
              className: "mt-1 block w-full",
              autoComplete: "new-password"
            }
          ),
          /* @__PURE__ */ jsx(
            InputError,
            {
              message: errors.password_confirmation,
              className: "mt-2"
            }
          )
        ] }),
        /* @__PURE__ */ jsx("div", { className: "flex items-center gap-4", children: /* @__PURE__ */ jsx(PrimaryButton, { disabled: processing, children: "Save" }) })
      ] })
    ] })
  ] });
}
export {
  UpdatePasswordForm as default
};
