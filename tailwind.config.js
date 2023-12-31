import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Figtree", ...defaultTheme.fontFamily.sans],
            },
            width: {
                "1/7": "14.2857143%",
                "2/7": "28.5714286%",
                "3/7": "42.8571429%",
                "4/7": "57.1428571%",
                "5/7": "71.4285714%",
                "6/7": "85.7142857%",
                "6.5/7": "94%",
            },
            height: {
                "1/7": "14.2857143%",
                "2/7": "28.5714286%",
                "2.5/7": "34.2554954%",
                "3/7": "42.8571429%",
                "4/7": "57.1428571%",
                "5/7": "71.4285714%",
                "6/7": "85.7142857%",
                "6.5/7": "94%",
            },
            keyframes: {
                snake: {
                    "0%": { transform: "translateX(0)" },
                    "50%": { transform: "translateX(15px)" },
                    "100%": { transform: "translateX(0)" },
                },
                "ping-once": {
                    "75%, 100%": { transform: "scale(2)", opacity: 0 },
                },
            },
            animation: {
                snake: "snake 2s linear infinite",
                "ping-once": "ping-once 1s cubic-bezier(0, 0, 0.2, 1)",
            },
            boxShadow: {
                "3xl": "0 35px 60px -15px rgba(0, 0, 0, 0.5)",
            },
            gridTemplateRows: {
                "[auto,auto,1fr]": "auto auto 1fr",
            },
        },
        safelist: [
            "animate-[fade-in_1s_ease-in-out]",
            "animate-[fade-in-down_1s_ease-in-out]",
        ],
    },

    plugins: [
        forms,
        require("@tailwindcss/aspect-ratio"),
        require("daisyui"),
        require("tailwindcss-animated"),
    ],
};
