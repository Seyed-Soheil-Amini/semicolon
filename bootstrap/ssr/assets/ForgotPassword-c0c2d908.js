import { jsxs, jsx } from "react/jsx-runtime";
import { G as Guest } from "./GuestLayout-e7ac4428.js";
import { I as InputError } from "./InputError-9b4cb3a1.js";
import { P as PrimaryButton } from "./PrimaryButton-38b01d37.js";
import { T as TextInput } from "./TextInput-027ef123.js";
import { useForm, Head } from "@inertiajs/react";
import "./ApplicationLogo-fd1fea94.js";
import "react";
import "react-icons/fa/index.esm.js";
function ForgotPassword({ status }) {
  const { data, setData, post, processing, errors } = useForm({
    email: ""
  });
  const submit = (e) => {
    e.preventDefault();
    post(route("password.email"));
  };
  return /* @__PURE__ */ jsxs(Guest, { children: [
    /* @__PURE__ */ jsx(Head, { title: "Forgot Password" }),
    /* @__PURE__ */ jsx("div", { className: "mb-4 text-sm text-gray-600 dark:text-gray-400", children: "Forgot your password? No problem. Just let us know your email address and we will email you a password reset link that will allow you to choose a new one." }),
    status && /* @__PURE__ */ jsx("div", { className: "mb-4 font-medium text-sm text-green-600 dark:text-green-400", children: status }),
    /* @__PURE__ */ jsxs("form", { onSubmit: submit, children: [
      /* @__PURE__ */ jsx(
        TextInput,
        {
          id: "email",
          type: "email",
          name: "email",
          value: data.email,
          className: "mt-1 block w-full",
          isFocused: true,
          onChange: (e) => setData("email", e.target.value)
        }
      ),
      /* @__PURE__ */ jsx(InputError, { message: errors.email, className: "mt-2" }),
      /* @__PURE__ */ jsx("div", { className: "flex items-center justify-end mt-4", children: /* @__PURE__ */ jsx(PrimaryButton, { className: "ml-4", disabled: processing, children: "Email Password Reset Link" }) })
    ] })
  ] });
}
export {
  ForgotPassword as default
};
