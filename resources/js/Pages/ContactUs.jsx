import React from "react";
import HeaderLayouts from "@/Layouts/Header";
import { FaVoicemail } from "react-icons/fa/index.esm";
import { FaMailBulk, FaUsers } from "react-icons/fa";

const ContactUs = ({ auth }) => {
    return (
        <>
            <HeaderLayouts auth={auth} />
            <div className="py-24 sm:py-32 bg-gray-800">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto text-center">
                        <h2 className="text-3xl font-bold tracking-tight text-gray-200 sm:text-4xl">
                            Contact Us
                        </h2>
                        <p className="mt-2 text-lg leading-8 text-gray-300">
                            You can choose the way to communicate with us.
                        </p>
                    </div>
                    <div className="mx-auto mt-10 grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 border-t border-gray-200 pt-10 sm:mt-16 sm:pt-16 lg:mx-0 lg:max-w-none lg:grid-cols-3">
                        <article className="items-center rounded-2xl border-t border-b">
                            <div className="flex-row mx-auto shadow-3xl items-center px-5 py-8">
                                <FaMailBulk className="text-7xl text-orange-600 mx-auto" />
                                <div className="flex-row text-gray-200 text-center mt-4">
                                    <h3 className="font-serif">Email</h3>
                                    <p className="pt-2">semicolon@gmail.com</p>
                                </div>
                            </div>
                        </article>
                        <article className="items-center rounded-2xl border-t border-b">
                            <div className="flex-row mx-auto shadow-3xl items-center px-5 py-8">
                                <FaUsers className="text-7xl text-orange-600 mx-auto" />
                                <div className="flex-row text-gray-200 text-center mt-4">
                                    <h3 className="font-serif">
                                        Help and Support
                                    </h3>
                                    <p className="pt-2">
                                        <u>get supprort</u>
                                    </p>
                                </div>
                            </div>
                        </article>
                        <article className="items-center rounded-2xl border-t border-b">
                            <div className="flex-row mx-auto shadow-3xl items-center px-5 py-8">
                                <FaVoicemail className="text-7xl text-orange-600 mx-auto" />
                                <div className="flex-row text-gray-200 text-center mt-4">
                                    <h3 className="font-serif">Call</h3>
                                    <p className="pt-2">+989103845418</p>
                                </div>
                            </div>
                        </article>
                    </div>
                    <section className="">
                        <div className="py-8 lg:py-16 px-4 mx-auto max-w-screen-md">
                            <p className="mb-8 lg:mb-16 font-light text-center text-gray-500 dark:text-gray-400 sm:text-xl">
                                Got a technical issue? Want to send feedback
                                about a beta feature? Need details about our
                                Business plan? Let us know.
                            </p>
                            <form action="#" className="space-y-8">
                                <div>
                                    <label
                                        htmlFor="email"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                    >
                                        Your email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                                        placeholder="name@flowbite.com"
                                        required=""
                                    />
                                </div>
                                <div>
                                    <label
                                        htmlFor="subject"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                                    >
                                        Subject
                                    </label>
                                    <input
                                        type="text"
                                        id="subject"
                                        className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"
                                        placeholder="Let us know how we can help you"
                                        required=""
                                    />
                                </div>
                                <div className="sm:col-span-2">
                                    <label
                                        htmlFor="message"
                                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400"
                                    >
                                        Your message
                                    </label>
                                    <textarea
                                        id="message"
                                        rows={6}
                                        className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                        placeholder="Leave a comment..."
                                        defaultValue={""}
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="py-3 px-5 text-sm font-medium text-center text-white rounded-lg bg-orange-600 sm:w-fit hover:bg-orange-700 focus:ring-4 focus:outline-none focus:ring-primary-300"
                                >
                                    Send message
                                </button>
                            </form>
                        </div>
                    </section>
                </div>
            </div>
        </>
    );
};

export default ContactUs;
