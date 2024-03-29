import React, { useEffect, useState } from "react";
import { FaUserCircle, FaEye, FaHeart, FaRegHeart } from "react-icons/fa";
import { isEmpty } from "lodash";
import { useAddView, useToggleLike } from "@/hooks";
import getBrowserFingerprint from "get-browser-fingerprint";
import { useTranslation } from "react-i18next";

const BlogPage = ({ blog }) => {
    const { t } = useTranslation();

    const [fingerprint, setfingerprint] = useState(getBrowserFingerprint());
    const [isLiked, setIsLiked] = useState(
        !isEmpty(blog.likes)
            ? blog.likes.some((like) => like.fingerprint == fingerprint)
            : false
    );
    const [likes, setLikes] = useState(parseInt(blog.like));
    const handleClickLike = () => {
        try {
            useToggleLike(blog.id, fingerprint);
            setLikes(isLiked ? parseInt(likes - 1) : parseInt(likes + 1));
            setIsLiked(!isLiked);
        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        const previousView = !isEmpty(blog.viewers)
            ? blog.viewers.find((viewer) => viewer.ip == fingerprint)
            : null;
        if (isEmpty(previousView)) useAddView(fingerprint, blog.id);
    }, []);
    return (
        <>
            <div className="">
                <button
                    type="button"
                    className="flex text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-xs ms:text-sm px-1.5 md:px-2.5 py-1.5 text-center inline-flex items-center mr-2 my-2 mx-3"
                    onClick={() => window.history.back()}
                >
                    <svg
                        className="w-4 h-4 md:w-5 md:h-5 rotate-180 mr-1"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                    >
                        <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                    </svg>
                    <span className="sr-only">Icon description</span>
                    {t("blg-page.bck-btn")}{" "}
                    {JSON.parse(localStorage.getItem("filter")) || "all"}{" "}
                    {t("blg-page.blg")}
                </button>
                <div className="pt-1 px-5">
                    <div className="flex flex-col md:flex-row mt-0 h-auto md:h-screen">
                        <div className="flex-row px-3 w-full md:w-1/2">
                            <img
                                src={`${
                                    isEmpty(blog.image)
                                        ? "/images/altBlogImage.jpg"
                                        : `${location.origin}/storage/${blog.image}`
                                }`}
                                alt="Blog Image"
                                className="shadow-inner shadow-3xl h-5/7 md:h-6/7 w-full md:w-6.5/7 rounded-lg"
                            />
                            <div className="flex justify-between w-full md:w-1/2 h-1/7 px-3 py-3">
                                <div className="flex items-center">
                                    <FaEye className="mx-1 text-xl md:text-2xl text-gray-300" />
                                    <b className="text-gray-400 text-sm md:text-base">
                                        {blog.view}
                                    </b>
                                </div>
                                <button
                                    className="flex items-center p-2"
                                    onClick={handleClickLike}
                                >
                                    {isLiked ? (
                                        <FaHeart className="mx-1 text-lg md:text-2xl text-red-500 animate-ping-once" />
                                    ) : (
                                        <FaRegHeart className="mx-1 text-xl md:text-2xl text-red-500" />
                                    )}{" "}
                                    <b className="text-gray-400 text-sm md:text-base">
                                        {likes}
                                    </b>
                                </button>
                            </div>
                        </div>
                        <div className="flex-row mt-2 md:mt-10 pr-1 py-2 w-full md:w-1/2 h-auto md:h-6/7">
                            <h1 className="flex text-xl md:text-3xl font-bold tracking-tight text-gray-200 sm:text-5xl pb-2 md:pb-5">
                                <strong>{blog.title}</strong>
                            </h1>
                            <div className="flex items-center font-mono text-neutral-400">
                                {isEmpty(blog.user.image) ? (
                                    <FaUserCircle
                                        className={`mr-2 text-xl md:text-3xl ${
                                            blog.user.isAdmin == 1 &&
                                            "text-amber-500"
                                        }`}
                                    />
                                ) : (
                                    <img
                                        src={`${location.origin}/storage/${blog.user.image}`}
                                        className="rounded-full h-10 w-10 mr-2 "
                                    />
                                )}
                                <h2 className="text-lg md:text-2xl hover:text-blue-500">
                                    <a
                                        href={route(
                                            "showUser",
                                            btoa(blog.user.id)
                                        )}
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        target={"_blank"}
                                        as={"a"}
                                    >
                                        {blog.user.name}
                                    </a>
                                </h2>
                            </div>
                            {!isEmpty(blog.category) && (
                                <div className="mt-2.5 md:mt-5">
                                    <h2 className="font-mono text-gray-200 text-base md:text-xl">
                                        {t("blg-page.cat")}
                                    </h2>
                                    <div className="flex border border-gray-300 rounded-lg my-1 md:my-2"></div>
                                    <div className="flex rounded px-3 py-1 text-xl md:text-3xl font-semibold text-gray-300">
                                        <div className="flex">
                                            {blog.category.name}
                                        </div>
                                    </div>
                                </div>
                            )}
                            {!isEmpty(blog.labels) && (
                                <div className="mt-5">
                                    <h2 className="font-mono text-gray-200 text-base md:text-xl">
                                        {t("blg-page.lbl")}
                                    </h2>
                                    <div className="flex border border-gray-300 rounded-lg my-1 md:my-2"></div>
                                    <div className="px-4 pt-1 pb-1 h-2/7">
                                        {blog.labels.map((label) => {
                                            return (
                                                <span className="inline-block bg-gray-500 rounded-full mx-1 md:mx-3 px-2 md:px-4 py-1.5 md:py-2 text-sm md:text-base font-semibold text-gray-200">
                                                    #{label.name}
                                                </span>
                                            );
                                        })}
                                    </div>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="flex px-3">
                        <p className="font-semibold text-gray-300 text-sm md:text-xl pb-5 md:pb-10 tracking-normal leading-relaxed capitalize">
                            {blog.body}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlogPage;
