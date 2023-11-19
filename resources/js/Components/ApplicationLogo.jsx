export default function ApplicationLogo(props) {
    const imgStyle = {
        borderRadius: "50%",
    };
    return (
        <>
            <img
                style={imgStyle}
                className="border-logo w-24 h-20 md:w-40 md:h-32 mx-auto my-auto border-emerald-500"
                src="/images/semicolon.jpg"
                alt=""
            />
        </>
    );
}
