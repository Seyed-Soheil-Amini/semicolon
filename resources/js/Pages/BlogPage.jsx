import React, { useEffect, useState } from "react";
import { FaUserCircle, FaEye, FaHeart, FaRegHeart } from "react-icons/fa";
import { isEmpty } from "lodash";
const BlogPage = ({ blog }) => {
    const [ipAddress, setAddress] = useState(window.location.hostname);
    const [isLiked, setIsLiked] = useState(
        !isEmpty(blog.viewers) ? blog.viewers.includes(ip) : false
    );

    const handleClickLike = () => {
        setIsLiked(!isLiked);
    };

    useEffect(() => {}, []);
    return (
        <>
            <div className="container-fluid bg-gray-900">
                <div className="pt-6 px-5">
                    <div className="flex mt-5">
                        <div className="flex-row px-3 w-1/2">
                            <img
                                src={`${location.origin}/storage/${blog.image}`}
                                alt="Blog Image"
                                className="shadow-inner shadow-3xl h-6/7 w-full rounded-lg object-cover object-center"
                            />
                            <div className="flex justify-between w-1/2 h-1/7 px-3 py-3">
                                <div className="flex items-center">
                                    <FaEye className="mx-1 text-lg text-gray-300" />
                                    <b className="text-gray-400">{blog.view}</b>
                                </div>
                                <button className="flex items-center">
                                    {isLiked ? (
                                        <FaHeart
                                            className="mx-1 text-lg text-red-500"
                                            onClick={handleClickLike}
                                        />
                                    ) : (
                                        <FaRegHeart
                                            className="mx-1 text-lg text-red-500"
                                            onClick={handleClickLike}
                                        />
                                    )}{" "}
                                    <b className="text-gray-400">{blog.like}</b>
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
