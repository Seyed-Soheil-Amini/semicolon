import React from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { FaCoins, FaTools, FaUserGraduate } from "react-icons/fa";
import { useTranslation } from "react-i18next";

const Services = ({ auth }) => {
    const { t } = useTranslation();
    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Verification" />
            <div className="overflow-hidden py-8 sm:py-10">
                <div className="mx-auto max-w-7xl px-6 lg:px-8">
                    <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                        <div className="lg:pr-8 lg:pt-4">
                            <div className="lg:max-w-lg">
                                <p className="mt-2 text-3xl font-bold text-gray-300 sm:text-4xl">
                                    {t("dash.srv.tit")}
                                </p>
                                <p className="mt-6 text-lg leading-8 text-gray-400">
                                    {t("dash.srv.sub-tit")}
                                </p>
                                <dl className="mt-10 max-w-xl space-y-8 text-base leading-7 text-gray-600 lg:max-w-none">
                                    <div className="relative pl-9">
                                        <dt className="inline font-semibold text-gray-300">
                                            <FaUserGraduate className="absolute left-1 top-1 h-5 w-5 text-indigo-600" />
                                            {t("dash.srv.tit2")}
                                        </dt>
                                        <dd className="inline-block text-gray-400">
                                            {t("dash.srv.sub-tit2")}
                                        </dd>
                                    </div>
                                    <div className="relative pl-9">
                                        <dt className="inline font-semibold text-gray-300">
                                            <FaTools className="absolute left-1 top-1 h-5 w-5 text-indigo-600" />
                                            {t("dash.srv.tit3")}
                                        </dt>
                                        <dd className="inline-block text-gray-400">
                                            {t("dash.srv.sub-tit3")}
                                        </dd>
                                    </div>
                                    <div className="relative pl-9">
                                        <dt className="inline font-semibold text-gray-300">
                                            <FaCoins className="absolute left-1 top-1 h-5 w-5 text-indigo-600" />
                                            {t("dash.srv.tit4")}
                                        </dt>
                                        <dd className="inline-block text-gray-400">
                                            {t("dash.srv.sub-tit4")}{" "}
                                        </dd>
                                    </div>
                                </dl>
                            </div>
                        </div>
                        <img
                            src="/images/services-soon.png"
                            className="animate-snake"
                        />
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default Services;
