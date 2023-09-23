import React from "react";

import { Link, Head, usePage } from "@inertiajs/react";

const HeaderLayouts = ({ auth }) => {
    const { url, component } = usePage();

    return (
        <>
            <Head>
                {/* Site Metas */}
                <meta name="keywords" content="" />
                <meta name="description" content="" />
                <meta name="author" content="" />

                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                {/* Mobile Metas */}
                <meta
                    name="viewport"
                    content="width=device-width, initial-scale=1.0, shrink-to-fit=no"
                />
                <link
                    rel="stylesheet"
                    type="text/css"
                    href="css/bootstrap.css"
                />
                <link href="css/style.css" rel="stylesheet" />
                <link href="css/responsive.css" rel="stylesheet" />

                {/* slider stylesheet */}
                <link
                    rel="stylesheet"
                    type="text/css"
                    href="https://cdnjs.cloudflare.com/ajax/libs/OwlCarousel2/2.1.3/assets/owl.carousel.min.css"
                />
                <link
                    rel="icon"
                    type="image/jpg"
                    href="/images/semicolon.jpg"
                />

                {/* font wesome stylesheet */}
                <link
                    rel="stylesheet"
                    href="https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css"
                />

                <title>Semicolon</title>
            </Head>
            <header className="bg-gray-950 d-flex justify-content-between header_section fixed-top w-100 h-14">
                <div className="container pt-0">
                    <nav className="navbar navbar-expand-lg custom_nav-container pt-0">
                        <div className="w-25">
                            <a className="navbar-brand mr-5" href="index.html">
                                <img src="images/Layer_2.svg" alt="" />
                                <span>Semicolon</span>
                            </a>
                            <button
                                className="navbar-toggler"
                                type="button"
                                data-toggle="collapse"
                                data-target="#navbarSupportedContent"
                                aria-controls="navbarSupportedContent"
                                aria-expanded="false"
                                aria-label="Toggle navigation"
                            >
                                <span className="navbar-toggler-icon" />
                            </button>
                        </div>
                        <div className="w-50 mx-auto nav nav-item d-flex flex-column flex-lg-row align-items-center">
                            <ul className="navbar-nav">
                                <li className="nav-item active">
                                    <Link
                                        className={`nav-link ${
                                            url === "/" && "active"
                                        }`}
                                        href="/"
                                        activeClassName="active"
                                    >
                                        Home{" "}
                                        <span className="sr-only">
                                            (current)
                                        </span>
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className={`nav-link ${
                                            url === "/about" && "active"
                                        }`}
                                        href="/about"
                                        activeClassName="active"
                                    >
                                        About
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className={`nav-link ${
                                            url === "/blog" && "active"
                                        }`}
                                        href="/"
                                        activeClassName="active"
                                    >
                                        Blog
                                    </Link>
                                </li>
                                <li className="nav-item">
                                    <Link
                                        className={`nav-link ${
                                            url === "/contactus" && "active"
                                        }`}
                                        href="/"
                                        activeClassName="active"
                                    >
                                        Contact us
                                    </Link>
                                </li>
                            </ul>
                            <form className="form-inline">
                                <button
                                    className="btn  my-2 my-sm-0 nav_search-btn"
                                    type="submit"
                                />
                            </form>
                        </div>
                        <div className="w-25 sm:right-0 p-3 text-right">
                            {auth.user ? (
                                <Link
                                    href={route("dashboard")}
                                    className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                >
                                    Dashboard
                                </Link>
                            ) : (
                                <>
                                    <Link
                                        href={route("register")}
                                        className="mr-4 font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                    >
                                        Register
                                    </Link>
                                    <Link
                                        href={route("login")}
                                        className="font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white focus:outline focus:outline-2 focus:rounded-sm focus:outline-red-500"
                                    >
                                        login
                                    </Link>
                                </>
                            )}
                        </div>
                    </nav>
                </div>
            </header>
        </>
    );
};

export default HeaderLayouts;