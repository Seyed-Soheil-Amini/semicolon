import React, { useEffect, useState } from "react";
import { FaUserCircle, FaEye, FaHeart, FaRegHeart } from "react-icons/fa";
import { isEmpty } from "lodash";
import { useAddView, useToggleLike } from "@/hooks";

const BlogPage = ({ blog }) => {
    const [ipAddress, setAddress] = useState(window.location.hostname);
    const [isLiked, setIsLiked] = useState(
        !isEmpty(blog.likkers) ? blog.likkers.includes(ipAddress) : false
    );
    const [likes, setLikes] = useState(blog.like);
    const handleClickLike = () => {
        setLikes(isLiked ? likes - 1 : likes + 1);
        useToggleLike(blog.id);
        setIsLiked(!isLiked);
    };

    useEffect(() => {
        const previousView = !isEmpty(blog.viewers)
            ? blog.viewers.find((viewer) => viewer.ip === ipAddress)
            : null;
        if (isEmpty(previousView)) useAddView(ipAddress, blog.id);
    }, []);
    return (
        <>
            <div className="container-fluid bg-gray-900">
                <button
                    type="button"
                    className="flex text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-2.5 py-1.5 text-center inline-flex items-center mr-2 my-2 mx-3"
                    onClick={() => window.history.back()}
                >
                    <svg
                        className="w-5 h-5 rotate-180 mr-1"
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
                    Back to{" "}
                    {JSON.parse(localStorage.getItem("filter")) || "all"} blogs
                </button>
                <div className="pt-1 px-5">
                    <div className="flex mt-0">
                        <div
                            className="flex-row px-3 w-1/2"
                            style={{ height: "92vh" }}
                        >
                            <img
                                src={`${location.origin}/storage/${blog.image}`}
                                alt="Blog Image"
                                className="shadow-inner shadow-3xl h-6/7 w-full rounded-lg"
                            />
                            <div className="flex justify-between w-1/2 h-1/7 px-3 py-3">
                                <div className="flex items-center">
                                    <FaEye className="mx-1 text-lg text-gray-300" />
                                    <b className="text-gray-400">{blog.view}</b>
                                </div>
                                <button
                                    className="flex items-center"
                                    onClick={handleClickLike}
                                >
                                    {isLiked ? (
                                        <FaHeart className="mx-1 text-lg text-red-500" />
                                    ) : (
                                        <FaRegHeart className="mx-1 text-lg text-red-500" />
                                    )}{" "}
                                    <b className="text-gray-400">{likes}</b>
                                </button>
                            </div>
                        </div>
                        <div className="flex-row mt-10 px-3 py-2 w-1/2 h-6/7">
                            <h1 className="flex text-4xl font-bold tracking-tight text-gray-200 sm:text-5xl pb-5">
                                <strong>{blog.title}</strong>
                            </h1>
                            <div className="flex items-center font-mono text-lg text-neutral-400">
                                <FaUserCircle
                                    className={`mr-2 text-5xl ${
                                        blog.user.isAdmin == 1 &&
                                        "text-amber-500"
                                    }`}
                                />
                                <h2 className=" text-2xl">
                                    <u>{blog.user.name}</u>
                                </h2>
                            </div>
                            {!isEmpty(blog.category) && (
                                <div className="mt-5">
                                    <h2 className="font-mono text-gray-200 text-xl">
                                        Category
                                    </h2>
                                    <div className="flex border border-gray-300 rounded-lg my-2"></div>
                                    <div className="flex rounded px-3 py-1 text-4xl font-semibold text-gray-300">
                                        <div className="flex">
                                            {blog.category.name}
                                        </div>
                                    </div>
                                </div>
                            )}
                            {!isEmpty(blog.labels) && (
                                <div className="mt-5">
                                    <h2 className="font-mono text-gray-200 text-xl">
                                        Labels
                                    </h2>
                                    <div className="flex border border-gray-300 rounded-lg my-2"></div>
                                    <div className="px-4 pt-1 pb-1 h-2/7">
                                        {blog.labels.map((label) => {
                                            return (
                                                <span className="inline-block bg-gray-500 rounded-full mx-3 px-4 py-2 text-lg font-semibold text-gray-200">
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
                        <p className="font-semibold text-gray-300 text-2xl pb-10 tracking-normal leading-relaxed capitalize">
                            {blog.body}
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BlogPage;
