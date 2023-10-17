import React, { useEffect, useState } from "react";
import { FaEye } from "react-icons/fa";
import TextTruncate from "react-text-truncate";
import BlogPreview from "./BlogPreview";
import { FaTags } from "react-icons/fa";

const VerificationCard = (props) => {
    const [preview, setPreview] = useState(false);

    const handleClosePreview = () => {
        setPreview(false);
    };

    return (
        <div
            className={`flex container-fluid border-b-2 my-4 ${
                props.checkBox.checked ? "bg-gray-700" : "bg-gray-900"
            } cursor-pointer rounded-lg`}
            onClick={() =>
                props.onChengeCheckBox(props.blog.id, props.checkBox.checked)
            }
        >
            <div className="flex flex-col md:flex-row p-3">
                <div className="h-40 w-full md:w-1/7 my-2 bg-emerald-500">
                    <img
                        src={`${location.origin}/storage/${props.blog.image}`}
                        alt="Blog Image"
                        className="justify-start object-center lg:h-full lg:w-full"
                    />
                </div>
                <div className="flex flex-col mx-2 w-full md:w-2/7 my-3">
                    <h1 className="px-2 items-center mx-2 text-2xl mt-3 font-weight-bold font-bold">
                        {props.blog.title}
                    </h1>
                    <h4 className="px-3 items-center mx-2 text-md mt-4 text-gray-400">
                        Author: {props.blog.user.name}
                    </h4>
                    <div className="px-2 flex items-center mx-2 mt-3">
                        <div className="flex text-sm items-center px-1 py-2 rounded-md bg-gray-200 text-gray-800">
                            <FaTags className="mx-1" />
                            {props.blog.category.name}
                        </div>
                    </div>
                </div>
                <div className="w-full md:w-3/7 my-auto">
                    <p className="px-2 items-center mx-4">
                        <TextTruncate
                            line={5}
                            element="span"
                            truncateText="..."
                            text={props.blog.body}
                            textTruncateChild={<a>Read more</a>}
                        />
                    </p>
                </div>
            </div>
            <div className="justify-end mt-3">
                <button
                    class="flex p-0.5 mb-2 mr-2 overflow-hidden text-sm font-medium text-gray-900 rounded-lg group bg-gradient-to-br from-purple-600 to-blue-500 group-hover:from-purple-600 group-hover:to-blue-500 hover:text-gray-950 dark:text-white focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800"
                    onClick={() => setPreview(true)}
                >
                    <span class="px-5 py-2.5 transition-all ease-in duration-75 bg-white dark:bg-gray-900 rounded-md group-hover:bg-opacity-0">
                        <FaEye className="text-xl" />
                    </span>
                </button>{" "}
            </div>
            {preview && (
                <BlogPreview
                    blog={props.blog}
                    isOpen={true}
                    onClose={handleClosePreview}
                />
            )}
        </div>
    );
};

export default VerificationCard;
