import{r,j as e}from"./app-01dad521.js";import{n as l,o as u,p as c,q as f,r as m}from"./index.esm-45124c08.js";const b=r.forwardRef(function({type:i="text",className:o="",isFocused:d=!1,...t},s){const n=s||r.useRef();r.useEffect(()=>{d&&n.current.focus()},[]);let a;return t.id==="name"?a=e.jsx(l,{className:"w-5 h-5 absolute text-gray-400 ml-3 pointer-events-none","aria-hidden":"true"}):t.id==="email"?a=e.jsx(u,{className:"w-5 h-5 absolute text-gray-400 ml-3 pointer-events-none","aria-hidden":"true"}):t.id==="jobTitle"?a=e.jsx(c,{className:"w-5 h-5 absolute text-gray-400 ml-3 pointer-events-none","aria-hidden":"true"}):t.id==="about"?a=e.jsx(f,{className:"w-5 h-5 absolute text-gray-400 ml-3 pointer-events-none","aria-hidden":"true"}):a=e.jsx(m,{className:"w-5 h-5 absolute text-gray-400 ml-3 pointer-events-none","aria-hidden":"true"}),e.jsxs("div",{className:"font-sans relative flex items-center focus-within:text-gray-600",children:[a,e.jsx("input",{...t,type:i,className:"pr-3 pl-10 border-gray-300 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm input-with-icon"+o,ref:n})]})});export{b as T};