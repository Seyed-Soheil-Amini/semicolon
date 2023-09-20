import { forwardRef, useEffect, useRef } from "react";
import { FaUser, FaEnvelope, FaLock } from "react-icons/fa";

export default forwardRef(function TextInput(
    { type = "text", className = "", isFocused = false, ...props },
    ref
) {
    const input = ref ? ref : useRef();

    useEffect(() => {
        if (isFocused) {
            input.current.focus();
        }
    }, []);

    let icon;
    if (props.id === "name") {
        icon = (
            <FaUser
                className="w-5 h-5 absolute text-gray-400 ml-3 pointer-events-none"
                aria-hidden="true"
            />
        );
    } else if (props.id === "email") {
        icon = (
            <FaEnvelope
                className="w-5 h-5 absolute text-gray-400 ml-3 pointer-events-none"
                aria-hidden="true"
            />
        );
    } else {
        icon = (
            <FaLock
                className="w-5 h-5 absolute text-gray-400 ml-3 pointer-events-none"
                aria-hidden="true"
            />
        );
    }

    return (
        <div className="font-sans relative flex items-center focus-within:text-gray-600">
            {icon}
            <input
                {...props}
                type={type}
                className={
                    "pr-3 pl-10 border-gray-300 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm input-with-icon" +
                    className
                }
                ref={input}
            />
        </div>
    );
});
