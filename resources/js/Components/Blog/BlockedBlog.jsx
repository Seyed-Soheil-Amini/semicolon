import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer, toast } from "react-toastify";
import BlogCard from "./BlogCard";
import { useEffect, useState } from "react";
import { useAllBlogs, useDeleteBlog } from "@/hooks";
import { isEmpty } from "lodash";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Fuse from "fuse.js";

const BlockedBlog = (props) => {
    const { data: blogs, isLoading, isRefetching } = useAllBlogs(props.user.id);
    const {
        data: deletedBlog,
        mutateAsync: deleteBlog,
        isLoading: deleting,
        isSuccess: deleteOk,
        isError: deleteError,
    } = useDeleteBlog();
    const [searchBlog, setSearchBlog] = useState();

    const optionsFuseAlogrithm = {
        keys: ["title"],
        threshold: 0.3,
    };
    const fuse = new Fuse(blogs, optionsFuseAlogrithm);

    const handleSearchBlogChange = (event) => {
        setSearchBlog(event.target.value);
    };

    useEffect(() => {
        isRefetching
            ? toast.loading("Receiveing the new data...", {
                  toastId: "loading",
              })
            : toast.dismiss("loading");
    }, [isRefetching]);

    return (
        <div className="w-full h-screen">
            {!isLoading ? (
                <>
                    <ToastContainer position="top-center" />
                    {!isEmpty(blogs) &&
                    blogs.some((blog) => blog.status === "block") ? (
                        <>
                            <div className="flex justify-between pb-4">
                                <label
                                    htmlFor="table-search"
                                    className="sr-only"
                                >
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
                                        className="block p-2 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Search for users based on name"
                                        onChange={handleSearchBlogChange}
                                    />
                                </div>
                            </div>
                            <div className="bg-gray-950 h-full mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-5 lg:max-w-7xl lg:px-8">
                                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                                    {isEmpty(searchBlog)
                                        ? blogs.map((blog) => {
                                              if (blog.status === "block")
                                                  return (
                                                      <BlogCard
                                                          blog={blog}
                                                          parent={"block"}
                                                          onClickDelete={
                                                              handleDeleteBlog
                                                          }
                                                      />
                                                  );
                                          })
                                        : fuse
                                              .search(searchBlog)
                                              .map((res) => (
                                                  <BlogCard
                                                      blog={res.item}
                                                      parent={"block"}
                                                      onClickDelete={
                                                          handleDeleteBlog
                                                      }
                                                  />
                                              ))}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center w-3/5 mx-auto text-center h-40">
                            <h3 className="text-gray-200 mx-auto text-4xl">
                                There are no blocked blogs.
                            </h3>
                        </div>
                    )}
                </>
            ) : (
                <div className="h-full mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-5 lg:max-w-7xl lg:px-8">
                    <div className="flex-col mt-0 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                        {[...Array(6)].map((_, index) => (
                            <div key={index}>
                                <SkeletonTheme
                                    baseColor="#171717"
                                    highlightColor="#444"
                                >
                                    <Skeleton height={240} />
                                    <Skeleton height={20} width={200} />
                                    <Skeleton height={60} count={2} />
                                </SkeletonTheme>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );

    function handleDeleteBlog(blogId) {
        toast.promise(async () => await Promise.resolve(deleteBlog(blogId)), {
            pending: "Deleting...",
            success: "Your Blog Was Deleted Successfully!",
            error: {
                render({ data }) {
                    if (data.response && data.response.status === 404) {
                        return "Blog not found";
                    } else {
                        return "Unfortunately, there is a problem in the process of deleting the blog.";
                    }
                },
            },
        });
    }
};

export default BlockedBlog;
