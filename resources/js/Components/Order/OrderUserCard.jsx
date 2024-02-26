import React, { useState } from "react";
import TextTruncate from "react-text-truncate";
import catgoryIcn from "../../../../public/images/category-60.png";
import priceIcn from "../../../../public/images/price-100.png";
import durationIcn from "../../../../public/images/time-100.png";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer, toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";
import ModalOrder from "./ModalOrder";
import { useDeleteOrder } from "@/hooks";

const OrderCard = ({ order }) => {
    var category = "Software Developement";
    switch (order.category) {
        case "SM":
            category = "Server Managment";
            break;
        case "GD":
            category = "Game Development";
            break;
        case "AI":
            category = "Artificial Intelligence";
            break;
        default:
            break;
    }
    const [isFocus, setIsFocus] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const { mutateAsync: deleteOrder } = useDeleteOrder();

    const handleCloseModal = () => {
        setOpenEdit(false);
        setIsFocus(false);
    };
    const handleEdit = () => {
        setOpenEdit(true);
    };

    const handleDelete = () => {
        try {
            toast.promise(Promise.resolve(deleteOrder(order.id)), {
                pending: "Removing your order ...",
                success: "Your order was removed successfully.",
                error: {
                    render({ data }) {
                        if (data.response && data.response.status === 400) {
                            return "Your order was not removed.";
                        } else
                            return `There is a problem in removing your order|code ${data.response.status}`;
                    },
                },
            });
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div
            className={`flex flex-row ${
                isFocus && !order.isAccept && "bg-gray-800"
            } border-b-2 border-t-2 border-base-400 rounded-md mb-2.5 md:mb-5 w-auto ${
                order.isAccept ? "opacity-50" : "opacity-100"
            }`}
            onMouseEnter={() => setIsFocus(true)}
            onMouseLeave={() => setIsFocus(false)}
        >
            <ToastContainer position="top-center" />
            <div className="w-full flex items-center p-2 relative">
                <div className="w-3/4 p-4 border-r border-gray-500">
                    <div className="flex-row px-2">
                        <h2 className="text-gray-200 text-xl font-semibold">
                            <b>{order.title}</b>
                        </h2>
                        <p className="flex my-auto mt-1 text-xs md:text-sm text-zinc-400 py-1">
                            <TextTruncate
                                line={2}
                                element="span"
                                truncateText="..."
                                text={order.description}
                            />
                        </p>
                    </div>
                </div>
                <div className="w-1/4 p-2 flex items-center">
                    <div className="flex-row w-full pl-2">
                        <div className="flex font-serif text-blue-400 pb-2">
                            <img src={catgoryIcn} className="w-6 h-6" />
                            <h3 className="pl-2">{category}</h3>
                        </div>
                        <div className="flex text-sm text-slate-200 pb-2">
                            <img src={priceIcn} className="w-6 h-6" />
                            <h3 className="pl-2">
                                {order.maximumPrice} Tomans
                            </h3>
                        </div>
                        <div className="flex text-sm">
                            <img src={durationIcn} className="w-6 h-6" />
                            <h3 className="pl-2">{order.duration} Days</h3>
                        </div>
                    </div>
                </div>
                {isFocus && !order.isAccept && (
                    <div className="absolute inset-0 flex items-center justify-center">
                        <button
                            type="button"
                            className="text-white bg-gradient-to-br from-purple-600 to-blue-500 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
                            onClick={handleEdit}
                        >
                            <FaEdit className="w-6 h-6" />
                        </button>
                        <button
                            type="button"
                            className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-full text-sm px-5 py-2.5 text-center me-2 mb-2"
                            onClick={handleDelete}
                        >
                            <FaTrash className="w-6 h-6" />
                        </button>
                    </div>
                )}
                {openEdit && (
                    <ModalOrder
                        handleClose={handleCloseModal}
                        order={order}
                        state={"update"}
                    />
                )}
            </div>
        </div>
    );
};

export default OrderCard;
