import React from "react";
import { useTranslation } from "react-i18next";

const FooterLayout = () => {
    const { t } = useTranslation();
    return (
        <section className="container-fluid footer_section text-sm md:text-lg">
            <p>{t("footer")}</p>
        </section>
    );
};

export default FooterLayout;
