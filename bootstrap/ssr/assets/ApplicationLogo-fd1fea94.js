import { jsx, Fragment } from "react/jsx-runtime";
function ApplicationLogo(props) {
  const imgStyle = {
    borderRadius: "50%"
  };
  return /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsx(
    "img",
    {
      style: imgStyle,
      className: "border-logo w-40 h-32 mx-auto my-auto border-emerald-500",
      src: "/images/semicolon.jpg",
      alt: ""
    }
  ) });
}
export {
  ApplicationLogo as A
};
