import HeaderLayouts from "@/Layouts/Header";
import React from "react";

const About = ({ auth }) => {
    return (
        <div className="hero_area">
            <HeaderLayouts auth={auth} />
            <h1>About Us </h1>
        </div>
    );
};

export default About;
