import React from "react";
import TextTruncate from "react-text-truncate";
import catgoryIcn from "../../../../public/images/category-60.png";
import priceIcn from "../../../../public/images/price-100.png";
import durationIcn from "../../../../public/images/time-100.png";

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

    return (
        <div className={`flex flex-row border-b-2 border-t-2 border-base-400 rounded-md mb-2.5 md:mb-5 w-auto ${order.isAccept?"opacity-50":"opacity-100"}`}>
            <div className="w-full flex items-center p-2">
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
                            <h3 className="pl-2">{order.maximumPrice} Tomans</h3>
                        </div>
                        <div className="flex text-sm">
                            <img src={durationIcn} className="w-6 h-6" />
                            <h3 className="pl-2">{order.duration} Days</h3>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrderCard;
