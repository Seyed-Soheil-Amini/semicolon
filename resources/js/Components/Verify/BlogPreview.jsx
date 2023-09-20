import React from "react";
import Modal from "react-modal";
import {
    FaEye,
    FaHandPointUp,
    FaHeart,
    FaTags,
    FaUserEdit,
} from "react-icons/fa";
import { isEmpty } from "lodash";

const BlogPreview = (props) => {
    console.log(props);
    return (
        <div>
            <Modal
                isOpen={props.isOpen}
                className="overflow-auto max-h-90vh h-6.5/7 w-4/5 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 rounded-md px-5 py-0 w-400 max-w-full"
            >
                <div className="max-h-80vh h-6.5/7 flex-md-row">
                    <div className="flex justify-content-around mb-0 mx-auto h-4/7">
                        <div className="flex h-6/7 w-2/3 mb-3 border-gray-300 rounded mx-auto my-auto text-center text-white">
                            {!isEmpty(props.blog.image) ? (
                                <>
                                    <img
                                        className="flex mx-auto my-auto h-full w-full rounded"
                                        src={`${location.origin}/storage/${props.blog.image}`}
                                        alt="Selected image preview"
                                    />
                                </>
                            ) : (
                                <p className="mx-auto my-auto text-black">
                                    Image place
                                </p>
                            )}
                        </div>
                        <div className="flex-row w-1/3 mx-2 my-10">
                            <div className="flex text-3xl font-bold my-2">
                                <h2 className="w-2/4">{props.blog.title}</h2>
                            </div>
                            <div className="flex">
                                <div className="flex text-sm items-center px-1 py-2 rounded-md bg-gray-800 text-gray-200">
                                    <FaTags className="mx-1" />
                                    {props.blog.category.name}
                                </div>
                            </div>
                            <div className="flex my-2 items-center">
                                <FaUserEdit className="mx-1 text-2xl" />:{" "}
                                <h2 className="font-italic text-gray-700">
                                    {props.blog.user.name}
                                </h2>
                            </div>
                            <div className="flex my-2 items-center">
                                {!isEmpty(props.blog.labels) && (
                                    <div className="px-4 pt-1 pb-1 h-2/7">
                                        <h2 className="py-1 mb-1">Labels :</h2>
                                        {props.blog.labels.map((label) => {
                                            return (
                                                <span className="inline-block mx-1 bg-gray-600 rounded-full px-3 py-1 text-sm font-semibold text-gray-100">
                                                    #{label.name}
                                                </span>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                    <div className="flex justify-between w-1/4 px-3">
                        <div className="flex items-center">
                            <FaEye className="mx-1 text-2xl" />
                            <b>{props.blog.view}</b>
                        </div>
                        <div className="flex items-center">
                            <FaHeart className="mx-1 text-2xl" />
                            <b>{props.blog.like}</b>
                        </div>
                    </div>
                    <div className="my-3 h-2.5/7">
                        <p className="h-full w-full px-2 py-2">
                            {props.blog.body}
                        </p>
                    </div>
                    <div className="flex justify-end">
                        <button
                            className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                            onClick={() => props.onClose()}
                        >
                            Close
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default BlogPreview;
