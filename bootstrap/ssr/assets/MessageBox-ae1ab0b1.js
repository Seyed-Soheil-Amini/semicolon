import { jsxs, jsx, Fragment } from "react/jsx-runtime";
import { k as useGetMessages, l as useDeleteMessages } from "./index-72e73b3b.js";
import { useState, useEffect } from "react";
import { A as Authenticated } from "./AuthenticatedLayout-9e7d963a.js";
import InfiniteScroll from "react-infinite-scroll-component";
import { isEmpty } from "lodash";
/* empty css                            */import { ToastContainer, toast } from "react-toastify";
import Fuse from "fuse.js";
import "axios";
import "react-query";
import "./ApplicationLogo-fd1fea94.js";
import "@inertiajs/react";
import "@headlessui/react";
const MessageCard = ({ message, onSelect, selected }) => {
  const [checked, setChecked] = useState(false);
  return /* @__PURE__ */ jsxs("div", { className: "flex border border-base-300 rounded-md bg-gray-900 mb-5", children: [
    /* @__PURE__ */ jsxs("div", { className: "flex items-center px-2 custom-checkbox", children: [
      /* @__PURE__ */ jsx(
        "input",
        {
          id: `${message.id}`,
          type: "checkbox",
          className: `w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600`,
          onChange: () => onSelect(message.id),
          checked: selected
        }
      ),
      /* @__PURE__ */ jsx("label", { htmlFor: `${message.id}`, className: "sr-only", children: "checkbox" })
    ] }),
    /* @__PURE__ */ jsxs("div", { className: "collapse collapse-arrow", children: [
      /* @__PURE__ */ jsx("input", { type: "radio", name: "my-accordion-4", checked }),
      /* @__PURE__ */ jsxs(
        "div",
        {
          className: "collapse-title text-xl font-medium flex justify-between",
          onClick: () => setChecked(!checked),
          children: [
            /* @__PURE__ */ jsxs("div", { className: "flex-row", children: [
              /* @__PURE__ */ jsx("h2", { className: "text-md font-semibold text-gray-300", children: message.subject }),
              /* @__PURE__ */ jsx("p", { className: "text-sm font-serif pt-1 text-gray-400", children: message.sender_name })
            ] }),
            /* @__PURE__ */ jsx("div", { className: "my-auto text-sm font-mono", children: message.email })
          ]
        }
      ),
      /* @__PURE__ */ jsx("div", { className: "collapse-content", children: /* @__PURE__ */ jsx("p", { className: "text-md py-3", children: message.body }) })
    ] })
  ] });
};
const MesssageLoadingSkeleton = () => {
  return /* @__PURE__ */ jsxs("div", { className: "flex items-center mx-10 justify-between pt-10 bg-gray-900 rounded", children: [
    /* @__PURE__ */ jsxs("div", { className: "my-auto px-4 pb-5", children: [
      /* @__PURE__ */ jsx("div", { className: "h-3 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" }),
      /* @__PURE__ */ jsx("div", { className: "w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" })
    ] }),
    /* @__PURE__ */ jsx("div", { className: "h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-40 mb-10" })
  ] });
};
const MessageBox = ({ auth }) => {
  const {
    data: messages,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isFetching
  } = useGetMessages();
  const { mutateAsync: deleteMessages } = useDeleteMessages();
  const [selectedMessages, setSelectedMessages] = useState([]);
  const [searchMessage, setSearchMessage] = useState();
  const [suitableArrayMessageToSearch, setSuitableArrayMessageToSearch] = useState([]);
  useEffect(() => {
    if (!isEmpty(messages)) {
      const combinedMessages = messages.pages.flatMap(
        (page) => page.data
      );
      setSuitableArrayMessageToSearch(combinedMessages);
    }
  }, [messages]);
  const optionsFuseAlogrithm = {
    keys: ["subject"],
    threshold: 0.3
  };
  const fuse = new Fuse(suitableArrayMessageToSearch, optionsFuseAlogrithm);
  const handleSearchMessageChange = (event) => {
    setSearchMessage(event.target.value);
  };
  function handleCheckboxChange(messagesId) {
    if (selectedMessages.includes(messagesId)) {
      setSelectedMessages(
        selectedMessages.filter((id) => id !== messagesId)
      );
    } else {
      setSelectedMessages([...selectedMessages, messagesId]);
    }
  }
  const handleSelectAllMessages = () => {
    var idsArray = [];
    messages.pages.map(
      (page) => page.data.map((mes) => {
        idsArray = idsArray.concat(mes.id);
      })
    );
    setSelectedMessages(idsArray);
  };
  const handleCancleSelected = () => {
    setSelectedMessages([]);
  };
  const handleDeleteMessage = () => {
    try {
      toast.promise(
        async () => await Promise.resolve(deleteMessages(selectedMessages)),
        {
          pending: "Removing...",
          success: {
            render() {
              setSelectedMessages([]);
              return "Messages are deleted successfully.";
            }
          },
          error: {
            render({ data }) {
              if (data.response && data.response.status === 400) {
                return "Message not found";
              } else {
                return "Unfortunately, there is a problem in the process of deleting the message.";
              }
            }
          }
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  return /* @__PURE__ */ jsxs("div", { className: "bg-gray-950 min-h-screeh", children: [
    /* @__PURE__ */ jsx(Authenticated, { user: auth.user }),
    /* @__PURE__ */ jsx(ToastContainer, { position: "top-center" }),
    isLoading ? /* @__PURE__ */ jsx(Fragment, { children: /* @__PURE__ */ jsxs(
      "div",
      {
        role: "status",
        className: "p-4 mt-10 space-y-4 border border-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700",
        children: [
          [...Array(6)].map((_, index) => /* @__PURE__ */ jsx("div", { children: /* @__PURE__ */ jsx(MesssageLoadingSkeleton, {}) }, index)),
          /* @__PURE__ */ jsx("span", { className: "sr-only", children: "Loading..." })
        ]
      }
    ) }) : /* @__PURE__ */ jsx("div", { className: "container-fluid flex pt-8", children: /* @__PURE__ */ jsxs("div", { className: "join join-vertical w-full mx-5", children: [
      !isEmpty(messages) && /* @__PURE__ */ jsxs("div", { className: "flex justify-between mx-10", children: [
        /* @__PURE__ */ jsxs("div", { className: "flex", children: [
          /* @__PURE__ */ jsx(
            "label",
            {
              htmlFor: "table-search",
              className: "sr-only",
              children: "Search"
            }
          ),
          /* @__PURE__ */ jsxs("div", { className: "relative", children: [
            /* @__PURE__ */ jsx("div", { className: "absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none", children: /* @__PURE__ */ jsx(
              "svg",
              {
                className: "w-4 h-4 text-gray-500 dark:text-gray-400",
                "aria-hidden": "true",
                xmlns: "http://www.w3.org/2000/svg",
                fill: "none",
                viewBox: "0 0 20 20",
                children: /* @__PURE__ */ jsx(
                  "path",
                  {
                    stroke: "currentColor",
                    strokeLinecap: "round",
                    strokeLinejoin: "round",
                    strokeWidth: 2,
                    d: "m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                  }
                )
              }
            ) }),
            /* @__PURE__ */ jsx(
              "input",
              {
                type: "text",
                id: "table-search",
                className: "block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500",
                placeholder: "Search for message based on subject",
                onChange: handleSearchMessageChange,
                disabled: isFetching
              }
            )
          ] }),
          /* @__PURE__ */ jsx("div", { className: "items-center", children: /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: "text-gray-200 bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center ml-2",
              onClick: handleSelectAllMessages,
              children: "Select All"
            }
          ) })
        ] }),
        !isEmpty(selectedMessages) && /* @__PURE__ */ jsxs("div", { children: [
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              className: "text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2 text-center mr-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800",
              onClick: handleCancleSelected,
              children: "Cancle"
            }
          ),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              class: "text-red-700 hover:text-gray-200 border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-4 py-2 text-center mr-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900",
              onClick: handleDeleteMessage,
              children: "Delete"
            }
          )
        ] })
      ] }),
      !isEmpty(messages) && /* @__PURE__ */ jsx(
        InfiniteScroll,
        {
          dataLength: messages.pages.length,
          next: () => fetchNextPage(),
          hasMore: hasNextPage,
          loader: isFetchingNextPage && /* @__PURE__ */ jsx("p", { children: "Loading..." }),
          className: "flex-row",
          children: /* @__PURE__ */ jsx("div", { className: "h-full mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-5 lg:max-w-7xl lg:px-8", children: isEmpty(searchMessage) ? messages.pages.map(
            (page) => page.data.map((message) => /* @__PURE__ */ jsx(
              MessageCard,
              {
                message,
                onSelect: handleCheckboxChange,
                selected: selectedMessages.includes(
                  message.id
                )
              }
            ))
          ) : fuse.search(searchMessage).map((res) => /* @__PURE__ */ jsx(
            MessageCard,
            {
              message: res.item,
              onSelect: handleCheckboxChange,
              selected: selectedMessages.includes(
                res.item.id
              )
            }
          )) })
        }
      )
    ] }) })
  ] });
};
export {
  MessageBox as default
};
