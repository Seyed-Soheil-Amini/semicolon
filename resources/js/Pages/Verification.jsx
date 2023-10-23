import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useBlockBlogs, useGetPendingBlogs, useVerifyBlogs } from "@/hooks";
import { Head } from "@inertiajs/react";
import { isEmpty } from "lodash";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import VerificationCard from "@/Components/Verify/VerifyBlogCard";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer, toast } from "react-toastify";

const Verification = ({ auth }) => {
    const {
        data: blogs,
        isLoading,
        isFetching,
        isSuccess,
        isRefetching,
    } = useGetPendingBlogs();

    const { data: verified, mutateAsync: verify } = useVerifyBlogs();
    const { data: blocked, mutateAsync: block } = useBlockBlogs();

    const [checkedItems, setCheckedItems] = useState([]);

    useEffect(() => {
        !isLoading &&
            setCheckedItems(
                blogs.map((blog) => ({ id: blog.id, checked: false }))
            );
    }, [isLoading]);

    useEffect(() => {
        isRefetching
            ? toast.loading("Receiveing the new data...", {
                  toastId: "loading",
              })
            : toast.dismiss("loading");
    }, [isRefetching]);

    const handleCheckboxChange = (id, newState) => {
        setCheckedItems(() => {
            return checkedItems.map((item) => {
                return item.id == id
                    ? { id: item.id, checked: !newState }
                    : item;
            });
        });
    };

    const handleClickVerify = () => {
        const arrayIds = checkedItems
            .filter((blog) => blog.checked)
            .map((blog) => blog.id);
        try {
            toast.promise(async () => await Promise.resolve(verify(arrayIds)), {
                pending: "Verifing...",
                success: {
                    render() {
                        !isLoading &&
                            setCheckedItems(
                                blogs.map((blog) => ({
                                    id: blog.id,
                                    checked: false,
                                }))
                            );
                        return "Blogs are verified successfully.";
                    },
                },
                error: {
                    render({ data }) {
                        if (data.response && data.response.status === 400) {
                            return "Blog not found";
                        } else {
                            return "Unfortunately, there is a problem in the process of publishing the blog.";
                        }
                    },
                },
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleClickBlock = () => {
        const arrayIds = checkedItems
            .filter((blog) => blog.checked)
            .map((blog) => blog.id);
        try {
            toast.promise(async () => await Promise.resolve(block(arrayIds)), {
                pending: "Blocking...",
                success: {
                    render() {
                        !isLoading &&
                            setCheckedItems(
                                blogs.map((blog) => ({
                                    id: blog.id,
                                    checked: false,
                                }))
                            );
                        return "Blogs are blocked successfully.";
                    },
                },
                error: {
                    render({ data }) {
                        if (data.response && data.response.status === 400) {
                            return "Blog not found";
                        } else {
                            return "Unfortunately, there is a problem in the process of blocking the blog.";
                        }
                    },
                },
            });
        } catch (error) {
            console.log(error);
        }
    };

    const handleCancleClick = () => {
        setCheckedItems(
            blogs.map((blog) => ({
                id: blog.id,
                checked: false,
            }))
        );
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Verification" />
            <ToastContainer position="top-center" />
            {!isLoading ? (
                <div className="container-fluid flex min-h-screen">
                    {!isEmpty(blogs) && !isEmpty(checkedItems) ? (
                        <>
                            <div className="text-gray-200 grid grid-cols-1 gap-4 my-4 px-3 py-5 rounded w-6.5/7 mx-auto">
                                {!checkedItems.every(
                                    (el) => el.checked === false
                                ) && (
                                    <div className="flex">
                                        <div className="flex justify-between w-1/6">
                                            <button
                                                type="button"
                                                class="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                                                onClick={handleClickVerify}
                                            >
                                                Verify
                                            </button>
                                            <button
                                                type="button"
                                                class="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900"
                                                onClick={handleClickBlock}
                                            >
                                                Block
                                            </button>
                                        </div>
                                        <div className="flex justify-end w-6/7">
                                            <button
                                                type="button"
                                                class="text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 dark:focus:ring-cyan-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center mr-2 mb-2"
                                                onClick={handleCancleClick}
                                            >
                                                Cancle
                                            </button>
                                        </div>
                                    </div>
                                )}
                                <ul>
                                    {blogs.map((blog) => (
                                        <li>
                                            <VerificationCard
                                                blog={blog}
                                                checkBox={
                                                    checkedItems.filter(
                                                        (el) => el.id == blog.id
                                                    )[0]
                                                }
                                                onChengeCheckBox={
                                                    handleCheckboxChange
                                                }
                                            />
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center w-3/5 mx-auto text-center h-screen">
                            <h3 className="text-gray-200 mx-auto text-4xl">
                                There are no pending blogs.
                            </h3>
                        </div>
                    )}
                </div>
            ) : (
                <div className="h-full mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-5 lg:max-w-7xl lg:px-8 mt-10">
                    <div className="flex-row mt-0 grid gap-y-5 items-center">
                        {[...Array(6)].map((_, index) => (
                            <div
                                className="flex container-fluid bg-gray-900 rounded-lg p-3 justify-between"
                                key={index}
                            >
                                <SkeletonTheme
                                    baseColor="#171717"
                                    highlightColor="#444"
                                >
                                    <Skeleton
                                        className="flex flex-col md:flex-row"
                                        height={170}
                                        width={200}
                                    ></Skeleton>
                                    <div className="flex-row mx-2 my-10">
                                        <SkeletonTheme
                                            baseColor="#171717"
                                            highlightColor="#444"
                                        >
                                            <Skeleton
                                                className=""
                                                height={15}
                                                width={250}
                                            />
                                            <Skeleton
                                                className=""
                                                height={15}
                                                width={250}
                                            />
                                            <Skeleton height={5} width={150} />
                                            <Skeleton height={20} width={100} />
                                        </SkeletonTheme>
                                    </div>
                                    <div className="w-full md:w-3/7 my-auto mx-4">
                                        <Skeleton height={5} width={450} />
                                        <Skeleton height={5} width={450} />
                                        <Skeleton height={5} width={450} />
                                        <Skeleton height={5} width={450} />
                                        <Skeleton height={5} width={450} />
                                        <Skeleton height={5} width={450} />
                                    </div>
                                    <div className="justify-end mt-3">
                                        <Skeleton height={40} width={80} />
                                    </div>
                                </SkeletonTheme>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
};

export default Verification;
