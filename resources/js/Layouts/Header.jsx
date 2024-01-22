import React, { useState } from "react";

import { Link, Head, usePage } from "@inertiajs/react";
import { FaUserCircle, FaLanguage } from "react-icons/fa";
import { Navbar, Nav, Container } from "react-bootstrap";
import { isEmpty } from "lodash";
import i18n from "i18next";
import { useTranslation } from "react-i18next";

const HeaderLayouts = ({ auth }) => {
    const { url, component } = usePage();
    const [changeLangIsOpen, setChangeLangIsOpen] = useState(false);
    const { t } = useTranslation();
    const toggleDropdown = () => {
        setChangeLangIsOpen(!changeLangIsOpen);
    };

    const changeLanguage = (lang) => {
        if (lang === "En") {
            document.documentElement.dir = "ltr";
            i18n.changeLanguage("en");
        } else {
            i18n.changeLanguage("fa");
            document.documentElement.dir = "rtl";
        }
    };
    return (
        <>
            <Head>
                {/* Site Metas */}
                <meta name="keywords" content="" />
                <meta name="description" content="" />
                <meta name="author" content="Seyed Soheil Amini" />
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
            <Navbar
                variant="dark"
                expand="lg"
                fixed="top"
                style={{ background: "#030712" }}
            >
                <Container>
                    <Navbar.Brand href="/" style={{ width: "20%" }}>
                        <img
                            alt=""
                            src="images/Layer_2.svg"
                            className="d-inline-block align-top rounded-circle"
                            style={{ width: "20%" }}
                        />{" "}
                        Semicolon
                    </Navbar.Brand>
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="me-auto">
                            <Link
                                className={`nav-link px-3 ${
                                    url === "/" && "active"
                                }`}
                                href="/"
                            >
                                {t("header.home")}{" "}
                                <span className="sr-only">(current)</span>
                            </Link>
                            <Link
                                className={`nav-link px-3 ${
                                    url === "/about" && "active"
                                }`}
                                href="/about"
                            >
                                {t("header.abt")}
                            </Link>
                            <Link
                                className={`nav-link px-3 ${
                                    url === "/blog" && "active"
                                }`}
                                href="/blog"
                            >
                                {t("header.blg")}
                            </Link>
                            <Link
                                className={`nav-link px-3 ${
                                    url === "/contactus" && "active"
                                }`}
                                href="/contactus"
                            >
                                {t("header.cnt")}
                            </Link>
                        </Nav>
                        <Nav>
                            {auth.user ? (
                                <Link
                                    href={route("dashboard")}
                                    className="flex justify-content-end font-semibold text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                                >
                                    {isEmpty(auth.user.image) ? (
                                        <FaUserCircle
                                            className={`mr-2 text-3xl ${
                                                auth.user.isAdmin == 1 &&
                                                "text-amber-500"
                                            }`}
                                        />
                                    ) : (
                                        <img
                                            src={`${location.origin}/storage/${auth.user.image}`}
                                            className="rounded-full h-10 w-10 mr-2 "
                                        />
                                    )}
                                </Link>
                            ) : (
                                <div className="ml-1 mb-1 md:ml-0 md:mb-0">
                                    <Link
                                        href={route("register")}
                                        className="lg:py-2 lg:px-2 rounded-full mr-3 font-semibold text-gray-400 hover:text-white lg:bg-white lg:text-gray-950 lg:hover:bg-gray-950"
                                    >
                                        {t("header.reg")}
                                    </Link>
                                    <Link
                                        href={route("login")}
                                        className="lg:py-2 mr-1 font-semibold text-gray-400 hover:text-white "
                                    >
                                        {t("header.log")}
                                    </Link>
                                </div>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                    <div className="relative inline-block text-left">
                        <div>
                            <button
                                type="button"
                                className="inline-flex justify-center ring-1 ring-gray-300 rounded-md ml-1 px-2 py-2 text-sm font-mono text-gray-400 border-gray-200 hover:text-gray-900 hover:bg-gray-400"
                                id="menu-button"
                                aria-expanded="true"
                                aria-haspopup="true"
                                onClick={toggleDropdown}
                            >
                                <FaLanguage className="text-2xl" />
                            </button>
                        </div>
                        {changeLangIsOpen && (
                            <div
                                className="absolute right-0 z-10 mt-2 origin-top-right rounded-md bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="menu-button"
                                tabIndex={-1}
                            >
                                <div className="py-1" role="none">
                                    <a
                                        href="#"
                                        className="flex items-center justify-center text-gray-200 block m-1 px-3 py-2 text-sm hover:bg-gray-400 rounded-md"
                                        role="menuitem"
                                        tabIndex={-1}
                                        id="menu-item-0"
                                        onClick={() => changeLanguage("En")}
                                    >
                                        <img
                                            src="images/united-kingdom-flag.png"
                                            className="rounded-circle mr-1"
                                        />
                                        En
                                    </a>
                                    <a
                                        href="#"
                                        className="flex items-center justify-center text-gray-200 block m-1 px-3 py-2 text-sm hover:bg-gray-400 rounded-md"
                                        role="menuitem"
                                        tabIndex={-1}
                                        id="menu-item-1"
                                        onClick={() => changeLanguage("fa")}
                                    >
                                        <img
                                            src="images/iran-flag.png"
                                            className="rounded-circle mr-1"
                                        />
                                        Fa
                                    </a>
                                </div>
                            </div>
                        )}
                    </div>
                </Container>
            </Navbar>{" "}
        </>
    );
};

export default HeaderLayouts;
