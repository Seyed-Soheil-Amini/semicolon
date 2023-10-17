import { useGetMessages } from "@/hooks";
import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import InfiniteScroll from "react-infinite-scroll-component";
import { isEmpty } from "lodash";
import MessageCard from "@/Components/Message/MessageCard";
import MesssageLoadingSkeleton from "@/Components/Message/MessageLoadingSkeleton";

const MessageBox = ({ auth }) => {
    const {
        data: messages,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
    } = useGetMessages();

    return (
        <div className="bg-gray-950 min-h-screeh">
            <AuthenticatedLayout user={auth.user} />
            {isLoading ? (
                <>
                    <div
                        role="status"
                        className="p-4 mt-10 space-y-4 border border-gray-200 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700"
                    >
                        {[...Array(6)].map((_, index) => (
                            <div key={index}>
                                <MesssageLoadingSkeleton />
                            </div>
                        ))}
                        <span className="sr-only">Loading...</span>
                    </div>
                </>
            ) : (
                <div className="container-fluid flex pt-8">
                    <div className="join join-vertical w-full mx-5">
                        {!isEmpty(messages) && (
                            <InfiniteScroll
                                dataLength={messages.pages.length}
                                next={() => fetchNextPage()}
                                hasMore={hasNextPage}
                                loader={isFetchingNextPage && <p>Loading...</p>}
                                className="flex-row"
                            >
                                <div className="h-full mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-5 lg:max-w-7xl lg:px-8">
                                    {messages.pages.map((page) =>
                                        page.data.map((message) => (
                                            <MessageCard message={message} />
                                        ))
                                    )}
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
