import React, { useEffect } from "react";
import TextTruncate from "react-text-truncate";
import DangerButton from "../DangerButton";
import { isEmpty } from "lodash";
import { FaTags } from "react-icons/fa";

const BlogCard = (props) => {
    return (
        <div className="rounded border-2 border-gray-400 relative h-100">
            <div className="relative overflow-hidden w-full rounded-md bg-gray-200 lg:aspect-none h-60">
                <img
                    src={`${location.origin}/storage/${props.blog.image}`}
                    alt="Blog Image"
                    className="object-center lg:h-full lg:w-full"
                />
                {!isEmpty(props.blog.category) && (
                    <div className="absolute top-0 left-0 m-2 bg-gray-300 rounded px-3 py-1 text-sm font-semibold text-gray-700">
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
            <div className="mt-3 row justify-between h-60">
                <div className="flex-row px-6 w-full h-full">
                    <h3 className="text-md text-gray-200 font-bold">
                        {props.blog.title}
                    </h3>
                    <p className="flex mt-1 text-sm text-gray-400 py-1">
                        <TextTruncate
                            line={!isEmpty(props.blog.labels) ? 4 : 8}
                            element="span"
                            truncateText="..."
                            text={props.blog.body}
                            textTruncateChild={<a>Read more</a>}
                        />
                    </p>
                    {!isEmpty(props.blog.labels) && (
                        <div className="px-4 pt-1 pb-1 h-2/7">
                            {props.blog.labels.map((label) => {
                                return (
                                    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                                        #{label.name}
                                    </span>
                                );
                            })}
                        </div>
                    )}

                    {(() => {
                        if (props.parent === "edit") {
                            return (
                                <div className="flex justify-between">
                                    <button
                                        type="button"
                                        className="rounded py-1 px-5 bg-orange-500 w-25 hover:bg-orange-400 text-white"
                                        onClick={() => handleEditClick()}
                                    >
                                        EDIT
                                    </button>
                                    <DangerButton
                                        onClick={() =>
                                            props.onClickDelete(props.blog.id)
                                        }
                                    >
                                        Delete
                                    </DangerButton>
                                </div>
                            );
                        } else if (props.parent === "publish") {
                            return (
                                <div className="flex justify-center">
                                    <button
                                        type="button"
                                        className="rounded py-1 px-5 bg-blue-500 w-25 hover:bg-blue-400 text-white"
                                        onClick={() =>
                                            props.onTogglePublish(props.blog.id)
                                        }
                                    >
                                        {props.blog.published_at !== null
                                            ? "UNPUBLISH"
                                            : "PUBLISH"}
                                    </button>
                                </div>
                            );
                        } else {
                            return (
                                <div className="flex justify-center">
                                    <DangerButton
                                        onClick={() =>
                                            props.onClickDelete(props.blog.id)
                                        }
                                    >
                                        Delete
                                    </DangerButton>
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
