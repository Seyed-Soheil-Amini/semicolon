import { FaBlog, FaEdit, FaPaperPlane, FaBan } from "react-icons/fa";

const BlogMenuItem = (props) => {
    let icon, componentDetector, itemStyle, buttonStyle, iconStyle;
    if (props.activeItem) {
        itemStyle = "relative flex pl-3 py-2 bg-gray-300 hover:bg-gray-200 rounded-full text-xs md:text-sm items-center mx-auto";
        buttonStyle = "pr-3 pl-4 md:pl-10 block text-gray-700 font-semibold";
        iconStyle = "w-3 h-3 md:w-4 md:h-4 lg:h-5 lg:h-5 absolute text-gray-700 ml-0.5 mr-2 md:ml-3 md:mr-0 pointer-events-none";
    } else {
        itemStyle = "relative flex pl-3 py-2 bg-gray-700 hover:bg-gray-600 rounded-full text-xs md:text-sm items-center mx-auto";
        buttonStyle = "pr-3 pl-4 md:pl-10 block text-gray-100 font-semibold";
        iconStyle = "w-3 h-3 md:w-4 md:h-4 lg:h-5 lg:h-5 absolute text-gray-100 ml-0.5 mr-2 md:ml-3 md:mr-0 pointer-events-none";
    }
    switch (props.icon) {
        case "add":
            icon = <FaBlog className={iconStyle} aria-hidden="true" />;
            componentDetector = "create";
            break;
        case "edit":
            icon = <FaEdit className={iconStyle} aria-hidden="true" />;
            componentDetector = "edit";
            break;
        case "pub":
            icon = <FaPaperPlane className={iconStyle} aria-hidden="true" />;
            componentDetector = "published";
            break;
        default:
            icon = <FaBan className={iconStyle} aria-hidden="true" />;
            componentDetector = "blocked";
            break;
    }
    return (
        <li
            className={itemStyle}
            onClick={() => props.onClickItem(componentDetector)}
        >
            {icon}
            <button className={buttonStyle}>{props.itemName}</button>
        </li>
    );
};

export default BlogMenuItem;
