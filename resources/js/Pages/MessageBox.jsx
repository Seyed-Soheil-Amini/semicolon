import { useDeleteMessages, useGetMessages } from "@/hooks";
import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InfiniteScroll from "react-infinite-scroll-component";
import { isEmpty } from "lodash";
import MessageCard from "@/Components/Message/MessageCard";
import MesssageLoadingSkeleton from "@/Components/Message/MessageLoadingSkeleton";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer, toast } from "react-toastify";
import Fuse from "fuse.js";
import { useTranslation } from "react-i18next";

const MessageBox = ({ auth }) => {
    const { t } = useTranslation();
    const {
        data: messages,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
        isFetching,
    } = useGetMessages();

    const { mutateAsync: deleteMessages } = useDeleteMessages();
    const [selectedMessages, setSelectedMessages] = useState([]);
    const [searchMessage, setSearchMessage] = useState();

    const [suitableArrayMessageToSearch, setSuitableArrayMessageToSearch] =
        useState([]);

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
        threshold: 0.3,
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
        messages.pages.map((page) =>
            page.data.map((mes) => {
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
                async () =>
                    await Promise.resolve(deleteMessages(selectedMessages)),
                {
                    pending: "Removing...",
                    success: {
                        render() {
                            setSelectedMessages([]);
                            return "Messages are deleted successfully.";
                        },
                    },
                    error: {
                        render({ data }) {
                            if (data.response && data.response.status === 400) {
                                return "Message not found";
                            } else {
                                return "Unfortunately, there is a problem in the process of deleting the message.";
                            }
                        },
                    },
                }
            );
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className="bg-gray-950 h-auto overflow-x-auto">
            <AuthenticatedLayout user={auth.user} />
            <ToastContainer position="top-center" />
            {isLoading ? (
                <>
                    <div
                        role="status"
                        className="p-4 mt-5 md:mt-10 space-y-4 border border-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
                    >
                        {[...Array(6)].map((_, index) => (
                            <div key={index} className="p-2 md:p-6">
                                <MesssageLoadingSkeleton />
                            </div>
                        ))}
                        <span className="sr-only">
                            {t("dash.msg-box.lod-btn")}
                        </span>
                    </div>
                </>
            ) : (
                <div className="container-fluid flex pt-4">
                    <div className="join join-vertical w-full mx-5">
                        {!isEmpty(messages) && (
                            <div className="flex justify-between mx-0 md:mx-8">
                                <div className="flex flex-col md:flex-row md:justify-between pb-2 md:pb-4">
                                    <label
                                        htmlFor="table-search"
                                        className="sr-only"
                                    >
                                        Search
                                    </label>
                                    <div className="relative mt-1 mx-2 md:mx-8">
                                        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                            <svg
                                                className="w-4 h-4 text-gray-500 dark:text-gray-400"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="none"
                                                viewBox="0 0 20 20"
                                            >
                                                <path
                                                    stroke="currentColor"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    strokeWidth={2}
                                                    d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                                                />
                                            </svg>
                                        </div>
                                        <input
                                            type="text"
                                            id="table-search"
                                            className="block p-2 pl-10 text-xs md:text-sm text-gray-900 border border-gray-300 rounded-lg w-full md:w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder={t(
                                                "dash.msg-box.plc-hol-srh"
                                            )}
                                            onChange={handleSearchMessageChange}
                                        />
                                    </div>
                                    <div className="flex items-center justify-center md:justify-start mt-2 md:mt-0">
                                        <button
                                            type="button"
                                            className="text-gray-200 bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-xs md:text-sm px-2.5 py-2 md:px-5 md:py-2.5 text-center ml-2"
                                            onClick={handleSelectAllMessages}
                                        >
                                            {t("dash.msg-box.sel-btn")}
                                        </button>
                                    </div>
                                </div>
                                {!isEmpty(selectedMessages) && (
                                    <div className="flex-row md:flex-col">
                                        <button
                                            type="button"
                                            className="flex-row text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs md:text-sm px-2.5 py-2 md:px-5 md:py-2 text-center mr-1 mb-1 md:mr-2 md:mb-0 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                                            onClick={handleCancleSelected}
                                        >
                                            {t("dash.msg-box.cnl-btn")}
                                        </button>
                                        <button
                                            type="button"
                                            class="flex-row text-red-700 hover:text-gray-200 border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs md:text-sm px-2.5 py-2 md:px-5 md:py-2 text-center mr-1 mb-1 md:mr-2 mb-0 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                                            onClick={handleDeleteMessage}
                                        >
                                            {t("dash.msg-box.del-btn")}
                                        </button>
                                    </div>
                                )}
                            </div>
                        )}
                        {!isEmpty(messages) && (
                            <InfiniteScroll
                                dataLength={messages.pages.length}
                                next={() => fetchNextPage()}
                                hasMore={hasNextPage}
                                loader={isFetchingNextPage && <p>Loading...</p>}
                                className="flex-row"
                            >
                                <div className="h-full mx-auto max-w-2xl px-0 py-2 md:px-6 md:py-8 lg:max-w-7xl lg:px-8">
                                    {isEmpty(searchMessage)
                                        ? messages.pages.map((page) =>
                                              page.data.map((message) => (
                                                  <MessageCard
                                                      message={message}
                                                      onSelect={
                                                          handleCheckboxChange
                                                      }
                                                      selected={selectedMessages.includes(
                                                          message.id
                                                      )}
                                                  />
                                              ))
                                          )
                                        : fuse
                                              .search(searchMessage)
                                              .map((res) => (
                                                  <MessageCard
                                                      message={res.item}
                                                      onSelect={
                                                          handleCheckboxChange
                                                      }
                                                      selected={selectedMessages.includes(
                                                          res.item.id
                                                      )}
                                                  />
                                              ))}
                                </div>
                            </InfiniteScroll>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default MessageBox;
