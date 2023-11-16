import { FaBlog, FaEdit, FaPaperPlane, FaBan } from "react-icons/fa";

const BlogMenuItem = (props) => {
    let icon, componentDetector, itemStyle, buttonStyle, iconStyle;
    if (props.activeItem) {
        itemStyle = "relative flex pl-6 py-2 bg-gray-300 hover:bg-gray-200";
        buttonStyle = "pr-3 pl-10 block text-gray-700 font-semibold";
        iconStyle = "w-5 h-5 absolute text-gray-700 ml-3 pointer-events-none";
    } else {
        itemStyle = "relative flex pl-6 py-2 bg-gray-700 hover:bg-gray-600";
        buttonStyle = "pr-3 pl-10 block text-gray-100 font-semibold";
        iconStyle = "w-5 h-5 absolute text-gray-100 ml-3 pointer-events-none";
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
