import React from "react";

import { Link, Head, usePage } from "@inertiajs/react";
import { FaUserCircle } from "react-icons/fa";
import { Navbar, Nav, Container } from "react-bootstrap";
import { isEmpty } from "lodash";

const HeaderLayouts = ({ auth }) => {
    const { url, component } = usePage();

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
                                HOME <span className="sr-only">(current)</span>
                            </Link>
                            <Link
                                className={`nav-link px-3 ${
                                    url === "/about" && "active"
                                }`}
                                href="/about"
                            >
                                ABOUT
                            </Link>
                            <Link
                                className={`nav-link px-3 ${
                                    url === "/blog" && "active"
                                }`}
                                href="/blog"
                            >
                                BLOG
                            </Link>
                            <Link
                                className={`nav-link px-3 ${
                                    url === "/contactus" && "active"
                                }`}
                                href="/contactus"
                            >
                                CONTACT US
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
                                <>
                                    <Link
                                        href={route("register")}
                                        className="lg:py-2 lg:px-2 rounded-full mr-3 font-semibold text-gray-400 hover:text-white lg:bg-white lg:text-gray-950 lg:hover:bg-gray-950"
                                    >
                                        Register
                                    </Link>
                                    <Link
                                        href={route("login")}
                                        className="lg:py-2 mr-1 font-semibold text-gray-400 hover:text-white "
                                    >
                                        login
                                    </Link>
                                </>
                            )}
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>{" "}
        </>
    );
};

export default HeaderLayouts;
