import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useForm } from "react-hook-form";
import clsBtn from "../../../../public/images/ordering/close-window-96.png";
import { useCreateProject } from "@/hooks";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer, toast } from "react-toastify";

const AcceptOrderModal = ({ order, handleClose }) => {
    const {
        register,
        watch,
        formState: { errors },
        handleSubmit: submit,
    } = useForm();

    const { data, mutateAsync: acceptOrder } = useCreateProject();

    const [project, setProject] = useState({
        title: order.title,
        description: order.description,
        category: order.category,
        duration: order.duration,
        price: order.minimumPrice,
        user_id: order.user.id,
        order_id: order.id,
    });

    const handleCloseWindow = () => {
        handleClose();
    };

    const handleChange = (event) => {
        const { name, value } = event;
        setProject((prevProject) => {
            return {
                ...prevProject,
                [name]: value,
            };
        });
    };

    const formatDate = (timestamp) => {
        const date = new Date(timestamp);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
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

    const handleSubmit = (event) => {
        try {
            toast.promise(
                async () => await Promise.resolve(acceptOrder(project)),
                {
                    pending: "Accepting Ordering ...",
                    success: {
                        render() {
                            handleClose();
                            return "Project was created successfully.";
                        },
                    },
                    error: {
                        render({ data }) {
                            if (data.response) {
                                if (data.response.status === 403) {
                                    return "Your are not staff!";
                                } else if (data.response.status === 422) {
                                    return "There is a problem in field of project";
                                } else {
                                    return `${data.response.data.message}| code ${data.response.status}`;
                                }
                            }
                        },
                    },
                }
            );
        } catch (error) {
            console.log(error);
        }
    };

    const resolveCategory = (codeCategory) => {
        switch (codeCategory) {
            case "AI":
                return "Artificial intelligence";
            case "GD":
                return "Game Development";
            case "SM":
                return "Server Management";
            default:
                return "Software Development";
        }
    };

    return (
        <>
            <ToastContainer position="top-center" />
            <Modal
                isOpen={true}
                className="overflow-auto max-h-90vh h-6.5/7 w-4/5 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-zinc-900 rounded-md px-5 py-1 w-400 max-w-full"
            >
                <button className="" onClick={() => handleCloseWindow()}>
                    <img src={clsBtn} className="w-12 h-8" />
                </button>
                <div className="flex flex-col">
                    <div className="pt-2.5 pb-5 border-b border-zinc-100 rounded-md">
                        <div className="container-fluid flex gap-x-6 mt-2">
                            <div className="flex flex-col px-5 py-2.5 bg-zinc-800 text-gray-100 rounded-lg">
                                <div className="text-3xl font-serif">Title</div>
                                <b className="font-medium">{order.title}</b>
                            </div>
                            <div className="flex flex-col px-5 py-2.5 bg-zinc-800 text-gray-50 rounded-lg">
                                <div className="text-3xl text-zinc-50 font-serif">
                                    Category
                                </div>
                                <b className="font-medium">
                                    {resolveCategory(order.category)}
                                </b>
                            </div>
                            <div className="flex flex-col px-5 py-2.5 bg-zinc-800 text-gray-100 rounded-lg">
                                <div className="text-3xl font-serif">
                                    Employer
                                </div>
                                <b className="font-medium text-green-600 text-lg">
                                    <u>{order.user.name}</u>
                                </b>
                            </div>
                        </div>
                        <div className="flex flex-col px-5 py-4 bg-zinc-800 text-gray-100 text-sm rounded-lg tracking-wider mt-5">
                            <div className="text-3xl font-serif">
                                Description
                            </div>
                            <p className="pt-4 tracking-normal text-zinc-300">
                                {order.description}
                            </p>
                        </div>
                        <div className="flex justify-between mt-5 gap-x-4">
                            <div className="flex flex-col px-4 py-2.5 bg-zinc-800 text-gray-100 rounded-lg w-full">
                                <div className="text-lg text-white font-serif">
                                    <b>Registered in</b>
                                </div>
                                <div className="pt-1 text-sm">
                                    {formatDate(order.created_at)}
                                </div>
                            </div>
                            <div className="flex flex-col px-4 py-2.5 bg-zinc-800 text-gray-100 rounded-lg w-full">
                                <div className="text-lg text-blue-500 font-serif">
                                    <b>Minimum Price</b>
                                </div>
                                <div className="pt-1 text-sm">
                                    {formatPrice(order.minimumPrice)} Toman
                                </div>
                            </div>
                            <div className="flex flex-col px-4 py-2.5 bg-zinc-800 text-gray-100 rounded-lg w-full">
                                <div className="text-lg text-red-500 font-serif">
                                    <b>Maximum Price</b>
                                </div>
                                <div className="pt-1 text-sm">
                                    {formatPrice(order.maximumPrice)} Toman
                                </div>
                            </div>
                            <div className="flex flex-col px-4 py-2.5 bg-zinc-800 text-gray-100 rounded-lg w-full">
                                <div className="text-lg text-white font-serif">
                                    <b>Project Duration</b>
                                </div>
                                <div className="pt-1 text-sm">
                                    {order.duration} Days
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center text-center text-white text-4xl font-serif tracking-wider py-2.5 mt-2">
                    <h2 className="border-double border-slate-50 border-b rounded-sm w-2/3">
                        Finalize the Order
                    </h2>
                </div>
                <form
                    onSubmit={submit(handleSubmit)}
                    encType="multipart/form-data"
                    className=""
                >
                    <div className="flex justify-between gap-5">
                        <div className="mb-2 relative w-1/2">
                            <label className="font-serif text-xl tracking-wider text-gray-50">
                                Final Price
                            </label>
                            <div className="flex">
                                <input
                                    className="bg-gray-300 border border-gray-300 bg-gray-300 text-xl font-bold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10"
                                    id="default-input"
                                    value={
                                        isNaN(parseInt(project.price))
                                            ? 0
                                            : formatPrice(project.price)
                                    }
                                    type="text"
                                    placeholder="e.g.150000"
                                    required
                                    {...register("price", {
                                        required: true,
                                        valueAsNumber: true,
                                        min: order.minimumPrice,
                                        max: order.maximumPrice,
                                    })}
                                    onChange={(event) => {
                                        var price = parsePrice(
                                            event.target.value
                                        );
                                        if (isNaN(price)) price = 0;
                                        if (price <= 20000000) {
                                            handleChange({
                                                name: "price",
                                                value: parsePrice(
                                                    event.target.value
                                                ),
                                            });
                                        }
                                    }}
                                />
                                {errors.price?.type === "required" && (
                                    <p
                                        role="alert"
                                        className="tracking-tight text-red-500 text-xs md:text-base"
                                    >
                                        * Final price is required.
                                    </p>
                                )}
                                {errors.price?.type === "valueAsNumber" && (
                                    <p
                                        role="alert"
                                        className="tracking-tight text-red-500 text-xs md:text-base"
                                    >
                                        * Price must be number format.
                                    </p>
                                )}
                                {errors.price?.type === "min" && (
                                    <p
                                        role="alert"
                                        className="tracking-tight text-red-500 text-xs md:text-base"
                                    >
                                        * The price should be higher than{" "}
                                        {order.minimumPrice}
                                        Tomans.
                                    </p>
                                )}
                                {errors.price?.type === "max" && (
                                    <p
                                        role="alert"
                                        className="tracking-tight text-red-500 text-xs md:text-base"
                                    >
                                        * The price should be less than
                                        {order.maximumPrice} Tomans.
                                    </p>
                                )}
                                {/* {errors.price?.type === "validate" && (
                                    <p
                                        role="alert"
                                        className="tracking-tight text-red-500 text-xs md:text-base"
                                    >
                                        * {errors.price.message}
                                    </p>
                                )} */}
                                {/* <div className="absolute right-0 items-center text-center bg-gray-300 p-2 block rounded-lg">
                                    <span className="text-gray-500 text-sm font-mono">
                                        Toman
                                    </span>
                                </div> */}
                            </div>
                        </div>
                        <div className="mb-2 relative w-1/2">
                            <label className="font-serif text-xl tracking-wider text-gray-50">
                                Duration
                            </label>
                            <div className="flex">
                                <input
                                    className="bg-gray-300 border border-gray-300 text-gray-900 text-xl font-bold rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                                    id="price-input"
                                    value={project.duration}
                                    type="number"
                                    placeholder="e.g.25"
                                    required
                                    {...register("duration", {
                                        required: true,
                                        valueAsNumber: true,
                                        min: 1,
                                        max: order.duration,
                                        validate: (value) => {
                                            if (isNaN(value))
                                                return "Please enter a valid number";
                                            return true;
                                        },
                                    })}
                                    onChange={(event) => {
                                        var value = parseInt(
                                            event.target.value
                                        );
                                        if (isNaN(value)) value = 1;
                                        if (value <= 365) {
                                            handleChange({
                                                name: "duration",
                                                value: value,
                                            });
                                        }
                                    }}
                                />
                                {errors.duration?.type === "required" && (
                                    <p
                                        role="alert"
                                        className="tracking-tight text-red-500 text-xs md:text-base"
                                    >
                                        * Duration of project is required.
                                    </p>
                                )}
                                {errors.duration?.type === "valueAsNumber" && (
                                    <p
                                        role="alert"
                                        className="tracking-tight text-red-500 text-xs md:text-base"
                                    >
                                        * Duration must be number format.
                                    </p>
                                )}
                                {errors.duration?.type === "min" && (
                                    <p
                                        role="alert"
                                        className="tracking-tight text-red-500 text-xs md:text-base"
                                    >
                                        * The minimum duration should be 1 day.
                                    </p>
                                )}
                                {errors.duration?.type === "max" && (
                                    <p
                                        role="alert"
                                        className="tracking-tight text-red-500 text-xs md:text-base"
                                    >
                                        * The maximum duration should be less
                                        than {order.duration} days.
                                    </p>
                                )}
                                {errors.duration?.type === "validate" && (
                                    <p
                                        role="alert"
                                        className="tracking-tight text-red-500 text-xs md:text-base"
                                    >
                                        * {errors.duration.message}
                                    </p>
                                )}
                                {/* <div className="absolute right-0 flex items-center my-auto bg-gray-300 block rounded-lg p-2.5">
                                        <span className="text-gray-500 text-sm font-mono my-auto">
                                            Day
                                        </span>
                                    </div> */}
                            </div>
                        </div>
                    </div>
                    <button
                        className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Accept
                    </button>
                </form>
            </Modal>
        </>
    );
};

export default AcceptOrderModal;
