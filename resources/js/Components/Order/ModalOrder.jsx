import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { isEmpty } from "lodash";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer, toast } from "react-toastify";
import { useSendOrder, useUpdateOrder } from "@/hooks";
import sdImg from "../../../../public/images/ordering/software-development-100.png";
import smImg from "../../../../public/images/ordering/server-shutdown-100.png";
import aiImg from "../../../../public/images/ordering/artificial-intelligence-100.png";
import gdImg from "../../../../public/images/ordering/game-development-100.png";
import clsBtn from "../../../../public/images/ordering/close-window-96.png";
import tick from "../../../../public/images/ordering/checkmark-24.png";

const ModalOrder = (props) => {
    const [order, setOrder] = useState(props.order);

    const [isValidPrice, setPriceValidity] = useState(true);
    const [isToCreate, setIsToCreate] = useState(props.state == "create");
    const { mutateAsync: sendOrder } = useSendOrder();
    const { mutateAsync: updateOrder } = useUpdateOrder();
    const {
        register,
        watch,
        formState: { errors },
        handleSubmit: submit,
    } = useForm();

    useEffect(() => {
        setPriceValidity(order.maximumPrice >= order.minimumPrice);
    }, [order.minimumPrice, order.maximumPrice]);

    const handleCloseWindow = () => {
        props.handleClose();
    };

    const handleSubmit = (event) => {
        try {
            toast.promise(
                async () =>
                    await Promise.resolve(
                        isToCreate ? sendOrder(order) : updateOrder(order)
                    ),
                {
                    pending: {
                        render() {
                            if (isToCreate) return "Sending your order ...";
                            else return "Updating your order ...";
                        },
                    },
                    success: {
                        render() {
                            if (isToCreate) {
                                setOrder({
                                    title: "",
                                    description: "",
                                    category: "",
                                    minimumPrice: "",
                                    maximumPrice: "",
                                    duration: "",
                                });
                            }
                            return "Your order has been saved successfully.";
                        },
                    },
                    error: {
                        render({ data }) {
                            if (data.response && data.response.status === 400) {
                                if (isToCreate)
                                    return "Your order was not sent.";
                                else return "Your order was not update.";
                            } else
                                return `There is a problem in saving your order|code ${data.response.status}`;
                        },
                    },
                }
            );
        } catch (error) {
            console.log(error);
        }
    };

    const checkIcon = <img src={tick} className="fixed w-4 h-4" />;

    const handleChange = (event) => {
        const { name, value } = event;
        setOrder((prevBlog) => {
            return {
                ...prevBlog,
                [name]: value,
            };
        });
    };

    return (
        <>
            <ToastContainer position="top-center" />
            <Modal
                isOpen={true}
                className="overflow-auto max-h-90vh h-6.5/7 w-4/5 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 rounded-md px-5 py-1 w-400 max-w-full"
            >
                <form
                    onSubmit={submit(handleSubmit)}
                    encType="multipart/form-data"
                    className="flex-md-row h-full w-full fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 rounded-md px-5 py-1 w-400 max-w-full"
                >
                    <div className="container-fluid">
                        <div>
                            <div className="flex justify-between">
                                <h2 className="font-serif text-xl text-gray-500 my-auto">
                                    <b>Category</b>
                                </h2>
                                <button
                                    className=""
                                    onClick={() => handleCloseWindow()}
                                >
                                    <img src={clsBtn} className="w-12 h-8" />
                                </button>
                            </div>
                            <div className="grid grid-cols-4 gap-4 mt-1">
                                <div
                                    className={`flex-row items-center text-center rounded-md border-2 border-gray-300 cursor-pointer ${
                                        order.category == "SD"
                                            ? "opacity-100"
                                            : "opacity-50"
                                    }`}
                                    onClick={() =>
                                        handleChange({
                                            name: "category",
                                            value: "SD",
                                        })
                                    }
                                >
                                    <div className="flex p-1">
                                        {order.category == "SD" && checkIcon}
                                        <img
                                            src={sdImg}
                                            className={`w-14 h-12 mx-auto`}
                                        />
                                    </div>
                                    <div className="text-sm font-semibold text-zinc-900">
                                        Software Development
                                    </div>
                                </div>
                                <div
                                    className={`flex-row items-center text-center rounded-md border-2 border-gray-300 cursor-pointer ${
                                        order.category == "GD"
                                            ? "opacity-100"
                                            : "opacity-50"
                                    }`}
                                    onClick={() =>
                                        handleChange({
                                            name: "category",
                                            value: "GD",
                                        })
                                    }
                                >
                                    <div className="flex p-1">
                                        {order.category == "GD" && checkIcon}
                                        <img
                                            src={gdImg}
                                            className={`w-14 h-12 mx-auto text-zinc-900`}
                                        />
                                    </div>
                                    <div className="text-sm font-semibold text-zinc-900">
                                        Game Development
                                    </div>
                                </div>
                                <div
                                    className={`flex-row items-center text-center rounded-md border-2 border-gray-300 cursor-pointer ${
                                        order.category == "AI"
                                            ? "opacity-100"
                                            : "opacity-50"
                                    }`}
                                    onClick={() =>
                                        handleChange({
                                            name: "category",
                                            value: "AI",
                                        })
                                    }
                                >
                                    <div className="flex p-1">
                                        {order.category == "AI" && checkIcon}
                                        <img
                                            src={aiImg}
                                            className={`w-14 h-12 mx-auto`}
                                        />
                                    </div>
                                    <div className="text-sm font-semibold text-zinc-900">
                                        Artificial intelligence
                                    </div>
                                </div>
                                <div
                                    className={`flex-row items-center text-center rounded-md border-2 border-gray-300 cursor-pointer ${
                                        order.category == "SM"
                                            ? "opacity-100"
                                            : "opacity-50"
                                    }`}
                                    onClick={() =>
                                        handleChange({
                                            name: "category",
                                            value: "SM",
                                        })
                                    }
                                >
                                    <div className="flex p-1">
                                        {order.category == "SM" && checkIcon}
                                        <img
                                            src={smImg}
                                            className={`w-14 h-12 mx-auto`}
                                        />
                                    </div>
                                    <div
                                        className={`text-sm font-semibold text-zinc-900`}
                                    >
                                        Server Management
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div
                            className={`mt-4 ${
                                isEmpty(order.category)
                                    ? "opacity-50"
                                    : "opacity-100"
                            }`}
                        >
                            <div>
                                <h2 className="font-serif text-xl text-gray-500">
                                    <b>Title</b>
                                </h2>
                                <div className="mt-1">
                                    <div className="mb-4">
                                        <input
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                            id="default-input"
                                            value={order.title}
                                            type="text"
                                            placeholder="e.g.Website design for grocery store"
                                            required
                                            {...register("title", {
                                                required: true,
                                                minLength: 10,
                                                maxLength: 60,
                                            })}
                                            onChange={(event) =>
                                                handleChange({
                                                    name: "title",
                                                    value: event.target.value,
                                                })
                                            }
                                            disabled={isEmpty(order.category)}
                                        />
                                        {errors.title?.type === "required" && (
                                            <p
                                                role="alert"
                                                className="text-red-500 text-xs md:text-base"
                                            >
                                                * Title is required.
                                            </p>
                                        )}
                                        {errors.title?.type === "minLength" && (
                                            <p
                                                role="alert"
                                                className="text-red-500 text-xs md:text-base"
                                            >
                                                * Min length of title must be 10
                                                characters.
                                            </p>
                                        )}
                                        {errors.title?.type === "maxLength" && (
                                            <p
                                                role="alert"
                                                className="text-red-500 text-xs md:text-base"
                                            >
                                                * Max length of title must be 60
                                                characters.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div className="grid grid-cols-3 gap-3">
                                <div className="mb-6 relative">
                                    <label className="font-serif text-gray-500">
                                        Minimum Price
                                    </label>
                                    <div className="flex">
                                        <div className="w-full">
                                            <input
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10"
                                                id="default-input"
                                                value={parseInt(
                                                    order.minimumPrice ||
                                                        "50000"
                                                )}
                                                type="text"
                                                placeholder="e.g.150000"
                                                required
                                                {...register("minimumPrice", {
                                                    required: true,
                                                    valueAsNumber: true,
                                                    min: 50000,
                                                    max: 10000000,
                                                    validate: (value) => {
                                                        if (
                                                            isNaN(
                                                                parseInt(value)
                                                            )
                                                        ) {
                                                            return "Please enter a valid number.";
                                                        } else if (
                                                            !isValidPrice
                                                        ) {
                                                            return "The minimum price should be less than the maximum price.";
                                                        }
                                                        return true;
                                                    },
                                                })}
                                                onChange={(event) =>
                                                    handleChange({
                                                        name: "minimumPrice",
                                                        value: parseInt(
                                                            event.target.value
                                                        ),
                                                    })
                                                }
                                                disabled={isEmpty(
                                                    order.category
                                                )}
                                            />
                                            {errors.minimumPrice?.type ===
                                                "required" && (
                                                <p
                                                    role="alert"
                                                    className="tracking-tight text-red-500 text-xs md:text-base"
                                                >
                                                    * Minimum price is required.
                                                </p>
                                            )}
                                            {errors.minimumPrice?.type ===
                                                "valueAsNumber" && (
                                                <p
                                                    role="alert"
                                                    className="tracking-tight text-red-500 text-xs md:text-base"
                                                >
                                                    * Price must be number
                                                    format.
                                                </p>
                                            )}
                                            {errors.minimumPrice?.type ===
                                                "min" && (
                                                <p
                                                    role="alert"
                                                    className="tracking-tight text-red-500 text-xs md:text-base"
                                                >
                                                    * The minimum price should
                                                    be 50,000 Tomans.
                                                </p>
                                            )}
                                            {errors.minimumPrice?.type ===
                                                "max" && (
                                                <p
                                                    role="alert"
                                                    className="tracking-tight text-red-500 text-xs md:text-base"
                                                >
                                                    * The maximum price should
                                                    be 10,000,000 Tomans.
                                                </p>
                                            )}
                                            {errors.minimumPrice?.type ===
                                                "validate" && (
                                                <p
                                                    role="alert"
                                                    className="tracking-tight text-red-500 text-xs md:text-base"
                                                >
                                                    *{" "}
                                                    {
                                                        errors.minimumPrice
                                                            .message
                                                    }
                                                </p>
                                            )}
                                        </div>
                                        <div className="absolute right-0 items-center text-center bg-gray-300 p-2 block rounded-lg">
                                            <span className="text-gray-500 text-sm font-mono">
                                                Toman
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-6 relative">
                                    <label className="font-serif text-gray-500">
                                        Maximum Price
                                    </label>
                                    <div className="flex">
                                        <div className="w-full">
                                            <input
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10"
                                                id="default-input"
                                                value={parseInt(
                                                    order.maximumPrice ||
                                                        "50000"
                                                )}
                                                type="text"
                                                placeholder="e.g.500000"
                                                required
                                                {...register("maximumPrice", {
                                                    required: true,
                                                    valueAsNumber: true,
                                                    min: 50000,
                                                    max: 10000000,
                                                    validate: (value) => {
                                                        if (
                                                            isNaN(
                                                                parseInt(value)
                                                            )
                                                        ) {
                                                            return "Plaese enter a valid number.";
                                                        } else if (
                                                            !isValidPrice
                                                        ) {
                                                            return "The maximum price should be greater than the minimum price.";
                                                        }
                                                        return true;
                                                    },
                                                })}
                                                onChange={(event) =>
                                                    handleChange({
                                                        name: "maximumPrice",
                                                        value: parseInt(
                                                            event.target.value
                                                        ),
                                                    })
                                                }
                                                disabled={isEmpty(
                                                    order.category
                                                )}
                                            />
                                            {errors.maximumPrice?.type ===
                                                "required" && (
                                                <p
                                                    role="alert"
                                                    className="tracking-tight text-red-500 text-xs md:text-base"
                                                >
                                                    * Maximum price is required.
                                                </p>
                                            )}
                                            {errors.maximumPrice?.type ===
                                                "valueAsNumber" && (
                                                <p
                                                    role="alert"
                                                    className="tracking-tight text-red-500 text-xs md:text-base"
                                                >
                                                    * Price must be number
                                                    format.
                                                </p>
                                            )}
                                            {errors.maximumPrice?.type ===
                                                "min" && (
                                                <p
                                                    role="alert"
                                                    className="tracking-tight text-red-500 text-xs md:text-base"
                                                >
                                                    * The minimum price should
                                                    be 50,000 Tomans.
                                                </p>
                                            )}
                                            {errors.maximumPrice?.type ===
                                                "max" && (
                                                <p
                                                    role="alert"
                                                    className="tracking-tight text-red-500 text-xs md:text-base"
                                                >
                                                    * The maximum price should
                                                    be 10,000,000 Tomans.
                                                </p>
                                            )}
                                            {errors.maximumPrice?.type ===
                                                "validate" && (
                                                <p
                                                    role="alert"
                                                    className="tracking-tight text-red-500 text-xs md:text-base"
                                                >
                                                    *{" "}
                                                    {
                                                        errors.maximumPrice
                                                            .message
                                                    }
                                                </p>
                                            )}
                                        </div>
                                        <div className="absolute right-0 items-center text-center bg-gray-300 p-2 block rounded-lg">
                                            <span className="text-gray-500 text-sm font-mono">
                                                Toman
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-6 relative">
                                    <label className="font-serif text-gray-500">
                                        Duration
                                    </label>
                                    <div className="flex">
                                        <div className="w-full">
                                            <input
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                id="price-input"
                                                value={order.duration}
                                                type="number"
                                                placeholder="e.g.25"
                                                required
                                                {...register("duration", {
                                                    required: true,
                                                    valueAsNumber: true,
                                                    min: 1,
                                                    max: 365,
                                                    validate: (value) => {
                                                        if (isNaN(value))
                                                            return "Please enter a valid number";
                                                        return true;
                                                    },
                                                })}
                                                onChange={(event) =>
                                                    handleChange({
                                                        name: "duration",
                                                        value: parseInt(
                                                            event.target.value
                                                        ),
                                                    })
                                                }
                                                disabled={isEmpty(
                                                    order.category
                                                )}
                                            />
                                            {errors.duration?.type ===
                                                "required" && (
                                                <p
                                                    role="alert"
                                                    className="tracking-tight text-red-500 text-xs md:text-base"
                                                >
                                                    * Duration of project is
                                                    required.
                                                </p>
                                            )}
                                            {errors.duration?.type ===
                                                "valueAsNumber" && (
                                                <p
                                                    role="alert"
                                                    className="tracking-tight text-red-500 text-xs md:text-base"
                                                >
                                                    * Duration must be number
                                                    format.
                                                </p>
                                            )}
                                            {errors.duration?.type ===
                                                "min" && (
                                                <p
                                                    role="alert"
                                                    className="tracking-tight text-red-500 text-xs md:text-base"
                                                >
                                                    * The minimum duration
                                                    should be 1 day.
                                                </p>
                                            )}
                                            {errors.duration?.type ===
                                                "max" && (
                                                <p
                                                    role="alert"
                                                    className="tracking-tight text-red-500 text-xs md:text-base"
                                                >
                                                    * The maximum duration
                                                    should be 365 days.
                                                </p>
                                            )}
                                            {errors.duration?.type ===
                                                "validate" && (
                                                <p
                                                    role="alert"
                                                    className="tracking-tight text-red-500 text-xs md:text-base"
                                                >
                                                    * {errors.duration.message}
                                                </p>
                                            )}
                                        </div>
                                        <div className="absolute right-0 flex items-center my-auto bg-gray-300 block rounded-lg p-2.5">
                                            <span className="text-gray-500 text-sm font-mono my-auto">
                                                Day
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <label className="text-gray-500 text-xl font-serif">
                                    <b>Decription</b>
                                </label>
                                <div className="w-full mb-4 border border-gray-200 rounded-lg bg-gray-50 mt-1">
                                    {/* <div className="flex items-center justify-between px-3 py-2 border-b">
                                    <div className="flex flex-wrap items-center divide-gray-200 sm:divide-x sm:rtl:divide-x-reverse ">
                                        <div className="flex items-center space-x-1 rtl:space-x-reverse sm:pe-4">
                                            <button
                                                className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100"
                                                type="button"
                                            >
                                                <svg
                                                    aria-hidden="true"
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    viewBox="0 0 12 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M1 6v8a5 5 0 1 0 10 0V4.5a3.5 3.5 0 1 0-7 0V13a2 2 0 0 0 4 0V6"
                                                        stroke="currentColor"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                    />
                                                </svg>
                                                <span className="sr-only">
                                                    Attach file
                                                </span>
                                            </button>
                                            <button
                                                className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100"
                                                type="button"
                                            >
                                                <svg
                                                    aria-hidden="true"
                                                    className="w-4 h-4"
                                                    fill="currentColor"
                                                    viewBox="0 0 16 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M5 5V.13a2.96 2.96 0 0 0-1.293.749L.879 3.707A2.96 2.96 0 0 0 .13 5H5Z" />
                                                    <path d="M14.067 0H7v5a2 2 0 0 1-2 2H0v11a1.969 1.969 0 0 0 1.933 2h12.134A1.97 1.97 0 0 0 16 18V2a1.97 1.97 0 0 0-1.933-2ZM6.709 13.809a1 1 0 1 1-1.418 1.409l-2-2.013a1 1 0 0 1 0-1.412l2-2a1 1 0 0 1 1.414 1.414L5.412 12.5l1.297 1.309Zm6-.6-2 2.013a1 1 0 1 1-1.418-1.409l1.3-1.307-1.295-1.295a1 1 0 0 1 1.414-1.414l2 2a1 1 0 0 1-.001 1.408v.004Z" />
                                                </svg>
                                                <span className="sr-only">
                                                    Format code
                                                </span>
                                            </button>
                                            <button
                                                className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100"
                                                type="button"
                                            >
                                                <svg
                                                    aria-hidden="true"
                                                    className="w-4 h-4"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM13.5 6a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm-7 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm3.5 9.5A5.5 5.5 0 0 1 4.6 11h10.81A5.5 5.5 0 0 1 10 15.5Z" />
                                                </svg>
                                                <span className="sr-only">
                                                    Add emoji
                                                </span>
                                            </button>
                                        </div>
                                        <div className="flex flex-wrap items-center space-x-1 rtl:space-x-reverse sm:ps-4">
                                            <button
                                                className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100"
                                                type="button"
                                            >
                                                <svg
                                                    aria-hidden="true"
                                                    className="w-4 h-4"
                                                    fill="none"
                                                    viewBox="0 0 21 18"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path
                                                        d="M9.5 3h9.563M9.5 9h9.563M9.5 15h9.563M1.5 13a2 2 0 1 1 3.321 1.5L1.5 17h5m-5-15 2-1v6m-2 0h4"
                                                        stroke="currentColor"
                                                        strokeLinecap="round"
                                                        strokeLinejoin="round"
                                                        strokeWidth="2"
                                                    />
                                                </svg>
                                                <span className="sr-only">
                                                    Add list
                                                </span>
                                            </button>
                                            <button
                                                className="p-2 text-gray-500 rounded cursor-pointer hover:text-gray-900 hover:bg-gray-100"
                                                type="button"
                                            >
                                                <svg
                                                    aria-hidden="true"
                                                    className="w-4 h-4"
                                                    fill="currentColor"
                                                    viewBox="0 0 20 20"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                >
                                                    <path d="M18 7.5h-.423l-.452-1.09.3-.3a1.5 1.5 0 0 0 0-2.121L16.01 2.575a1.5 1.5 0 0 0-2.121 0l-.3.3-1.089-.452V2A1.5 1.5 0 0 0 11 .5H9A1.5 1.5 0 0 0 7.5 2v.423l-1.09.452-.3-.3a1.5 1.5 0 0 0-2.121 0L2.576 3.99a1.5 1.5 0 0 0 0 2.121l.3.3L2.423 7.5H2A1.5 1.5 0 0 0 .5 9v2A1.5 1.5 0 0 0 2 12.5h.423l.452 1.09-.3.3a1.5 1.5 0 0 0 0 2.121l1.415 1.413a1.5 1.5 0 0 0 2.121 0l.3-.3 1.09.452V18A1.5 1.5 0 0 0 9 19.5h2a1.5 1.5 0 0 0 1.5-1.5v-.423l1.09-.452.3.3a1.5 1.5 0 0 0 2.121 0l1.415-1.414a1.5 1.5 0 0 0 0-2.121l-.3-.3.452-1.09H18a1.5 1.5 0 0 0 1.5-1.5V9A1.5 1.5 0 0 0 18 7.5Zm-8 6a3.5 3.5 0 1 1 0-7 3.5 3.5 0 0 1 0 7Z" />
                                                </svg>
                                                <span className="sr-only">
                                                    Settings
                                                </span>
                                            </button>
                                        </div>
                                    </div>
                                </div> */}
                                    <div className="px-4 py-2 bg-white rounded-b-lg">
                                        <textarea
                                            className="block w-full px-0 text-sm text-gray-800 bg-white border-0 focus:ring-0"
                                            id="editor"
                                            value={order.description}
                                            placeholder="Write a description..."
                                            required
                                            rows="8"
                                            {...register("description", {
                                                required: true,
                                                min: 20,
                                                max: 16200,
                                            })}
                                            onChange={(event) =>
                                                handleChange({
                                                    name: "description",
                                                    value: event.target.value,
                                                })
                                            }
                                            disabled={isEmpty(order.category)}
                                        />
                                        {errors.description?.type ===
                                            "required" && (
                                            <p
                                                role="alert"
                                                className="tracking-tight text-red-500 text-xs md:text-base"
                                            >
                                                * Description is required.
                                            </p>
                                        )}
                                        {errors.description?.type ===
                                            "minLength" && (
                                            <p
                                                role="alert"
                                                className="tracking-tight text-red-500 text-xs md:text-base"
                                            >
                                                * Min length of description must
                                                be 10 characters.
                                            </p>
                                        )}
                                        {errors.description?.type ===
                                            "maxLength" && (
                                            <p
                                                role="alert"
                                                className="tracking-tight text-red-500 text-xs md:text-base"
                                            >
                                                * Max length of description must
                                                be 16200 characters.
                                            </p>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                        <button
                            className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                            type="submit"
                            disabled={isEmpty(order.category)}
                        >
                            {isToCreate ? "Submit" : "Update"}
                        </button>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default ModalOrder;
