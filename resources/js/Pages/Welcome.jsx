import HeaderLayouts from "@/Layouts/Header";
import FooterLayout from "@/Layouts/Footer";
import { Link, Head } from "@inertiajs/react";
import { Carousel, Container, Button } from "react-bootstrap";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            <HeaderLayouts auth={auth} />
            <div className="hero_area">
                <section className="slider_section position-relative">
                    <div
                        id="carouselExampleIndicators"
                        className="carousel slide"
                        data-ride="carousel"
                    >
                        <div className="carousel-inner">
                            <div className="carousel-item active">
                                <div className="container">
                                    <div className="row">
                                        <div className="col-md-7">
                                            <div className="detail-box mt-5 md:mt-3 lg:mt-0">
                                                <div>
                                                    <h1 className="text-base md:text-3xl lg:text-5xl">
                                                        Welcome To <br />
                                                        <span>
                                                            Semicolon official
                                                            blog
                                                        </span>
                                                    </h1>
                                                    <p>
                                                        This is the official
                                                        website of Semicolon
                                                        scientific team and it
                                                        is at your service.
                                                    </p>
                                                    <div className="btn-box">
                                                        <Link
                                                            href="/contactus"
                                                            className="text-xs md:text-base lg:text-xl"
                                                        >
                                                            Contact Us
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
            <section className="about_section layout_padding">
                <div className="container">
                    <div className="flex flex-col md:flex-row">
                        <div className="md:w-1/2 md:pr-8">
                            <div className="detail-box">
                                <div className="heading_container">
                                    <h2 className="text-base md:text-xl lg:text-3xl">
                                        About Us
                                    </h2>
                                </div>
                                <p className="text-sm md:text-base">
                                    Semicolon scientific team was founded by
                                    computer students of Yazd University on June
                                    22, 2022. This organization was formed for
                                    big goals and implementation of practical
                                    ideas in the field of technology in the form
                                    of web and application. This group is
                                    currently one of the active university teams
                                    in the field of software development and is
                                    currently registering ideas, this
                                    organization is currently a start-up
                                    company.
                                </p>
                                <Link
                                    href="/about"
                                    className="text-sm md:text-base"
                                >
                                    Read More
                                </Link>
                            </div>
                        </div>
                        <div className="md:w-1/2">
                            <div className="flex justify-center items-center">
                                <img
                                    className="pt-3 w-1/3 md:w-full"
                                    src="images/team_logo.png"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <div className="body_bg layout_padding">
                <section className="service_section">
                    <div className="container">
                        <div className="heading_container">
                            <h2 className="text-2xl lg:text-3xl">
                                Areas of Work and Development
                            </h2>
                        </div>
                    </div>
                    <div className="container">
                        <div className="flex flex-wrap">
                            <div className="w-full md:w-1/2 p-4">
                                <div className="box">
                                    <div className="img-box">
                                        <img
                                            className="w-1/4 md:w-1/2"
                                            src="images/development.png"
                                            alt="image developer"
                                        />
                                    </div>
                                    <h4 className="text-lg md:text-2xl">
                                        Software Development
                                    </h4>
                                    <p className="text-sm md:text-base">
                                        Our team is developing practical and
                                        idea-oriented software, these software
                                        are often in the form of web apps. You
                                        can submit your orders in this field to
                                        our specialists.
                                    </p>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 p-4">
                                <div className="box text-right md:text-left">
                                    <div className="img-box">
                                        <img
                                            className="w-1/4 md:w-1/2"
                                            src="images/unity.png"
                                            alt="image game engine"
                                        />
                                    </div>
                                    <h4 className="text-lg md:text-2xl">
                                        Game Development
                                    </h4>
                                    <p className="text-sm md:text-base">
                                        We produce 2D and 3D indie games using
                                        the Unity engine. We are currently
                                        developing mobile games on the Android
                                        platform and are preparing the
                                        infrastructure for system production.
                                    </p>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 p-4">
                                <div className="box">
                                    <div className="img-box">
                                        <img
                                            className="w-1/4 md:w-1/2"
                                            src="images/server.png"
                                            alt=""
                                        />
                                    </div>
                                    <h4 className="text-lg md:text-2xl">
                                        Server Management
                                    </h4>
                                    <p className="text-sm md:text-base">
                                        Our team has the experience of working
                                        with Linux as one of the main operating
                                        systems used for the server, as well as
                                        working with web servers such as nginx
                                        to manage the server load, which allows
                                        it to be fully loaded after the website
                                        or application is designed. It is run
                                        and managed on the server.
                                    </p>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 p-4">
                                <div className="box text-right md:text-left">
                                    <div className="img-box">
                                        <img
                                            className="w-1/4 md:w-1/2"
                                            src="images/ai.png"
                                            alt=""
                                        />
                                    </div>
                                    <h4 className="text-lg md:text-2xl">
                                        Artificial Intelligence
                                    </h4>
                                    <p className="text-sm md:text-base">
                                        Our artificial intelligence expert team
                                        has the ability to carry out artificial
                                        intelligence projects, especially
                                        machine learning, with research and
                                        study in the fields of machine learning
                                        and data analysis. You can cooperate
                                        with us in the field of writing articles
                                        and research.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                <hr
                    className="mx-auto my-4"
                    style={{
                        width: "90%",
                        height: "1mm",
                        border: "1px solid black",
                        borderRadius: "3.5mm",
                        color: "darkred",
                    }}
                />
            </div>{" "}
            <section className="info_section layout_padding">
                <div className="footer_contact">
                    <div className="heading_container">
                        <h2 className="text-base md:text-2xl lg:text-3xl">Contact Us</h2>
                    </div>
                    <div className="box">
                        <Link href="/contactus" className="img-box">
                            <img
                                src="images/location.png"
                                alt="location"
                                className="img-1"
                            />
                            <img
                                src="images/location-o.png"
                                alt=""
                                className="img-2"
                            />
                        </Link>
                        <Link href="contactus" className="img-box">
                            <img
                                src="images/call.png"
                                alt=""
                                className="img-1"
                            />
                            <img
                                src="images/call-o.png"
                                alt="call"
                                className="img-2"
                            />
                        </Link>
                        <Link href="contactus" className="img-box">
                            <img
                                src="images/envelope.png"
                                alt="envelope"
                                className="img-1"
                            />
                            <img
                                src="images/envelope-o.png"
                                alt=""
                                className="img-2"
                            />
                        </Link>
                    </div>
                </div>
            </section>
            {/* end info section */}
            {/* footer section */}
            <FooterLayout />
            {/* footer section */}
        </>
    );
}
