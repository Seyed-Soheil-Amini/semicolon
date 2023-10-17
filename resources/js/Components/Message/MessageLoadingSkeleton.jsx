import React from "react";

const MesssageLoadingSkeleton = () => {
    return (
        <div className="flex items-center mx-10 justify-between pt-10 bg-gray-900 rounded">
            <div className="my-auto px-4 pb-5">
                <div className="h-3 bg-gray-300 rounded-full dark:bg-gray-600 w-24 mb-2.5" />
                <div className="w-32 h-2 bg-gray-200 rounded-full dark:bg-gray-700" />
            </div>
            <div className="h-2.5 bg-gray-300 rounded-full dark:bg-gray-700 w-40 mb-10" />
        </div>
    );
};

export default MesssageLoadingSkeleton;
