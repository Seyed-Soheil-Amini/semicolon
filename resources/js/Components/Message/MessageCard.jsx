import React, { useEffect, useState } from "react";

const MessageCard = ({ message, onSelect, selected }) => {
    const [checked, setChecked] = useState(false);

    return (
        <div className="flex border border-base-300 rounded-md bg-gray-900 mb-5">
            <div className="flex items-center px-2 custom-checkbox">
                <input
                    id={`${message.id}`}
                    type="checkbox"
                    className={`w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600`}
                    onChange={() => onSelect(message.id)}
                    checked={selected}
                />
                <label htmlFor={`${message.id}`} className="sr-only">
                    checkbox
                </label>
            </div>
            <div className="collapse collapse-arrow">
                <input type="radio" name="my-accordion-4" checked={checked} />
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
                    <div className="my-auto text-sm font-mono">
                        {message.email}
                    </div>
                </div>
                <div className="collapse-content">
                    <p className="text-md py-3">{message.body}</p>
                </div>
            </div>
        </div>
    );
};

export default MessageCard;
