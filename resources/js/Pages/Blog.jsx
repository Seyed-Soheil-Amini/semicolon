import React, { useState, useEffect } from "react";
import HeaderLayouts from "@/Layouts/Header";
import InfiniteScroll from "react-infinite-scroll-component";
import { useRandomBlogs } from "@/hooks";
import { isEmpty } from "lodash";
import RandomBlogCard from "@/Components/Blog/RandomBlogCard";
import LoadingSkeleton from "@/Components/LoadingSkeleton";
import FooterLayout from "@/Layouts/Footer";
import Fuse from "fuse.js";

const Blog = ({ auth }) => {
    const [filter, setFilter] = useState(() => {
        return JSON.parse(localStorage.getItem("filter")) || "all";
    });

    const {
        data: blogs,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage,
        isLoading,
    } = useRandomBlogs(filter);

    const [searchBlog, setSearchBlog] = useState();
    const [suitableArrayBlogToSearch, setSuitableArrayBlogToSearch] = useState(
        []
    );

    useEffect(() => {
        if (!isEmpty(blogs)) {
            const combinedBlogs = blogs.pages.flatMap((page) => page.data);
            setSuitableArrayBlogToSearch(combinedBlogs);
        }
    }, [blogs]);

    const optionsFuseAlogrithm = {
        keys: ["title"],
        threshold: 0.3,
    };
    const fuse = new Fuse(suitableArrayBlogToSearch, optionsFuseAlogrithm);

    const handleSearchBlogChange = (event) => {
        setSearchBlog(event.target.value);
    };

    const handleFilterChange = (newFilter) => {
        localStorage.setItem("filter", JSON.stringify(newFilter));
        setFilter(newFilter);
    };

    return (
        <>
            {" "}
            <HeaderLayouts auth={auth} />
            <div className="bg-gray-900 pt-16 sm:pt-20">
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
                        <div className="flex justify-between pb-4">
                            <label htmlFor="table-search" className="sr-only">
                                Search
                            </label>
                            <div className="relative mt-1 mx-8">
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
                                    className="block pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                    placeholder="Search for blogs based on name"
                                    onChange={handleSearchBlogChange}
                                />
                            </div>
                        </div>
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
                            {isEmpty(searchBlog) ? (
                                !isEmpty(blogs) && (
                                    <InfiniteScroll
                                        dataLength={blogs.pages.length}
                                        next={() => fetchNextPage()}
                                        hasMore={hasNextPage}
                                        loader={
                                            isFetchingNextPage && (
                                                <p>Loading...</p>
                                            )
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
                                )
                            ) : (
                                <div className="h-full mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-5 lg:max-w-7xl lg:px-8 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                                    {fuse.search(searchBlog).map((res) => (
                                        <RandomBlogCard
                                            key={res.item.id}
                                            blog={res.item}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>{" "}
                    </div>
                )}
            </div>
            <FooterLayout />
        </>
    );
};

export default Blog;
