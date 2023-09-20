export default function ApplicationLogo(props) {
    const imgStyle = {
        borderRadius: "50%",
    };
    return (
        <>
            <img
                style={imgStyle}
                className="border-logo w-40 h-32 mx-auto my-auto border-emerald-500"
                src="/images/semicolon.jpg"
                alt=""
            />
        </>
    );
}
