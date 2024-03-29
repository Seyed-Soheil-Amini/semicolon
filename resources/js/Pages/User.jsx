import { Head } from "@inertiajs/react";
import { isEmpty } from "lodash";
import React from "react";
import { useTranslation } from "react-i18next";

const User = ({ user, favoriteCategory }) => {
    const { t } = useTranslation();
    return (
        <>
            <Head>
                <meta name="keywords" content={user.job_title} />
                <meta name="description" content={user.about} />
                <meta name="author" content={user.name} />
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, shrink-to-fit=no"
                />
                <link
                    rel="icon"
                    type="image/jpg"
                    href="/images/semicolon.jpg"
                />
                <link
                    rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
                />
                <title>{user.name}</title>
            </Head>
            <div className="max-w-6xl flex flex-col lg:flex-row items-center h-auto lg:h-screen flex-wrap mx-auto my-32 lg:my-0">
                <div
                    id="profile"
                    className="flex flex-col md:flex-row justify-between w-full lg:w-6.5/7 rounded-lg shadow-2xl bg-zinc-300 mx-auto h-auto lg:h-4/7"
                >
                    <div className="bg-gray-300 w-6/7 md:w-4/5 lg:w-2/5 rounded-lg p-2.5 md:p-5 my-1 md:my-2 mx-auto md:ml-1">
                        <img
                            src={`${
                                isEmpty(user.image) || user.image == "null"
                                    ? "/images/altUserImage.jpg"
                                    : `${location.origin}/storage/${user.image}`
                            }`}
                            className="rounded-lg shadow-2xl h-full w-full"
                        />
                    </div>
                    <div className="p-4 md:p-12 w-full lg:w-3/5 text-center lg:text-left">
                        <h1 className="text-2xl md:text-3xl font-sans pt-4 md:pt-0 text-zinc-700">
                            <b>{user.name}</b>
                        </h1>
                        <div className="mx-auto lg:mx-0 w-4/5 pt-3 border-b-2 border-orange-500 opacity-25" />
                        <p className="pt-2 text-lg text-zinc-500 md:text-2xl font-bold flex items-center justify-center lg:justify-start">
                            <svg
                                className="h-6 md:h-8 fill-current text-orange-500 pr-4"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 20 20"
                            >
                                <path d="M9 12H1v6a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-6h-8v2H9v-2zm0-1H0V5c0-1.1.9-2 2-2h4V2a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v1h4a2 2 0 0 1 2 2v6h-9V9H9v2zm3-8V2H8v1h4z" />
                            </svg>{" "}
                            {isEmpty(user.job_title) || user.job_title == "null"
                                ? t("user-page.blg")
                                : user.job_title}
                        </p>
                        <div className="mt-4">
                            <h2 className="text-sm md:text-md text-gray-800">
                                {t("user-page.fav")}
                            </h2>
                            <div className="mx-auto lg:mx-0 pt-1 w-4/5 border-b-2 border-orange-500 opacity-25" />
                            <p className="pt-1 text-xl font-medium text-zinc-500">
                                {isEmpty(favoriteCategory)
                                    ? t("user-page.acat")
                                    : favoriteCategory.name}
                            </p>
                        </div>
                        <div className="mt-4">
                            <h2 className="text-sm md:text-md text-gray-800">
                                {t("user-page.bio")}
                            </h2>
                            <div className="mx-auto lg:mx-0 pt-1 w-4/5 border-b-2 border-orange-500 opacity-25" />
                            <p className="pt-2 text-sm font-serif text-zinc-500">
                                {isEmpty(user.about) || user.about == "null"
                                    ? t("user-page.auth")
                                    : user.about}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default User;
