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
import clsBtn from "../../../../public/images/ordering/close-window-100.png";
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

    const formatPrice = (price) => {
        return parseFloat(price)
            .toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
                minimumFractionDigits: 0,
            })
            .replace("$", "");
    };

    const parsePrice = (formattedPrice) => {
        const numericPrice = parseFloat(
            formattedPrice.replace(/[^0-9.-]+/g, "")
        );
        return numericPrice;
    };

    return (
        <>
            <ToastContainer position="top-center" />
            <Modal
                isOpen={true}
                className="overflow-auto max-h-90vh h-6.5/7 w-4/5 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-zinc-900 rounded-md px-5 py-1 w-400 max-w-full"
            >
                <form
                    onSubmit={submit(handleSubmit)}
                    encType="multipart/form-data"
                    className="flex-md-row h-full w-full fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-zinc-900 rounded-md px-5 py-1 w-400 max-w-full"
                >
                    <div className="container-fluid">
                        <div>
                            <button
                                className=""
                                onClick={() => handleCloseWindow()}
                            >
                                <img src={clsBtn} className="w-8 h-8 mt-4" />
                            </button>
                            <div className="font-serif text-3xl text-center text-gray-100 tracking-wider border-b border-gray-100 mx-auto mb-8 w-3/4">
                                Project Ordering
                            </div>
                            <div className="flex justify-between">
                                <h2 className="font-serif text-2xl tracking-wider text-gray-100 my-auto">
                                    Category
                                </h2>
                            </div>
                            <div className="grid grid-cols-4 gap-4 mt-1">
                                <div
                                    className={`flex-row items-center text-center rounded-md border-2 border-gray-100 cursor-pointer ${
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
                                    <div className="text-sm font-semibold text-zinc-200">
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
                                    <div className="text-sm font-semibold text-zinc-100">
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
                                    <div className="text-sm font-semibold text-zinc-200">
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
                                        className={`text-sm font-semibold text-zinc-200`}
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
                                <h2 className="font-serif text-2xl tracking-wider text-gray-100">
                                    Title
                                </h2>
                                <div className="mt-1">
                                    <div className="mb-4">
                                        <input
                                            className="bg-gray-50 border border-gray-300 text-zinc-100 bg-zinc-900 text-sm rounded-lg hover:bg-zinc-700 focus:bg-zinc-700 focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
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
                                    <label className="font-serif text-2xl tracking-wider text-gray-100">
                                        Minimum Price
                                    </label>
                                    <div className="flex">
                                        <div className="w-full">
                                            <input
                                                className="border border-gray-300 text-gray-100 bg-zinc-900 hover:bg-zinc-700 focus:bg-zinc-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10"
                                                id="default-input"
                                                value={
                                                    isNaN(
                                                        parseInt(
                                                            order.minimumPrice
                                                        )
                                                    )
                                                        ? formatPrice(50000)
                                                        : formatPrice(
                                                              order.minimumPrice
                                                          )
                                                }
                                                type="text"
                                                placeholder="e.g.150,000"
                                                required
                                                {...register("minimumPrice", {
                                                    required: true,
                                                    valueAsNumber: true,
                                                    min: 50000,
                                                    max: 10000000,
                                                    validate: (value) => {
                                                        if (!isValidPrice) {
                                                            return "The minimum price should be less than the maximum price.";
                                                        } else if (
                                                            order.minimumPrice >
                                                            10000000
                                                        ) {
                                                            return "The minimum price should be less than 10,000,000 Tomans.";
                                                        }
                                                        return true;
                                                    },
                                                })}
                                                onChange={(event) =>
                                                    handleChange({
                                                        name: "minimumPrice",
                                                        value: parsePrice(
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
                                                    * The minimum price should
                                                    be less than 10,000,000
                                                    Tomans.
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
                                            <span className="text-gray-600 text-sm font-mono">
                                                Toman
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-6 relative">
                                    <label className="font-serif text-2xl tracking-wider text-gray-100">
                                        Maximum Price
                                    </label>
                                    <div className="flex">
                                        <div className="w-full">
                                            <input
                                                className="border border-gray-300 text-gray-100 bg-zinc-900 hover:bg-zinc-700 focus:bg-zinc-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10"
                                                id="default-input"
                                                value={
                                                    isNaN(
                                                        parseInt(
                                                            order.maximumPrice
                                                        )
                                                    )
                                                        ? formatPrice(50000)
                                                        : formatPrice(
                                                              order.maximumPrice
                                                          )
                                                }
                                                type="text"
                                                placeholder="e.g.500,000"
                                                required
                                                {...register("maximumPrice", {
                                                    required: true,
                                                    valueAsNumber: true,
                                                    min: 50000,
                                                    max: 10000000,
                                                    validate: (value) => {
                                                        if (!isValidPrice) {
                                                            return "The maximum price should be greater than the minimum price.";
                                                        } else if (
                                                            order.maximumPrice >
                                                            10000000
                                                        ) {
                                                            return "The maximum price should be less than 10,000,000 Toman";
                                                        }
                                                        return true;
                                                    },
                                                })}
                                                onChange={(event) =>
                                                    handleChange({
                                                        name: "maximumPrice",
                                                        value: parsePrice(
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
                                            <span className="text-gray-600 text-sm font-mono">
                                                Toman
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                <div className="mb-6 relative">
                                    <label className="font-serif text-2xl tracking-wider text-gray-100">
                                        Duration
                                    </label>
                                    <div className="flex">
                                        <div className="w-full">
                                            <input
                                                className="border border-gray-300 text-gray-100 bg-zinc-900 hover:bg-zinc-700 focus:bg-zinc-700 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                                id="price-input"
                                                value={order.duration || 20}
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
                                            <span className="text-gray-600 text-sm font-mono my-auto">
                                                Day
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="">
                                <label className="text-gray-100 text-2xl tracking-wider font-serif">
                                    Decription
                                </label>
                                <div className="w-full mb-4 border border-gray-200 rounded-lg mt-1">
                                    <textarea
                                        className="block w-full px-2 py-2 text-sm text-gray-100 bg-zinc-900 hover:bg-zinc-700 focus:bg-zinc-700 border-0 focus:ring-0"
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
                                            * Min length of description must be
                                            10 characters.
                                        </p>
                                    )}
                                    {errors.description?.type ===
                                        "maxLength" && (
                                        <p
                                            role="alert"
                                            className="tracking-tight text-red-500 text-xs md:text-base"
                                        >
                                            * Max length of description must be
                                            16200 characters.
                                        </p>
                                    )}
                                </div>
                            </div>
                        </div>
                        <div className="flex mx-auto justify-center w-1/4">
                            <button
                                className="text-white bg-orange-600 hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-orange-300 font-medium rounded-lg text-sm px-10 py-2.5 text-center me-2 mt-8 mb-8 w-full"
                                type="submit"
                                disabled={isEmpty(order.category)}
                            >
                                {isToCreate ? "Submit" : "Update"}
                            </button>
                        </div>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default ModalOrder;
