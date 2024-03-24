import React from "react";
import Modal from "react-modal";
import { FaEye, FaHeart, FaTags, FaUserEdit } from "react-icons/fa";
import { isEmpty } from "lodash";
import { useTranslation } from "react-i18next";

const BlogPreview = (props) => {
    const { t } = useTranslation();
    return (
        <div>
            <Modal
                isOpen={props.isOpen}
                className="overflow-auto max-h-90vh h-6.5/7 w-4/5 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-zinc-900 rounded-md px-5 py-0 w-400 max-w-full"
            >
                <div className="max-h-80vh flex-row">
                    <div className="flex justify-content-around mb-0 mx-auto h-auto md:h-4/7 flex-col md:flex-row pt-2 md:pt-4">
                        <div className="flex h-5/7 md:h-6/7 w-5/7 md:w-3/7 mb-1 md:mb-3 border-gray-300 rounded text-center text-white">
                            <img
                                src={`${
                                    isEmpty(props.blog.image)
                                        ? "/images/altBlogImage.jpg"
                                        : `${location.origin}/storage/${props.blog.image}`
                                }`}
                                alt="Blog Image"
                                className="flex mx-auto my-auto h-full w-full rounded-md"
                            />
                        </div>
                        <div className="flex-row w-auto md:w-1/3 mx-2 my-0 md:my-10 md:mx-10">
                            <div className="flex font-bold my-2 text-gray-500 text-lg md:text-3xl">
                                <h2 className="text-gray-100 w-2/4">
                                    {props.blog.title}
                                </h2>
                            </div>
                            <div className="flex">
                                <div className="flex text-xs md:text-sm items-center px-0.5 py-1 md:px-1 md:py-2 rounded-md bg-zinc-800 text-gray-200">
                                    <FaTags className="mx-0.5 md:mx-1 text-gray-200 text-xs md:text-sm" />
                                    {props.blog.category.name}
                                </div>
                            </div>
                            <div className="flex my-2 items-center text-sm md:text-base font-bold">
                                <FaUserEdit className="mx-1 text-2xl" />:{" "}
                                <h2 className="text-green-500 hover:text-blue-500 tracking-wider underline px-2.5">
                                    <a
                                        href={route(
                                            "showUser",
                                            props.blog.user.id
                                        )}
                                        rel="noopener noreferrer"
                                        onClick={(e) => e.stopPropagation()}
                                        target={"_blank"}
                                        as={"a"}
                                    >
                                        {props.blog.user.name}
                                    </a>
                                </h2>
                            </div>
                            <div class="flex my-2 items-center">
                                {!isEmpty(props.blog.labels) && (
                                    <div class="pt-1 pb-1 h-auto md:h-2/7">
                                        <h2 class="py-1 mb-1 text-gray-100">
                                            {t("dash.verf.pre.lbl")}
                                        </h2>
                                        <div class="flex flex-wrap">
                                            {props.blog.labels.map((label) => {
                                                return (
                                                    <span class="mx-1 bg-gray-600 rounded-full px-3 py-1 text-xs md:text-sm font-semibold text-gray-100">
                                                        #{label.name}
                                                    </span>
                                                );
                                            })}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between w-1/4 px-3 text-gray-200 text-sm md:text-base">
                        <div className="flex items-center">
                            <FaEye className="mx-1 text-xl md:text-2xl" />
                            <b>{props.blog.view}</b>
                        </div>
                        <div className="flex items-center">
                            <FaHeart className="mx-1 text-xl md:text-2xl" />
                            <b>{props.blog.like}</b>
                        </div>
                    </div>
                    <div className="flex my-3 h-auto md:h-2.5/7 text-gray-100 text-xs md:text-lg tracking-tight">
                        <p className="px-2 py-2">
                            {props.blog.body}
                        </p>
                    </div>
                </div>
                <div className="flex justify-end mb-1 md:mb-2">
                    <button
                        className="bg-red-500 hover:bg-red-700 mb-1 md:mb-2 text-white font-bold py-1.5 px-2 md:py-2 md:px-4 rounded text-sm md:text-base"
                        onClick={() => props.onClose()}
                    >
                        {t("dash.verf.pre.cls-btn")}
                    </button>
                </div>
            </Modal>
        </div>
    );
};

export default BlogPreview;
