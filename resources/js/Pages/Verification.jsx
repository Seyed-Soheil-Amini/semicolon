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
import { useTranslation } from "react-i18next";

const Verification = ({ auth }) => {
    const { t } = useTranslation();
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
            ? toast.loading(t("toast.vrf.lod"), {
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
                pending: t("toast.vrf.pnd"),
                success: {
                    render() {
                        !isLoading &&
                            setCheckedItems(
                                blogs.map((blog) => ({
                                    id: blog.id,
                                    checked: false,
                                }))
                            );
                        return t("toast.vrf.scs");
                    },
                },
                error: {
                    render({ data }) {
                        if (data.response && data.response.status === 400) {
                            return t("toast.vrf.nfn");
                        } else {
                            return t("toast.vrf.plb");
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
                pending: t("toast.vrf.pnd-b"),
                success: {
                    render() {
                        !isLoading &&
                            setCheckedItems(
                                blogs.map((blog) => ({
                                    id: blog.id,
                                    checked: false,
                                }))
                            );
                        return t("toast.vrf.scs-b");
                    },
                },
                error: {
                    render({ data }) {
                        if (data.response && data.response.status === 400) {
                            return t("toast.vrf.nfn-b");
                        } else {
                            return t("toast.vrf.plb-b");
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
                            <div className="text-gray-200 grid grid-cols-1 gap-4 my-4 px-3 py-5 rounded w-6.5/7 mx-auto h-1/5">
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
                                {t("dash.verf.noblg")}
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
            {!checkedItems.every((el) => el.checked === false) && (
                <div className="fixed bottom-0 w-full bg-gray-600 shadow-md">
                    <div className="flex justify-between px-10">
                        <div className="flex p-3 gap-x-4">
                            <button
                                type="button"
                                className="text-blue-600 tracking-wider font-bold hover:text-white bg-gray-950 outline ouline-blue-500 hover:bg-blue-600 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg text-sm md:text-base px-4 py-2 md:px-12 md:py-3 mr-3"
                                onClick={handleClickVerify}
                            >
                                {t("dash.verf.vrf-btn")}
                            </button>
                            <button
                                type="button"
                                className="text-red-600 tracking-wider font-bold hover:text-white bg-gray-950 outline outline-red-500 hover:bg-red-600 focus:ring-4 focus:outline-none focus:ring-red-300 rounded-lg text-sm md:text-base px-4 py-2 md:px-12 md:py-3 mr-3"
                                onClick={handleClickBlock}
                            >
                                {t("dash.verf.blk-btn")}
                            </button>
                        </div>
                        <div className="felx p-3">
                            <button
                                type="button"
                                className="flex my-auto text-white bg-gradient-to-r from-cyan-400 via-cyan-500 to-cyan-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-cyan-300 rounded-lg text-sm md:text-base px-4 py-2 md:px-12 md:py-3 mr-3"
                                onClick={handleCancleClick}
                            >
                                {t("dash.verf.cnl-btn")}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </AuthenticatedLayout>
    );
};

export default Verification;
