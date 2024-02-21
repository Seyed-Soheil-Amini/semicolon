import React from "react";

const SkeletonOrder = () => {
    return (
        <div className="flex items-center mx-2 md:mx-10 justify-between py-2 bg-gray-900 rounded">
            <div className="w-3/4 border-r my-auto px-4 py-5">
                <div className="h-3 rounded-full bg-gray-600 w-12 md:w-24 mb-2.5" />
                <div className="w-20 md:w-32 h-2 rounded-full bg-gray-700" />
            </div>
            <div className="flex-row w-1/4 pl-2">
                <div className="h-2.5 rounded-full bg-gray-700 w-20 md:w-40 mb-2" />
                <div className="h-2.5 rounded-full bg-gray-700 w-20 md:w-30 mb-2" />
                <div className="h-2.5 rounded-full bg-gray-700 w-20 md:w-40 mb-2" />
            </div>
        </div>
    );
};

export default SkeletonOrder;
