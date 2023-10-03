import React, { useState } from "react";
import HeaderLayouts from "@/Layouts/Header";
import InfiniteScroll from "react-infinite-scroll-component";
import { useRandomBlogs } from "@/hooks";
import { isEmpty } from "lodash";
import RandomBlogCard from "@/Components/Blog/RandomBlogCard";
import LoadingSkeleton from "@/Components/LoadingSkeleton";

const Blog = ({ auth }) => {
    const [filter, setFilter] = useState("all");

    const {
        data: blogs,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
    } = useRandomBlogs(filter);

    const handleFilterChange = (newFilter) => {
        setFilter(newFilter);
    };

    return (
        <>
            {" "}
            <HeaderLayouts auth={auth} />
            <div className="bg-gray-900 py-24 sm:py-32">
                {isLoading ? (
                    <div className="h-full mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-5 lg:max-w-7xl lg:px-8">
                        <div className="flex-col mt-0 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                            {[...Array(6)].map((_, index) => (
                                <div key={index}>
                                    <LoadingSkeleton />
                                </div>
                            ))}
                        </div>
                    </div>
                ) : (
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto lg:mx-0">
                            <nav className="flex justify-start my-1">
                                <ul className="flex space-x-4">
                                    <li>
                                        <button
                                            className={`inline-block font-mono ${
                                                filter === "all"
                                                    ? "bg-gray-200 text-gray-700"
                                                    : "bg-gray-700 text-gray-200"
                                            } rounded-full px-3 py-1 text-md font-semibold  hover:bg-gray-200 hover:text-gray-700`}
                                            onClick={() =>
                                                handleFilterChange("all")
                                            }
                                            disabled={filter === "all"}
                                        >
                                            All
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className={`inline-block font-mono ${
                                                filter === "popular"
                                                    ? "bg-gray-200 text-gray-700"
                                                    : "bg-gray-700 text-gray-200"
                                            } rounded-full px-3 py-1 text-md font-semibold  hover:bg-gray-200 hover:text-gray-700`}
                                            onClick={() =>
                                                handleFilterChange("popular")
                                            }
                                            disabled={filter === "popular"}
                                        >
                                            Popular
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className={`inline-block font-mono ${
                                                filter === "oldest"
                                                    ? "bg-gray-200 text-gray-700"
                                                    : "bg-gray-700 text-gray-200"
                                            } rounded-full px-3 py-1 text-md font-semibold  hover:bg-gray-200 hover:text-gray-700`}
                                            onClick={() =>
                                                handleFilterChange("oldest")
                                            }
                                            disabled={filter === "oldest"}
                                        >
                                            Oldest
                                        </button>
                                    </li>
                                    <li>
                                        <button
                                            className={`inline-block font-mono ${
                                                filter === "newest"
                                                    ? "bg-gray-200 text-gray-700"
                                                    : "bg-gray-700 text-gray-200"
                                            } rounded-full px-3 py-1 text-md font-semibold  hover:bg-gray-200 hover:text-gray-700`}
                                            onClick={() =>
                                                handleFilterChange("newest")
                                            }
                                            disabled={filter === "newest"}
                                        >
                                            Newest
                                        </button>
                                    </li>
                                </ul>
                            </nav>{" "}
                        </div>
                        <div className="mx-auto mt-0 border-t border-gray-200 pt-3 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3 w-full">
                            {!isEmpty(blogs) && (
                                <InfiniteScroll
                                    dataLength={blogs.pages.length}
                                    next={() => fetchNextPage()}
                                    hasMore={hasNextPage}
                                    loader={
                                        isFetchingNextPage && <p>Loading...</p>
                                    }
                                    className="flex-row"
                                >
                                    <div className="h-full mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-5 lg:max-w-7xl lg:px-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                                        {blogs.pages.map((page) =>
                                            page.data.map((blog) => (
                                                <RandomBlogCard
                                                    key={blog.id}
                                                    blog={blog}
                                                />
                                            ))
                                        )}
                                    </div>
                                </InfiniteScroll>
                            )}
                        </div>{" "}
                    </div>
                )}
            </div>
        </>
    );
};

export default Blog;
