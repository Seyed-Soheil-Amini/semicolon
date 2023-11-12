import { jsxs, jsx } from "react/jsx-runtime";
import { A as Authenticated } from "./AuthenticatedLayout-9e7d963a.js";
import DeleteUserForm from "./DeleteUserForm-030abf80.js";
import UpdatePasswordForm from "./UpdatePasswordForm-6d95c099.js";
import UpdateProfileInformation from "./UpdateProfileInformationForm-d48b6d88.js";
import { Head } from "@inertiajs/react";
import "react";
import "./ApplicationLogo-fd1fea94.js";
import "@headlessui/react";
import "react-query";
import "./DangerButton-44d86612.js";
import "./InputError-9b4cb3a1.js";
import "./InputLabel-2849fc87.js";
import "./TextInput-027ef123.js";
import "react-icons/fa/index.esm.js";
import "./PrimaryButton-38b01d37.js";
/* empty css                            */import "react-toastify";
import "react-dropzone";
import "lodash";
import "./index-72e73b3b.js";
import "axios";
function Edit({ auth, mustVerifyEmail, status }) {
  return /* @__PURE__ */ jsxs(
    Authenticated,
    {
      user: auth.user,
      children: [
        /* @__PURE__ */ jsx(Head, { title: "Profile" }),
        /* @__PURE__ */ jsx("div", { className: "py-12", children: /* @__PURE__ */ jsxs("div", { className: "max-w-7xl mx-auto sm:px-6 lg:px-8 space-y-6", children: [
          /* @__PURE__ */ jsx("div", { className: "p-4 sm:p-8 bg-white dark:bg-gray-800 shadow sm:rounded-lg", children: /* @__PURE__ */ jsx(
            UpdateProfileInformation,
            {
              mustVerifyEmail,
              status,
              className: "max-w-xl"
            }
          ) }),
          /* @__PURE__ */ jsx("div", { className: "p-4 sm:p-8 bg-gray-800 shadow sm:rounded-lg", children: /* @__PURE__ */ jsx(UpdatePasswordForm, { className: "max-w-xl" }) }),
          /* @__PURE__ */ jsx("div", { className: "p-4 sm:p-8 bg-gray-800 shadow sm:rounded-lg", children: /* @__PURE__ */ jsx(DeleteUserForm, { className: "max-w-xl" }) })
        ] }) })
      ]
    }
  );
}
export {
  Edit as default
};
