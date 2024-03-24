import React from "react";
import TextTruncate from "react-text-truncate";
import { isEmpty } from "lodash";
import { FaPen, FaTags, FaTrashAlt } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const BlogCard = (props) => {
    const { t } = useTranslation();
    return (
        <div className="rounded border-2 border-gray-400 relative h-100 w-6.5/7 md:w-auto">
            <div className="relative overflow-hidden w-full rounded-md bg-gray-200 h-60">
                <img
                    src={`${
                        isEmpty(props.blog.image)
                            ? "/images/altBlogImage.jpg"
                            : `${location.origin}/storage/${props.blog.image}`
                    }`}
                    alt="Blog Image"
                    className="object-center h-full w-full"
                />
                {!isEmpty(props.blog.category) && (
                    <div className="absolute top-0 left-0 m-2 bg-gray-300 rounded px-3 py-1 text-sm font-semibold text-gray-700 text-xs md:text-sm">
                        <div className="flex">
                            <FaTags
                                className="flex text-center my-auto mr-1"
                                aria-hidden="true"
                            />
                            {props.blog.category.name}
                        </div>
                    </div>
                )}
            </div>
            <div className="flex-grow mt-3 row justify-between h-60">
                <div className="flex-row px-6 w-full h-full">
                    <div className="flex-row w-full h-4/5">
                        <h3 className="text-gray-200 font-bold text-sm md:text-lg">
                            {props.blog.title}
                        </h3>
                        <p className="flex mt-1 text-xs md:text-sm text-gray-400 py-1">
                            <TextTruncate
                                line={!isEmpty(props.blog.labels) ? 4 : 8}
                                element="span"
                                truncateText="..."
                                text={props.blog.body}
                                // textTruncateChild={<a>Read more</a>}
                            />
                        </p>
                        {!isEmpty(props.blog.labels) && (
                            <div className="px-4 pt-1 pb-1 h-2/7">
                                {props.blog.labels.map((label) => {
                                    return (
                                        <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-xs md:text-sm font-semibold text-gray-700">
                                            #{label.name}
                                        </span>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                    {(() => {
                        if (props.parent === "edit") {
                            return (
                                <div className="flex justify-between my-auto h-2/7 md:h-auto">
                                    <button
                                        type="button"
                                        className="text-orange-600 hover:text-white border border-orange-500 hover:bg-orange-600 focus:ring-4 focus:outline-none focus:ring-orange-500 font-medium rounded-lg text-xs md:text-sm px-2.5 py-2 md:px-5 md:py-2.5 text-center mr-2 mb-0 md:mb-2 dark:border-orange-500 dark:text-orange-500 dark:hover:text-white dark:hover:bg-orange-600 dark:focus:ring-orange-900 w-1/4 h-2/3 md:h-auto"
                                        onClick={() => handleEditClick()}
                                    >
                                        <FaPen className="mx-auto" />
                                    </button>
                                    <button
                                        className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-xs md:text-sm px-2.5 py-2 md:px-5 md:py-2.5 text-center mb-0 md:mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900 w-1/4 h-2/3 md:h-auto"
                                        onClick={() =>
                                            props.onClickDelete(props.blog.id)
                                        }
                                    >
                                        <FaTrashAlt className="mx-auto" />
                                    </button>
                                </div>
                            );
                        } else if (props.parent === "publish") {
                            return (
                                <div className="flex justify-center">
                                    <button
                                        type="button"
                                        className="text-blue-700 hover:text-white border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-xs md:text-sm px-2.5 py-2 md:px-5 md:py-2.5 text-center dark:border-blue-500 dark:text-blue-500 dark:hover:text-white dark:hover:bg-blue-500 dark:focus:ring-blue-800"
                                        onClick={() =>
                                            props.onTogglePublish(props.blog.id)
                                        }
                                    >
                                        {props.blog.published_at !== null
                                            ? t("dash.blg.pub.upub-btn")
                                            : t("dash.blg.pub.pub-btn")}
                                    </button>
                                </div>
                            );
                        } else {
                            return (
                                <div className="flex justify-center">
                                    <button
                                        className="text-red-700 hover:text-white border border-red-700 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center mb-0 md:mb-2 dark:border-red-500 dark:text-red-500 dark:hover:text-white dark:hover:bg-red-600 dark:focus:ring-red-900 w-1/4"
                                        onClick={() =>
                                            props.onClickDelete(props.blog.id)
                                        }
                                    >
                                        <FaTrashAlt className="mx-auto" />
                                    </button>
                                </div>
                            );
                        }
                    })()}
                </div>
            </div>
        </div>
    );

    function handleEditClick() {
        props.onClickEdit(props.blog);
    }
};

export default BlogCard;
