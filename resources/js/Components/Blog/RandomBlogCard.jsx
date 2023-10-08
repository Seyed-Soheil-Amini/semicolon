import React, { useEffect } from "react";
import BlogLink from "../BlogLink";
import { isEmpty } from "lodash";
import TextTruncate from "react-text-truncate";
import { FaEye, FaHeart, FaTags, FaUserCircle } from "react-icons/fa";

const RandomBlogCard = ({ blog }) => {
    return (
        <BlogLink
            className="w-full h-100 rounded-lg border-b-2 border-stone-500 border-solid relative shadow-3xl cursor-pointer"
            href={route("showBlog", blog.id)}
        >
            <div className="relative overflow-hidden w-full rounded-md bg-gray-200 h-60">
                <img
                    src={`${location.origin}/storage/${blog.image}`}
                    alt="Blog Image"
                    className="object-center h-100 w-100"
                />
                {!isEmpty(blog.category) && (
                    <div className="absolute top-0 left-0 m-2 bg-gray-300 rounded px-3 py-1 text-sm font-semibold text-gray-700">
                        <div className="flex">
                            <FaTags
                                className="flex text-center my-auto mr-1"
                                aria-hidden="true"
                            />
                            {blog.category.name}
                        </div>
                    </div>
                )}
            </div>
            <div className="mt-3 row justify-between">
                <div className="flex-row px-6 w-full h-full">
                    <h3 className="text-md text-gray-200 font-bold text-left">
                        {blog.title}
                    </h3>
                    {!isEmpty(blog.user) && (
                        <div className="flex items-center font-mono text-lg text-neutral-400">
                            <FaUserCircle
                                className={`mr-2 text-3xl ${
                                    blog.user.isAdmin == 1 && "text-amber-500"
                                }`}
                            />
                            {blog.user.name}
                        </div>
                    )}
                    <p className="flex mt-1 text-sm text-gray-400 py-1">
                        <TextTruncate
                            line={3}
                            element="span"
                            truncateText="..."
                            text={blog.body}
                            textTruncateChild={<a>Read more</a>}
                        />
                    </p>
                </div>
            </div>
            <div className="flex justify-between w-1/2 px-3 py-2 mb-2">
                <div className="flex items-center">
                    <FaEye className="mx-1 text-lg text-gray-300" />
                    <b className="text-gray-400 text-sm">{blog.view}</b>
                </div>
                <div className="flex items-center">
                    <FaHeart className="mx-1 text-lg text-red-500 animate-pulse" />
                    <b className="text-gray-400 text-sm">{blog.like}</b>
                </div>
            </div>
        </BlogLink>
    );
};

export default RandomBlogCard;
