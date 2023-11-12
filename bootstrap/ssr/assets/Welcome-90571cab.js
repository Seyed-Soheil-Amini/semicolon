import { jsxs, Fragment, jsx } from "react/jsx-runtime";
import { H as HeaderLayouts, F as FooterLayout } from "./Footer-c9844f58.js";
import { Link } from "@inertiajs/react";
import "react";
import "react-icons/fa/index.esm.js";
import "lodash";
function Welcome({ auth, laravelVersion, phpVersion }) {
  return /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(HeaderLayouts, { auth }),
    /* @__PURE__ */ jsx("div", { className: "hero_area", children: /* @__PURE__ */ jsx("section", { className: "slider_section position-relative", children: /* @__PURE__ */ jsx(
      "div",
      {
        id: "carouselExampleIndicators",
        className: "carousel slide",
        "data-ride": "carousel",
        children: /* @__PURE__ */ jsx("div", { className: "carousel-inner", children: /* @__PURE__ */ jsx("div", { className: "carousel-item active", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsx("div", { className: "row", children: /* @__PURE__ */ jsx("div", { className: "col-md-7", children: /* @__PURE__ */ jsx("div", { className: "detail-box", children: /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsxs("h1", { children: [
            "Welcome To ",
            /* @__PURE__ */ jsx("br", {}),
            /* @__PURE__ */ jsx("span", { children: "Semicolon official blog" })
          ] }),
          /* @__PURE__ */ jsx("p", { children: "This is the official website of Semicolon scientific team and it is at your service." }),
          /* @__PURE__ */ jsx("div", { className: "btn-box", children: /* @__PURE__ */ jsx(
            Link,
            {
              href: "/contactus",
              className: "btn-1",
              children: "Contact Us"
            }
          ) })
        ] }) }) }) }) }) }) })
      }
    ) }) }),
    /* @__PURE__ */ jsx("section", { className: "about_section layout_padding", children: /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsxs("div", { className: "row", children: [
      /* @__PURE__ */ jsx("div", { className: "col-md-6", children: /* @__PURE__ */ jsxs("div", { className: "detail-box", children: [
        /* @__PURE__ */ jsx("div", { className: "heading_container", children: /* @__PURE__ */ jsx("h2", { children: "About Us" }) }),
        /* @__PURE__ */ jsx("p", { children: "Semicolon scientific team was founded by computer students of Yazd University on June 22, 1401. This organization was formed for big goals and implementation of practical ideas in the field of technology in the form of web and application. This group is currently one of the active university teams in the field of software development and is currently registering ideas, this organization is currently a start-up company." }),
        /* @__PURE__ */ jsx(Link, { href: "/about", children: "Read More" })
      ] }) }),
      /* @__PURE__ */ jsx("div", { className: "col-md-6", children: /* @__PURE__ */ jsx("div", { className: "flex img-box", children: /* @__PURE__ */ jsx(
        "img",
        {
          className: "w-50 float-right",
          src: "images/team_logo.png",
          alt: ""
        }
      ) }) })
    ] }) }) }),
    /* @__PURE__ */ jsxs("div", { className: "body_bg layout_padding", children: [
      /* @__PURE__ */ jsxs("section", { className: "service_section ", children: [
        /* @__PURE__ */ jsx("div", { className: "container", children: /* @__PURE__ */ jsx("div", { className: "heading_container", children: /* @__PURE__ */ jsx("h2", { children: "Areas of Work and Development" }) }) }),
        /* @__PURE__ */ jsxs("div", { className: "container", children: [
          /* @__PURE__ */ jsxs("div", { className: "row", children: [
            /* @__PURE__ */ jsx("div", { className: "col-md-6", children: /* @__PURE__ */ jsxs("div", { className: "box", children: [
              /* @__PURE__ */ jsx("div", { className: "img-box", children: /* @__PURE__ */ jsx(
                "img",
                {
                  className: "w-25",
                  src: "images/development.png",
                  alt: ""
                }
              ) }),
              /* @__PURE__ */ jsx("h4", { children: "Software Development" }),
              /* @__PURE__ */ jsx("p", { children: "Our team is developing practical and idea-oriented software, these software are often in the form of web apps. You can submit your orders in this field to our specialists." })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "col-md-6", children: /* @__PURE__ */ jsxs("div", { className: "box align-items-end align-items-md-start text-right text-md-left", children: [
              /* @__PURE__ */ jsx("div", { className: "img-box", children: /* @__PURE__ */ jsx(
                "img",
                {
                  className: "w-25",
                  src: "images/unity.png",
                  alt: ""
                }
              ) }),
              /* @__PURE__ */ jsx("h4", { children: "Game Development" }),
              /* @__PURE__ */ jsx("p", { children: "We produce 2D and 3D indie games using the Unity engine. We are currently developing mobile games on the Android platform and are preparing the infrastructure for system production." })
            ] }) })
          ] }),
          /* @__PURE__ */ jsxs("div", { className: "row", children: [
            /* @__PURE__ */ jsx("div", { className: "col-md-6", children: /* @__PURE__ */ jsxs("div", { className: "box", children: [
              /* @__PURE__ */ jsx("div", { className: "img-box", children: /* @__PURE__ */ jsx(
                "img",
                {
                  className: "w-25",
                  src: "images/server.png",
                  alt: ""
                }
              ) }),
              /* @__PURE__ */ jsx("h4", { children: "Server Management" }),
              /* @__PURE__ */ jsx("p", { children: "Our team has the experience of working with Linux as one of the main operating systems used for the server, as well as working with web servers such as nginx to manage the server load, which allows it to be fully loaded after the website or application is designed. It is run and managed on the server." })
            ] }) }),
            /* @__PURE__ */ jsx("div", { className: "col-md-6", children: /* @__PURE__ */ jsxs("div", { className: "box align-items-end align-items-md-start text-right text-md-left", children: [
              /* @__PURE__ */ jsx("div", { className: "img-box", children: /* @__PURE__ */ jsx(
                "img",
                {
                  className: "w-25",
                  src: "images/ai.png",
                  alt: ""
                }
              ) }),
              /* @__PURE__ */ jsx("h4", { children: "Artificial Intelligence" }),
              /* @__PURE__ */ jsx("p", { children: "Our artificial intelligence expert team has the ability to carry out artificial intelligence projects, especially machine learning, with research and study in the fields of machine learning and data analysis. You can cooperate with us in the field of writing articles and research." })
            ] }) })
          ] })
        ] })
      ] }),
      /* @__PURE__ */ jsx(
        "hr",
        {
          className: "mx-auto my-4",
          style: {
            width: "90%",
            height: "1mm",
            border: "1px solid black",
            borderRadius: "3.5mm",
            color: "darkred"
          }
        }
      )
    ] }),
    /* @__PURE__ */ jsx("section", { className: "info_section layout_padding", children: /* @__PURE__ */ jsxs("div", { className: "footer_contact", children: [
      /* @__PURE__ */ jsx("div", { className: "heading_container", children: /* @__PURE__ */ jsx("h2", { children: "Contact Us" }) }),
      /* @__PURE__ */ jsxs("div", { className: "box", children: [
        /* @__PURE__ */ jsxs(Link, { href: "/contactus", className: "img-box", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: "images/location.png",
              alt: "",
              className: "img-1"
            }
          ),
          /* @__PURE__ */ jsx(
            "img",
            {
              src: "images/location-o.png",
              alt: "",
              className: "img-2"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(Link, { href: "contactus", className: "img-box", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: "images/call.png",
              alt: "",
              className: "img-1"
            }
          ),
          /* @__PURE__ */ jsx(
            "img",
            {
              src: "images/call-o.png",
              alt: "",
              className: "img-2"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs(Link, { href: "contactus", className: "img-box", children: [
          /* @__PURE__ */ jsx(
            "img",
            {
              src: "images/envelope.png",
              alt: "",
              className: "img-1"
            }
          ),
          /* @__PURE__ */ jsx(
            "img",
            {
              src: "images/envelope-o.png",
              alt: "",
              className: "img-2"
            }
          )
        ] })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(FooterLayout, {})
  ] });
}
export {
  Welcome as default
};
