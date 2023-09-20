import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer, toast } from "react-toastify";
import BlogCard from "./BlogCard";
import { useEffect } from "react";
import { useAllBlogs, useDeleteBlog } from "@/hooks";
import { isEmpty } from "lodash";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const BlockedBlog = (props) => {
    const { data: blogs, isLoading, isRefetching } = useAllBlogs(props.user.id);
    const {
        data: deletedBlog,
        mutateAsync: deleteBlog,
        isLoading: deleting,
        isSuccess: deleteOk,
        isError: deleteError,
    } = useDeleteBlog();

    useEffect(() => {
        isRefetching
            ? toast.loading("Receiveing the new data...", {
                  toastId: "loading",
              })
            : toast.dismiss("loading");
    }, [isRefetching]);

    return (
        <div className="w-full h-screen bg-gray-700">
            {!isLoading ? (
                <>
                    <ToastContainer position="top-center" />
                    {blogs.every((blog) => blog.status === "block") && !isEmpty(blogs) ? (
                        <>
                            <div className="bg-gray-950 h-full mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-5 lg:max-w-7xl lg:px-8">
                                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                                    {blogs.map((blog) => {
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
                                    })}
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
