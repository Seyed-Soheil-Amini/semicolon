import React, { useState } from "react";
import HeaderLayouts from "@/Layouts/Header";
import { FaVoicemail } from "react-icons/fa/index.esm";
import { FaMailBulk, FaUsers } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer, toast } from "react-toastify";
import { useStoreMessage } from "@/hooks";
import { useForm } from "react-hook-form";
import FooterLayout from "@/Layouts/Footer";
import { useTranslation } from "react-i18next";

const ContactUs = ({ auth }) => {
    const [message, setMessage] = useState({
        senderName: "",
        email: "",
        subject: "",
        body: "",
    });
    const { t } = useTranslation();

    const handleChangeMessage = (event) => {
        const { name, value } = event;
        setMessage((prevBlog) => {
            return {
                ...prevBlog,
                [name]: value,
            };
        });
    };

    const {
        register,
        formState: { errors },
        handleSubmit: submit,
    } = useForm();

    function handleSubmit(event) {
        toast.promise(
            async () => await Promise.resolve(useStoreMessage(message)),
            {
                pending: t("toast.cnt.pnd"),
                success: {
                    render() {
                        setMessage({
                            senderName: "",
                            email: "",
                            subject: "",
                            body: "",
                        });
                        return t("toast.cnt.scs");
                    },
                },
                error: t("toast.cnt.plb"),
            }
        );
    }

    return (
        <>
            <HeaderLayouts auth={auth} />
            <ToastContainer position="top-center" />
            <div className="py-24 sm:py-32 bg-gray-900 overflow-hidden saturate-100">
                <img
                    src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&crop=focalpoint&fp-y=.8&w=2830&h=1500&q=80&blend=111827&sat=-100&exp=15&blend-mode=multiply"
                    alt=""
                    className="absolute inset-0 -z-10 h-full w-full object-cover object-center md:object-center"
                />
                <div
                    className="hidden sm:absolute sm:-top-10 sm:right-1/2 sm:-z-10 sm:mr-10 sm:block sm:transform-gpu sm:blur-3xl"
                    aria-hidden="true"
                >
                    <div
                        className="aspect-[1097/845] w-[68.5625rem] bg-gradient-to-tr from-[#ff4694] to-[#776fff] opacity-20"
                        style={{
                            clipPath:
                                "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)",
                        }}
                    />
                </div>
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto text-center animate-fade-down animate-once">
                        <h2 className="text-2xl md:text-4xl font-bold tracking-tight text-gray-200">
                            {t("cnt.head.tit")}
                        </h2>
                        <p className="mt-2 text-md md:text-xl leading-8 text-gray-300">
                            {t("cnt.head.txt")}
                        </p>
                    </div>
                    <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        <article className="items-center rounded-2xl border-t border-b animate-fade-down animate-once">
                            <div className="flex-row mx-auto shadow-3xl items-center px-5 py-8">
                                <FaMailBulk className="text-7xl text-orange-600 mx-auto" />
                                <div className="flex-row text-gray-200 text-center mt-4">
                                    <h3 className="font-serif">
                                        {t("cnt.email.tit")}
                                    </h3>
                                    <p className="pt-2">{t("cnt.email.txt")}</p>
                                </div>
                            </div>
                        </article>
                        <article className="items-center rounded-2xl border-t border-b animate-fade-down animate-once">
                            <div className="flex-row mx-auto shadow-3xl items-center px-5 py-8">
                                <FaUsers className="text-7xl text-orange-600 mx-auto" />
                                <div className="flex-row text-gray-200 text-center mt-4">
                                    <h3 className="font-serif">
                                        {t("cnt.hlp.tit")}
                                    </h3>
                                    <p className="pt-2">
                                        <a
                                            href="#message"
                                            className="text-gray-200 hover:text-blue-600"
                                        >
                                            <u>{t("cnt.hlp.txt")}</u>
                                        </a>
                                    </p>
                                </div>
                            </div>
                        </article>
                        <article className="items-center rounded-2xl border-t border-b animate-fade-down animate-once">
                            <div className="flex-row mx-auto shadow-3xl items-center px-5 py-8">
                                <FaVoicemail className="text-7xl text-orange-600 mx-auto" />
                                <div className="flex-row text-gray-200 text-center mt-4">
                                    <h3 className="font-serif">
                                        {t("cnt.cal.tit")}
                                    </h3>
                                    <p className="pt-2">{t("+989103845418")}</p>
                                </div>
                            </div>
                        </article>
                    </div>
                    <section id="message" className="">
                        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                            <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 text-sm md:text-xl">
                                {t("cnt.msg.head")}
                            </p>
                            <form
                                className="space-y-8"
                                onSubmit={submit(handleSubmit)}
                            >
                                <div>
                                    <label
                                        htmlFor="senderName"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                    >
                                        {t("cnt.msg.name")}
                                    </label>
                                    <input
                                        type="text"
                                        id="senderName"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                                        placeholder="first and last name"
                                        value={message.senderName}
                                        required
                                        {...register("senderName", {
                                            required: true,
                                            maxLength: 60,
                                        })}
                                        aria-invalid={
                                            errors.senderName ? "true" : "false"
                                        }
                                        onChange={(event) =>
                                            handleChangeMessage({
                                                name: "senderName",
                                                value: event.target.value,
                                            })
                                        }
                                    />
                                    {errors.title?.type === "required" && (
                                        <p
                                            role="alert"
                                            className="text-red-400 text-sm md:text-md pt-2"
                                        >
                                            * {t("cush.name.req")}
                                        </p>
                                    )}
                                    {errors.title?.type === "maxLength" && (
                                        <p
                                            role="alert"
                                            className="text-red-400 text-sm md:text-md pt-2"
                                        >
                                            {t("cush.name.limit")}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                    >
                                        {t("cnt.msg.email")}
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                                        placeholder="name@gmail.com"
                                        value={message.email}
                                        required
                                        {...register("email", {
                                            required: true,
                                            maxLength: 120,
                                            pattern:
                                                /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        })}
                                        aria-invalid={
                                            errors.email ? "true" : "false"
                                        }
                                        onChange={(event) =>
                                            handleChangeMessage({
                                                name: "email",
                                                value: event.target.value,
                                            })
                                        }
                                    />
                                    {errors.email?.type === "required" && (
                                        <p
                                            role="alert"
                                            className="text-red-400 text-sm md:text-md pt-2"
                                        >
                                            * {t("cush.email.req")}
                                        </p>
                                    )}
                                    {errors.email?.type === "maxLength" && (
                                        <p
                                            role="alert"
                                            className="text-red-400 text-sm md:text-md pt-2"
                                        >
                                            * {t("cush.email.limit")}
                                        </p>
                                    )}
                                    {errors.email?.type === "pattern" && (
                                        <p
                                            role="alert"
                                            className="text-red-400 text-sm md:text-md pt-2"
                                        >
                                            * {t("cush.email.val")}
                                        </p>
                                    )}
                                </div>
                                <div>
                                    <label
                                        htmlFor="subject"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                    >
                                        {t("cnt.msg.subj")}
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                                        placeholder="Let us know how we can help you"
                                        value={message.subject}
                                        required
                                        {...register("subject", {
                                            required: true,
                                            maxLength: 200,
                                        })}
                                        aria-invalid={
                                            errors.subject ? "true" : "false"
                                        }
                                        onChange={(event) =>
                                            handleChangeMessage({
                                                name: "subject",
                                                value: event.target.value,
                                            })
                                        }
                                    />
                                    {errors.subject?.type === "required" && (
                                        <p
                                            role="alert"
                                            className="text-red-400 text-sm md:text-md pt-2"
                                        >
                                            * {t("cush.subj.req")}
                                        </p>
                                    )}
                                    {errors.subject?.type === "maxLength" && (
                                        <p
                                            role="alert"
                                            className="text-red-400 text-sm md:text-md pt-2"
                                        >
                                            * {t("cush.subj.limit")}
                                        </p>
                                    )}
                                </div>
                                <div className="sm:col-span-2">
                                    <label
                                        htmlFor="body"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                                    >
                                        {t("cnt.msg.msg")}
                                    </label>
                                    <textarea
                                        id="body"
                                        rows={6}
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Leave a comment..."
                                        defaultValue={""}
                                        value={message.body}
                                        required
                                        {...register("body", {
                                            required: true,
                                            maxLength: 16000,
                                            minLength: 40,
                                        })}
                                        aria-invalid={
                                            errors.body ? "true" : "false"
                                        }
                                        onChange={(event) =>
                                            handleChangeMessage({
                                                name: "body",
                                                value: event.target.value,
                                            })
                                        }
                                    />
                                    {errors.body?.type === "required" && (
                                        <p
                                            role="alert"
                                            className="text-red-400 text-sm md:text-md pt-2"
                                        >
                                            * {t("cush.msg.req")}
                                        </p>
                                    )}
                                    {errors.body?.type === "maxLength" && (
                                        <p
                                            role="alert"
                                            className="text-red-400 text-sm md:text-md pt-2"
                                        >
                                            * {t("cush.msg.maxl")}
                                        </p>
                                    )}
                                    {errors.body?.type === "minLength" && (
                                        <p
                                            role="alert"
                                            className="text-red-400 text-sm md:text-md pt-2"
                                        >
                                            * {t("cush.msg.minl")}
                                        </p>
                                    )}
                                </div>
                                <button
                                    type="submit"
                                    className="py-3 px-3 md:px-5 text-xs md:text-sm font-medium text-center text-white rounded-lg bg-orange-600 sm:w-fit hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-primary-300"
                                >
                                    {t("cnt.msg.btn")}
                                </button>
                            </form>
                        </div>
                    </section>
                </div>
            </div>
            <FooterLayout />
        </>
    );
};

export default ContactUs;
