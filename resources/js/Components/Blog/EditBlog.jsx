import { useEffect, useState } from "react";
import BlogCard from "./BlogCard";
import BlogEditForm from "./BlogEditForm";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer, toast } from "react-toastify";
import { isEmpty } from "lodash";
import { useAllBlogs, useDeleteBlog } from "@/hooks";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import PrimaryButton from "../PrimaryButton";

const EditBlog = (props) => {
    const { data: blogs, isLoading, isRefetching } = useAllBlogs(props.user.id);
    const {
        data: deletedBlog,
        mutateAsync: deleteBlog,
        isLoading: deleting,
        isSuccess: deleteOk,
        isError: deleteError,
    } = useDeleteBlog();
    const [selectedBlog, setSelectedBlog] = useState(null);

    useEffect(() => {
        isRefetching
            ? toast.loading("Receiveing the new data...", {
                  toastId: "loading",
              })
            : toast.dismiss("loading");
    }, [isRefetching]);

    return (
        <div className="w-full bg-gray-700">
            {!isLoading ? (
                <>
                    <ToastContainer position="top-center" />
                    {!isEmpty(blogs) ? (
                        <>
                            <div className="bg-gray-950 h-full mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-5 lg:max-w-7xl lg:px-8">
                                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:gap-x-8">
                                    {blogs.map((blog) => (
                                        <BlogCard
                                            blog={blog}
                                            parent={"edit"}
                                            onClickEdit={handleEditBlog}
                                            onClickDelete={handleDeleteBlog}
                                        />
                                    ))}
                                </div>
                            </div>
                        </>
                    ) : (
                        <div className="flex w-3/5 mx-auto text-center h-screen">
                            <div className="flex-row w-full">
                                <h3 className="text-gray-200 mx-auto text-4xl mt-10">
                                    There are no blogs.
                                </h3>
                                <div className="items-center mt-4">
                                    <PrimaryButton
                                        onClick={() => props.onClickCreate()}
                                    >
                                        Create New Blog
                                    </PrimaryButton>
                                </div>
                            </div>
                        </div>
                    )}
                    {selectedBlog && (
                        <BlogEditForm
                            blog={selectedBlog}
                            isOpen={true}
                            onClose={handleCancelEdit}
                            onSave={handleEditSave}
                        />
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

    function handleEditBlog(blog) {
        setSelectedBlog(blog);
    }

    function handleCancelEdit() {
        setSelectedBlog(null);
    }

    function handleEditSave() {
        setSelectedBlog(null);
    }

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

export default EditBlog;
