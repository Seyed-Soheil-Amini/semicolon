import HeaderLayouts from "@/Layouts/Header";
import { Link, Head } from "@inertiajs/react";

export default function Welcome({ auth, laravelVersion, phpVersion }) {
    return (
        <>
            {/* Basic */}

            <div className="hero_area">
                {/* header section strats */}
                <HeaderLayouts auth={auth} />
                {/* end header section */}
                {/* slider section */}
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
                                            <div className="detail-box">
                                                <div>
                                                    <h1>
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
                                                        <a
                                                            href=""
                                                            className="btn-1"
                                                        >
                                                            Contact Us
                                                        </a>
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
                {/* end slider section */}
            </div>
            {/* about section */}
            <section className="about_section layout_padding">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6">
                            <div className="detail-box">
                                <div className="heading_container">
                                    <h2>About Us</h2>
                                </div>
                                <p>
                                    Semicolon scientific team was founded by
                                    computer students of Yazd University on June
                                    22, 1401. This organization was formed for
                                    big goals and implementation of practical
                                    ideas in the field of technology in the form
                                    of web and application. This group is
                                    currently one of the active university teams
                                    in the field of software development and is
                                    currently registering ideas, this
                                    organization is currently a start-up
                                    company.
                                </p>
                                <a href="">Get Started</a>
                            </div>
                        </div>
                        <div className="col-md-6">
                            <div className="flex img-box">
                                <img
                                    className="w-50 float-right"
                                    src="images/team_logo.png"
                                    alt=""
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            {/* end about section */}
            <div className="body_bg layout_padding">
                {/* service section */}
                <section className="service_section ">
                    <div className="container">
                        <div className="heading_container">
                            <h2>Areas of Work and Development</h2>
                        </div>
                    </div>
                    <div className="container">
                        <div className="row">
                            <div className="col-md-6">
                                <div className="box">
                                    <div className="img-box">
                                        <img
                                            className="w-25"
                                            src="images/development.png"
                                            alt=""
                                        />
                                    </div>
                                    <h4>Software Development</h4>
                                    <p>
                                        Our team is developing practical and
                                        idea-oriented software, these software
                                        are often in the form of web apps. You
                                        can submit your orders in this field to
                                        our specialists.
                                    </p>
                                    {/* <a href="">
                  Read More
               </a> */}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="box align-items-end align-items-md-start text-right text-md-left">
                                    <div className="img-box">
                                        <img
                                            className="w-25"
                                            src="images/unity.png"
                                            alt=""
                                        />
                                    </div>
                                    <h4>Game Development</h4>
                                    <p>
                                        We produce 2D and 3D indie games using
                                        the Unity engine. We are currently
                                        developing mobile games on the Android
                                        platform and are preparing the
                                        infrastructure for system production.
                                    </p>
                                    {/* <a href="">
                  Read More
               </a> */}
                                </div>
                            </div>
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <div className="box">
                                    <div className="img-box">
                                        <img
                                            className="w-25"
                                            src="images/server.png"
                                            alt=""
                                        />
                                    </div>
                                    <h4>Server Management</h4>
                                    <p>
                                        Our team has the experience of working
                                        with Linux as one of the main operating
                                        systems used for the server, as well as
                                        working with web servers such as nginx
                                        to manage the server load, which allows
                                        it to be fully loaded after the website
                                        or application is designed. It is run
                                        and managed on the server.
                                    </p>
                                    {/* <a href="">
                  Read More
               </a> */}
                                </div>
                            </div>
                            <div className="col-md-6">
                                <div className="box align-items-end align-items-md-start text-right text-md-left">
                                    <div className="img-box">
                                        <img
                                            className="w-25"
                                            src="images/ai.png"
                                            alt=""
                                        />
                                    </div>
                                    <h4>Artificial Intelligence</h4>
                                    <p>
                                        Our artificial intelligence expert team
                                        has the ability to carry out artificial
                                        intelligence projects, especially
                                        machine learning, with research and
                                        study in the fields of machine learning
                                        and data analysis. You can cooperate
                                        with us in the field of writing articles
                                        and research.
                                    </p>
                                    {/* <a href="">
                  Read More
               </a> */}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
                {/* end service section */}
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
                {/* contact section */}
                {/* <section class="contact_section">
   <div class="container">
      <div class="heading_container">
         <h2>
            Let's Get In Touch!
         </h2>
      </div>
   </div>
   <div class="container contact_bg layout_padding2-top">
      <div class="row">
         <div class="col-md-6">
            <div class="contact_form ">
               <form action="">
                  <input type="text" placeholder="Name ">
                  <input type="email" placeholder="Email">
                  <input type="text" placeholder="Message" class="message_input">
                  <button>
                     Send
                  </button>
               </form>
            </div>
         </div>
         <div class="col-md-6">
            <div class="img-box">
               <img src="{{ asset('images/contact-img.jpg') }}" alt="">
            </div>
         </div>
      </div>
   </div>
</section> */}
                {/* end contact section */}
                {/* client section */}
                {/* 
<section class="client_section layout_padding-top">
   <div class="d-flex justify-content-center">
      <div class="heading_container">
         <h2>
            Testimonial
         </h2>
      </div>
   </div>
   <div class="container layout_padding2">
      <div id="carouselExample2Indicators" class="carousel slide" data-ride="carousel">
         <ol class="carousel-indicators">
            <li data-target="#carouselExample2Indicators" data-slide-to="0" class="active"></li>
            <li data-target="#carouselExample2Indicators" data-slide-to="1"></li>
            <li data-target="#carouselExample2Indicators" data-slide-to="2"></li>
         </ol>
         <div class="carousel-inner">
            <div class="carousel-item ">
               <div class="client_container">
                  <div class="client-id">
                     <div class="img-box">
                        <img src="{{ asset('images/client.jpg') }}" alt="">
                     </div>
                     <div class="client_name">
                        <div>
                           <h3>
                              Johndue
                           </h3>
                           <p>
                              Farm & CO
                           </p>
                        </div>
                     </div>
                  </div>
                  <div class="client_detail">
                     <div class="client_text">
                        <blockquote>
                           <p>
                              ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                              aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
                           </p>
                        </blockquote>
                     </div>
                  </div>
               </div>
            </div>
            <div class="carousel-item active">
               <div class="client_container">
                  <div class="client-id">
                     <div class="img-box">
                        <img src="{{ asset('images/client.jpg') }}" alt="">
                     </div>
                     <div class="client_name">
                        <div>
                           <h3>
                              Johndue
                           </h3>
                           <p>
                              Farm & CO
                           </p>
                        </div>
                     </div>
                  </div>
                  <div class="client_detail">
                     <div class="client_text">
                        <blockquote>
                           <p>
                              ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                              aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
                           </p>
                        </blockquote>
                     </div>
                  </div>
               </div>
            </div>
            <div class="carousel-item ">
               <div class="client_container">
                  <div class="client-id">
                     <div class="img-box">
                        <img src="{{ asset('images/client.jpg') }}" alt="">
                     </div>
                     <div class="client_name">
                        <div>
                           <h3>
                              Johndue
                           </h3>
                           <p>
                              Farm & CO
                           </p>
                        </div>
                     </div>
                  </div>
                  <div class="client_detail">
                     <div class="client_text">
                        <blockquote>
                           <p>
                              ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
                              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                              aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit
                           </p>
                        </blockquote>
                     </div>
                  </div>
               </div>
            </div>
         </div>
      </div>

   </div>
</section> */}
                {/* end client section */}
            </div>
            {/* info section */}
            <section className="info_section layout_padding">
                <div className="footer_contact">
                    <div className="heading_container">
                        <h2>Contact Us</h2>
                    </div>
                    <div className="box">
                        <a href="" className="img-box">
                            <img
                                src="images/location.png"
                                alt=""
                                className="img-1"
                            />
                            <img
                                src="images/location-o.png"
                                alt=""
                                className="img-2"
                            />
                        </a>
                        <a href="" className="img-box">
                            <img
                                src="images/call.png"
                                alt=""
                                className="img-1"
                            />
                            <img
                                src="images/call-o.png"
                                alt=""
                                className="img-2"
                            />
                        </a>
                        <a href="" className="img-box">
                            <img
                                src="images/envelope.png"
                                alt=""
                                className="img-1"
                            />
                            <img
                                src="images/envelope-o.png"
                                alt=""
                                className="img-2"
                            />
                        </a>
                    </div>
                </div>
            </section>
            {/* end info section */}
            {/* footer section */}
            <section className="container-fluid footer_section">
                <p>Copyright © 2019 All Rights Reserved By Semicolon.</p>
            </section>
            {/* footer section */}
        </>
    );
}
