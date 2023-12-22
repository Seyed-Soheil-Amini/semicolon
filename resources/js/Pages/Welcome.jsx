import HeaderLayouts from "@/Layouts/Header";
import FooterLayout from "@/Layouts/Footer";
import { Link } from "@inertiajs/react";
import { useTranslation } from "react-i18next";

const Welcome = ({ auth, laravelVersion, phpVersion }) => {
    const { t } = useTranslation();
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
                                                <div className="animate-fade-down animate-once">
                                                    <h1 className="text-base md:text-3xl lg:text-5xl">
                                                        {t("welcome-txt-tit")}{" "}
                                                        <br />
                                                        <span>
                                                            {t(
                                                                `welcome-txt-subtit`
                                                            )}
                                                        </span>
                                                    </h1>
                                                    <p>
                                                        {t(`home-tit-subtxt`)}
                                                    </p>
                                                    <div className="btn-box">
                                                        <Link
                                                            href="/contactus"
                                                            className="text-xs md:text-base lg:text-xl"
                                                        >
                                                            {t(`home-ctn-tit`)}
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
                                <div className="heading_container animate-fade-down animate-once">
                                    <h2 className="text-base md:text-xl lg:text-3xl">
                                        {t(`home-abt-tit`)}
                                    </h2>
                                </div>
                                <p className="text-sm md:text-base animate-fade-down animate-once animate-duration-[1200ms]">
                                    {t("home-abt-txt")}
                                </p>
                                <Link
                                    href="/about"
                                    className="text-sm md:text-base animate-fade-down animate-once animate-duration-[1200ms]"
                                >
                                    {t("home-read-more")}
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
                        <div className="heading_container animate-fade-down animate-once">
                            <h2 className="text-2xl lg:text-3xl">
                                {t("home-srv-tit")}
                            </h2>
                        </div>
                    </div>
                    <div className="container">
                        <div className="flex flex-wrap">
                            <div className="w-full md:w-1/2 p-4">
                                <div className="box animate-fade-down animate-once animate-duration-[1200ms]">
                                    <div className="img-box">
                                        <img
                                            className="w-1/4 md:w-1/2"
                                            src="images/development.png"
                                            alt="image developer"
                                        />
                                    </div>
                                    <h4 className="text-lg md:text-2xl">
                                        {t("home-srv-s1-tit")}
                                    </h4>
                                    <p className="text-sm md:text-base">
                                        {t("homw-srv-s1-txt")}
                                    </p>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 p-4">
                                <div className="box animate-fade-down animate-once animate-duration-[1200ms] text-right md:text-left">
                                    <div className="img-box">
                                        <img
                                            className="w-1/4 md:w-1/2"
                                            src="images/unity.png"
                                            alt="image game engine"
                                        />
                                    </div>
                                    <h4 className="text-lg md:text-2xl">
                                        {t("home-srv-s2-tit")}
                                    </h4>
                                    <p className="text-sm md:text-base">
                                        {t("home-srv-s2-txt")}
                                    </p>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 p-4">
                                <div className="box animate-fade-down animate-once animate-duration-[1200ms]">
                                    <div className="img-box">
                                        <img
                                            className="w-1/4 md:w-1/2"
                                            src="images/server.png"
                                            alt=""
                                        />
                                    </div>
                                    <h4 className="text-lg md:text-2xl">
                                        {t("home-srv-s3-tit")}
                                    </h4>
                                    <p className="text-sm md:text-base">
                                        {t("home-srv-s3-txt")}
                                    </p>
                                </div>
                            </div>
                            <div className="w-full md:w-1/2 p-4">
                                <div className="box animate-fade-down animate-once animate-duration-[1200ms] text-right md:text-left">
                                    <div className="img-box">
                                        <img
                                            className="w-1/4 md:w-1/2"
                                            src="images/ai.png"
                                            alt=""
                                        />
                                    </div>
                                    <h4 className="text-lg md:text-2xl">
                                        {t("home-srv-s4-tit")}
                                    </h4>
                                    <p className="text-sm md:text-base">
                                        {t("home-srv-s4-txt")}
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
                <div className="footer_contact animate-flip-up animate-once">
                    <div className="heading_container">
                        <h2 className="text-base md:text-2xl lg:text-3xl">
                            {t("home-ctn-tit")}
                        </h2>
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
};

export default Welcome;
