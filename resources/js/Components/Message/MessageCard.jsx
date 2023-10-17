import React, { useEffect, useState } from "react";

const MessageCard = ({ message }) => {
    const [checked, setChecked] = useState(false);
    useEffect(() => {
        console.log(checked);
    }, [checked]);
    return (
        <div className="collapse collapse-arrow border border-base-300 rounded-md bg-gray-900 mb-5">
            <input
                type="radio"
                name="my-accordion-4"
                checked={checked}
            />
            <div
                className="collapse-title text-xl font-medium flex justify-between"
                onClick={() => setChecked(!checked)}
            >
                <div className="flex-row">
                    <h2 className="text-md font-semibold text-gray-300">
                        {message.subject}
                    </h2>
                    <p className="text-sm font-serif pt-1 text-gray-400">
                        {message.sender_name}
                    </p>
                </div>
                <div className="my-auto text-sm font-mono">{message.email}</div>
            </div>
            <div className="collapse-content">
                <p className="text-md py-3">{message.body}</p>
            </div>
        </div>
    );
};

export default MessageCard;
