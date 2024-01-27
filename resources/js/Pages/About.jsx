import HeaderLayouts from "@/Layouts/Header";
import FooterLayout from "@/Layouts/Footer";
import React from "react";
import { useTranslation } from "react-i18next";

const About = ({ auth }) => {
    const { t } = useTranslation();
    return (
        <>
            <HeaderLayouts auth={auth} />
            <div className="relative saturate-100 overflow-hidden bg-gray-900 py-24 sm:py-32">
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
                <div
                    className="absolute -top-52 left-1/2 -z-10 -translate-x-1/2 transform-gpu blur-3xl sm:top-[-28rem] sm:ml-16 sm:translate-x-0 sm:transform-gpu"
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
                    <div className="flex flex-col lg:flex-row max-w-7x lg:mx-0">
                        <div className="flex flex-col lg:w-1/2 animate-fade-down animate-once">
                            <h2 className="text-3xl md:text-6xl font-bold tracking-tight text-gray-200">
                                {t("abt.head.tit")}
                            </h2>
                            <p className="mt-6 text-xs md:text-lg lg:text-xl leading-8 text-gray-300 font-serif">
                                {t("abt.head.txt")}
                            </p>
                        </div>
                        <div className="flex items-center justify-center lg:w-1/2 mt-2">
                            <img
                                className="w-1/2 lg:w-3/4 mx-auto animate-bounce mt-5 md:mt-3 lg:mt-2"
                                src="images\semicolon.gif"
                                alt="Semicolon gif"
                            />
                        </div>
                    </div>
                    <div className="mx-auto mt-10 max-w-2xl lg:mx-0 lg:max-w-none">
                        <dl className="mt-16 grid grid-cols-1 gap-8 sm:mt-20 sm:grid-cols-2 lg:grid-cols-4">
                            <div className="flex flex-col-reverse animate-flip-up animate-once">
                                <dt className="text-base leading-7 text-gray-300">
                                    {t("abt.ref.tit1")}
                                </dt>
                                <dd className="text-2xl font-bold leading-9 tracking-tight text-white">
                                    {t("abt.ref.val1")}
                                </dd>
                            </div>
                            <div className="flex flex-col-reverse animate-flip-up animate-once animate-duration-[1500ms]">
                                <dt className="text-base leading-7 text-gray-300">
                                    {t("abt.ref.tit2")}
                                </dt>
                                <dd className="text-2xl font-bold leading-9 tracking-tight text-white">
                                    {t("abt.ref.val2")}
                                </dd>
                            </div>
                            <div className="flex flex-col-reverse animate-flip-up animate-once animate-duration-[2000ms]">
                                <dt className="text-base leading-7 text-gray-300">
                                    {t("abt.ref.tit3")}
                                </dt>
                                <dd className="text-2xl font-bold leading-9 tracking-tight text-white">
                                    {t("abt.ref.val3")}
                                </dd>
                            </div>
                            <div className="flex flex-col-reverse animate-flip-up animate-once animate-duration-[2500ms]">
                                <dt className="text-base leading-7 text-gray-300">
                                    {t("abt.ref.tit4")}
                                </dt>
                                <dd className="text-2xl font-bold leading-9 tracking-tight text-white">
                                    {t("abt.ref.val4")}
                                </dd>
                            </div>
                        </dl>
                        <div className="flex flex-col md:flex-row justify-between mt-10 text-base font-semibold leading-7 text-white">
                            <a
                                href="#history"
                                className="text-sm md:text-lg hover:text-gray-200 pt-2 md:pt-0"
                            >
                                {t("abt.ref.subr1")}{" "}
                                <span aria-hidden="true">→</span>
                            </a>
                            <a
                                href="#future"
                                className="text-sm md:text-lg hover:text-gray-200 pt-2 md:pt-0"
                            >
                                {t("abt.ref.subr2")}{" "}
                                <span aria-hidden="true">→</span>
                            </a>
                            <a
                                href="#service"
                                className="text-sm md:text-lg hover:text-gray-200 pt-2 md:pt-0"
                            >
                                {t("abt.ref.subr3")}{" "}
                                <span aria-hidden="true">→</span>
                            </a>
                            <a
                                href="#value"
                                className="text-sm md:text-lg hover:text-gray-200 pt-2 md:pt-0"
                            >
                                {t("abt.ref.subr4")}{" "}
                                <span aria-hidden="true">→</span>
                            </a>
                        </div>
                    </div>
                </div>
                <div className="container mx-auto mt-20 pt-10">
                    <div
                        className="flex flex-col mt-10 animate-fade-right animate-once"
                        id="history"
                    >
                        <h3 className="text-gray-100 uppercase text-lg md:text-3xl">
                            {t("abt.his.tit")}
                        </h3>
                        <div className="flex justify-start">
                            <hr className="my-2 border-gray-500 w-1/2" />
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row px-3 py-10 h-1/4 text-gray-200 rounded backdrop-saturate-150 shadow-2xl backdrop-blur-md animate-fade-right animate-once">
                        <div className="order-1 sm:order-1 flex items-center w-full sm:w-1/3 my-auto pb-3 md:pb-0">
                            <img
                                src="images/about/history.png"
                                className="w-1/3 mx-auto animate-snake"
                            />
                        </div>
                        <div className="order-2 sm:order-2 text-center my-auto items-center text-xs md:text-lg lg:text-xl font-serif w-full sm:w-2/3">
                            {t("abt.his.txt")}
                        </div>
                    </div>
                    <div
                        className="flex flex-col mt-20 pt-16 animate-fade-left animate-once"
                        id="future"
                    >
                        <h3 className="flex justify-content-end text-gray-100 uppercase text-lg md:text-3xl">
                            {t("abt.vis.tit")}
                        </h3>
                        <div className="flex justify-end">
                            <hr className="my-2 border-gray-300 w-1/2" />
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row px-3 py-10 h-1/4 text-gray-200 rounded backdrop-saturate-150 shadow-2xl backdrop-blur-md animate-fade-left animate-once">
                        <div className="md:order-2 sm:order-1 lg:order-2 text-center w-full sm:w-1/3 pb-3 md:pb-0">
                            <img
                                src="images/about/future.png"
                                className="w-1/3 mx-auto animate-snake"
                            />
                        </div>
                        <div className="md:order-1 sm:order-2 lg:order-1 text-center my-auto items-center text-xs md:text-lg lg:text-xl font-serif w-full sm:w-2/3">
                            {t("abt.vis.txt")}
                        </div>
                    </div>
                    <div className="flex flex-col mt-10 pt-16" id="service">
                        <h3 className="text-gray-100 uppercase text-lg md:text-3xl animate-fade-right animate-once">
                            {t("abt.srv.tit")}
                        </h3>
                        <div className="flex justify-start">
                            <hr className="my-2 border-gray-500 w-1/2" />
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row px-3 py-10 h-1/4 text-gray-200 rounded backdrop-saturate-150 shadow-2xl backdrop-blur-md animate-fade-right animate-once">
                        <div className="md:order-1 order-1 text-center w-full sm:w-1/3 pb-3 md:pb-0">
                            <img
                                src="images/about/service.png"
                                className="w-1/3 mx-auto animate-snake"
                            />
                        </div>
                        <div className="md:order-2 order-2 text-center my-auto items-center text-xs md:text-lg lg:text-xl font-serif w-full sm:w-2/3">
                            {t("abt.srv.txt")}
                        </div>
                    </div>
                    <div
                        className="flex flex-col mt-10 pt-8 md:mt-20 md:pt-16 animate-fade-left animate-once"
                        id="value"
                    >
                        <h3 className="text-gray-100 uppercase flex justify-content-end text-lg md:text-3xl">
                            {t("abt.crv.tit")}
                        </h3>
                        <div className="flex justify-end">
                            <hr className="my-2 border-gray-300 w-1/2" />
                        </div>
                    </div>
                    <div className="flex flex-col sm:flex-row px-3 py-10 h-1/4 text-gray-200 rounded backdrop-saturate-150 shadow-2xl backdrop-blur-md animate-fade-left animate-once">
                        <div className="md:order-2 sm:order-1 lg:order-2 text-center w-full sm:w-1/3 pb-3 md:pb-0">
                            <img
                                src="images/about/hand.png"
                                className="w-1/3 mx-auto animate-snake"
                            />
                        </div>
                        <div className="md:order-1 sm:order-2 lg:order-1 text-center my-auto items-center text-xs md:text-lg lg:text-xl font-serif w-full sm:w-2/3">
                            {t("abt.crv.txt")}
                        </div>
                    </div>
                </div>
            </div>
            <FooterLayout />
        </>
    );
};

export default About;
