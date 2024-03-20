import React, { useEffect, useState } from "react";
import TextTruncate from "react-text-truncate";
import AcceptOrderModal from "./AcceptOrderModal";

const OrderCatCard = ({ order }) => {
    const [isFocus, setIsFocus] = useState(false);
    const [isChecking, setIsChecking] = useState(false);
    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();

        return `${day}/${month}/${year}`;
    };

    const formatPrice = (price) => {
        return parseFloat(price)
            .toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0,
            })
            .replace("$", "");
    };
    const handleCloseChecking = () => {
        setIsChecking(false);
    };

    return (
        <li
            className={`flex justify-between gap-x-6 py-5 px-4 rounded-md border-b border-gray-500 mt-2 ${
                isFocus && "bg-gray-900"
            }`}
            onMouseEnter={() => setIsFocus(true)}
            onMouseLeave={() => setIsFocus(false)}
        >
            <div className="flex-col">
                <div className="flex min-w-0 gap-x-4">
                    <h2 className="text-3xl font-serif text-gray-100">
                        <b>{order.title}</b>
                    </h2>
                    <div className="min-w-0 flex justify-center items-center">
                        <p className="text-sm font-semibold leading-6 text-green-500">
                            <span className="text-gray-400 font-medium">
                                Registered By{" "}
                            </span>
                            <u className="text-lg font-mono">
                                {order.user.name}
                            </u>
                        </p>
                        <p className="mt-1 px-2 leading-5 text-gray-400">
                            in {formatDate(order.created_at)}
                        </p>
                    </div>
                </div>
                <div className="">
                    <p className="flex mt-1 text-xs md:text-sm text-gray-300 py-1">
                        <TextTruncate
                            line={1}
                            element="span"
                            truncateText="..."
                            text={order.description}
                            // textTruncateChild={<a>Read more</a>}
                        />
                    </p>
                </div>
            </div>
            <div className="my-auto items-center">
                {!isFocus ? (
                    <>
                        <p className="text-md leading-6 text-zinc-200 text-center">
                            {formatPrice(order.maximumPrice)} T
                        </p>
                        <p className="mt-1 text-xs leading-5 text-gray-400">
                            Project Duration{" "}
                            <span className="font-bold text-sm underline">
                                <b>{order.duration}</b>
                            </span>{" "}
                            days
                        </p>
                    </>
                ) : (
                    <button
                        className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                        type="button"
                        onClick={() => setIsChecking(true)}
                    >
                        Check Detail
                    </button>
                )}
                {isChecking && (
                    <AcceptOrderModal
                        handleClose={handleCloseChecking}
                        order={order}
                    />
                )}
            </div>
        </li>
    );
};

export default OrderCatCard;
