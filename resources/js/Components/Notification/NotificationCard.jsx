import React from "react";
import acceptIcon from "../../../../public/images/vector.png";
import rejectIcon from "../../../../public/images/vector2.png";
import readIcon from "../../../../public/images/readNotifIcon.png";

const NotificationCard = ({ notif }) => {
    function convertTimestamp(timestamp) {
        const date = new Date(timestamp);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        const hours = date.getHours().toString().padStart(2, "0");
        const minutes = date.getMinutes().toString().padStart(2, "0");

        return `${day}/${month}/${year} ${hours}:${minutes}`;
    }

    return (
        <div className="bg-zinc-700 p-2 shadow-xl rounded rounded-xl mb-2">
            <div className="px-2">
                <div className="flex justify-between items-center border-cyan-500 border-l-4 rounded rounded-2 mb-2">
                    <h2 className="px-5 text-xl text-gray-50 font-bold tracking-wider">
                        {notif.title}
                    </h2>
                    <h4 className="text-sm text-zinc-50">
                        {convertTimestamp(notif.created_at)}
                    </h4>
                </div>
                <div className="flex px-2">
                    <div className="border-r border-1 border-zinc-500 w-2/3">
                        <div className="flex">
                            <div className="text-lg text-zinc-300 pr-2">
                                Project:{" "}
                            </div>
                            <h2 className="text-lg text-zinc-100">
                                {notif.data.projectName}
                            </h2>
                        </div>
                        <div className="flex">
                            <div className="text-lg text-zinc-300">
                                Project ID:{" "}
                            </div>
                            <h2 className="text-lg text-zinc-100">
                                {notif.data.projectId}
                            </h2>
                        </div>
                    </div>
                    <div className="flex mx-auto items-center text-center ml-2">
                        <div className="text-zinc-300 pr-1">Status: </div>
                        {notif.data.status == 1 ? (
                            <h2 className="flex text-green-500 items-center">
                                Accepted{" "}
                                <img
                                    src={acceptIcon}
                                    className="w-4 h-4 ml-1"
                                />
                            </h2>
                        ) : (
                            <h2 className="flex text-red-500 items-center">
                                Rejected{" "}
                                <img
                                    src={rejectIcon}
                                    className="w-4 h-4 ml-1"
                                />
                            </h2>
                        )}
                    </div>
                </div>
            </div>
            <div className="flex justify-center my-auto">
                <button className="flex justify-center text-center gap-x-1">
                    <img src={readIcon} className="w-4 h-4 my-auto" />
                    <h2 className="text-zinc-100 my-auto hover:text-orange-500"> Mark as seen</h2>
                </button>
            </div>
        </div>
    );
};

export default NotificationCard;
