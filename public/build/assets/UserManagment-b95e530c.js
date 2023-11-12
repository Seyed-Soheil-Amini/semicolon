import{j as e,r as m,a as N}from"./app-23e59b41.js";import{n as w,o as v}from"./index-aef4e9b2.js";import{A as U}from"./AuthenticatedLayout-b15faaed.js";import{l as o}from"./lodash-b0739673.js";import{a as A}from"./index.esm-e27479c4.js";import{k as C,Q as S}from"./react-toastify.esm-2ff0bd8a.js";import{F}from"./fuse.esm-88e2763d.js";import"./ApplicationLogo-2e86c49f.js";import"./transition-a14f84a6.js";const x=({user:s,self:a,onSelect:n,selected:c})=>e.jsxs("tr",{className:`border-b border-gray-700 rounded-lg ${a&&"bg-gray-900"}`,children:[e.jsx("td",{className:"w-4 p-4",children:e.jsxs("div",{className:"flex items-center",children:[e.jsx("input",{id:`${s.id}`,type:"checkbox",className:`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded ${!a&&"cursor-pointer"} focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600`,onChange:()=>n(s.id),disabled:a,checked:c}),e.jsx("label",{htmlFor:`${s.id}`,className:"sr-only",children:"checkbox"})]})}),e.jsx("td",{className:"px-6 py-4",children:o.isEmpty(s.image)?e.jsx(A,{className:"text-3xl text-gray-300"}):e.jsx("img",{src:`${location.origin}/storage/${s.image}`,alt:"User Image",class:"h-8 w-8 rounded-full"})}),e.jsx("th",{scope:"row",className:"px-6 py-4 font-semibold whitespace-nowrap",children:e.jsx("a",{href:route("showUser",btoa(s.id)),rel:"noopener noreferrer",onClick:i=>i.stopPropagation(),target:"_blank",as:"a",children:e.jsx("h2",{className:`hover:text-blue-500 ${s.isAdmin?"text-yellow-500":"text-gray-200"}`,children:s.name})})}),e.jsx("td",{className:"px-6 py-4",children:s.job_title}),e.jsx("td",{className:"px-6 py-4",children:s.email}),e.jsx("td",{className:"px-6 py-4",children:s.last_blog_time}),e.jsx("td",{className:"px-6 py-4 font-medium",children:s.blog_count})]}),E=()=>e.jsxs("div",{className:"flex items-center justify-between pt-4",children:[e.jsx("svg",{class:"w-8 h-8 text-gray-200 dark:text-gray-700 mr-4","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"currentColor",viewBox:"0 0 20 20",children:e.jsx("path",{d:"M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm0 5a3 3 0 1 1 0 6 3 3 0 0 1 0-6Zm0 13a8.949 8.949 0 0 1-4.951-1.488A3.987 3.987 0 0 1 9 13h2a3.987 3.987 0 0 1 3.951 3.512A8.949 8.949 0 0 1 10 18Z"})}),e.jsxs("div",{children:[e.jsx("div",{className:"h-2.5 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5"}),e.jsx("div",{className:"w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700"})]}),e.jsx("div",{className:"h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-32"}),e.jsx("div",{className:"h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-12"}),e.jsx("div",{className:"h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-4"})]}),G=({auth:s})=>{const{data:a,isLoading:n,isFetching:c}=w(),{data:i,mutateAsync:p}=v(),[t,d]=m.useState([]),[g,u]=m.useState(),b={keys:["name"],threshold:.3},y=new F(a,b);function h(r){t.includes(r)?d(t.filter(l=>l!==r)):d([...t,r])}const f=r=>{u(r.target.value)},j=()=>{try{S.promise(async()=>await Promise.resolve(p(t)),{pending:"Removing...",success:{render(){return!n&&d([]),"Users are deleted successfully."}},error:{render({data:r}){return r.response&&r.response.status===404?"User not found":"Unfortunately, there is a problem in the process of deleting the user."}}})}catch(r){console.log(r)}},k=r=>{r.target.checked?d(a.filter(l=>l.isAdmin===0).map(l=>l.id)):d([])};return e.jsxs(U,{user:s.user,children:[e.jsx(C,{position:"top-center"}),e.jsx(N,{title:"User Manager"}),e.jsx("div",{className:"min-h-screen shadow-md sm:rounded-lg px-10 pt-10",children:n?e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"h-8 bg-gray-300 rounded-full dark:bg-gray-700 w-1/5 mt-5 mb-8 shadow animate-pulse"}),e.jsxs("div",{role:"status",className:"p-4 space-y-4 border border-gray-200 divide-y divide-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700",children:[[...Array(6)].map((r,l)=>e.jsx("div",{children:e.jsx(E,{})},l)),e.jsx("span",{className:"sr-only",children:"Loading..."})]})]}):e.jsxs(e.Fragment,{children:[e.jsxs("div",{className:"flex justify-between pb-4",children:[e.jsx("label",{htmlFor:"table-search",className:"sr-only",children:"Search"}),e.jsxs("div",{className:"relative mt-1",children:[e.jsx("div",{className:"absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none",children:e.jsx("svg",{className:"w-4 h-4 text-gray-500 dark:text-gray-400","aria-hidden":"true",xmlns:"http://www.w3.org/2000/svg",fill:"none",viewBox:"0 0 20 20",children:e.jsx("path",{stroke:"currentColor",strokeLinecap:"round",strokeLinejoin:"round",strokeWidth:2,d:"m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"})})}),e.jsx("input",{type:"text",id:"table-search",className:"block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",placeholder:"Search for users based on name",onChange:f})]}),!o.isEmpty(t)&&e.jsx("div",{className:"",children:e.jsx("button",{type:"button",class:"text-red-700 hover:text-gray-200 border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-1.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900",onClick:j,children:"Delete"})})]}),e.jsxs("table",{className:"w-full text-sm text-left text-gray-400 rounded-lg",children:[e.jsx("thead",{className:"text-md uppercase bg-gray-700 text-gray-400 rounded-lg",children:e.jsxs("tr",{children:[e.jsx("th",{scope:"col",className:"p-4",children:e.jsxs("div",{className:"flex items-center",children:[e.jsx("input",{id:"checkbox-all-search",type:"checkbox",className:"w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded cursor-pointer focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600",onChange:k}),e.jsx("label",{htmlFor:"checkbox-all-search",className:"sr-only",children:"checkbox"})]})}),e.jsx("th",{scope:"col",className:"px-6 py-3 underline",children:"Icon"}),e.jsx("th",{scope:"col",className:"px-6 py-3 underline",children:"User name"}),e.jsx("th",{scope:"col",className:"px-6 py-3 underline",children:"Expertise"}),e.jsx("th",{scope:"col",className:"px-6 py-3 underline",children:"Email"}),e.jsx("th",{scope:"col",className:"px-6 py-3 underline",children:"Last Blog"}),e.jsx("th",{scope:"col",className:"px-6 py-3 underline",children:"Blogs"})]})}),e.jsx("tbody",{children:o.isEmpty(g)?a.map(r=>e.jsx(x,{user:r,onSelect:h,self:r.id===s.user.id,selected:t.includes(r.id)})):y.search(g).map(r=>e.jsx(x,{user:r.item,onSelect:h,self:r.item.id===s.user.id,selected:t.includes(r.item.id)}))})]})]})})]})};export{G as default};