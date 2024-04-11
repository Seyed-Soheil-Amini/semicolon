import { useGetSystemNotification } from "@/hooks";
import { isEmpty } from "lodash";
import React, { useEffect } from "react";
import NotificationCard from "./NotificationCard";

const Notification = () => {
    const { data: notifications } = useGetSystemNotification();

    return (
        <div className="w-screen max-w-md flex-auto overflow-auto text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
            <div className="overflow-auto w-auto">
                <div className="bg-zinc-400 p-2 text-center mb-5 rounded-b-3xl">
                    <h2 className="text-3xl tracking-normal font-extrabold text-zinc-950">
                        <b>Notifications</b>
                    </h2>
                </div>
                {!isEmpty(notifications) ? (
                    notifications.map((notif) => (
                        <NotificationCard notif={notif} />
                    ))
                ) : (
                    <h2>You have not any notifications.</h2>
                )}
            </div>
        </div>
    );
};

export default Notification;
