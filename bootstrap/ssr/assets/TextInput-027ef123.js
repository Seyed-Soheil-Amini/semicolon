import { jsxs, jsx } from "react/jsx-runtime";
import { forwardRef, useRef, useEffect } from "react";
import { FaUser, FaEnvelope, FaUserGraduate, FaParagraph, FaLock } from "react-icons/fa/index.esm.js";
const TextInput = forwardRef(function TextInput2({ type = "text", className = "", isFocused = false, ...props }, ref) {
  const input = ref ? ref : useRef();
  useEffect(() => {
    if (isFocused) {
      input.current.focus();
    }
  }, []);
  let icon;
  if (props.id === "name") {
    icon = /* @__PURE__ */ jsx(
      FaUser,
      {
        className: "w-5 h-5 absolute text-gray-400 ml-3 pointer-events-none",
        "aria-hidden": "true"
      }
    );
  } else if (props.id === "email") {
    icon = /* @__PURE__ */ jsx(
      FaEnvelope,
      {
        className: "w-5 h-5 absolute text-gray-400 ml-3 pointer-events-none",
        "aria-hidden": "true"
      }
    );
  } else if (props.id === "jobTitle") {
    icon = /* @__PURE__ */ jsx(
      FaUserGraduate,
      {
        className: "w-5 h-5 absolute text-gray-400 ml-3 pointer-events-none",
        "aria-hidden": "true"
      }
    );
  } else if (props.id === "about") {
    icon = /* @__PURE__ */ jsx(
      FaParagraph,
      {
        className: "w-5 h-5 absolute text-gray-400 ml-3 pointer-events-none",
        "aria-hidden": "true"
      }
    );
  } else {
    icon = /* @__PURE__ */ jsx(
      FaLock,
      {
        className: "w-5 h-5 absolute text-gray-400 ml-3 pointer-events-none",
        "aria-hidden": "true"
      }
    );
  }
  return /* @__PURE__ */ jsxs("div", { className: "font-sans relative flex items-center focus-within:text-gray-600", children: [
    icon,
    /* @__PURE__ */ jsx(
      "input",
      {
        ...props,
        type,
        className: "pr-3 pl-10 border-gray-300 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm input-with-icon" + className,
        ref: input
      }
    )
  ] });
});
export {
  TextInput as T
};
