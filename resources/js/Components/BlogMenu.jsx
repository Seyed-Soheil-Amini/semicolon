import BlogMenuItem from "./BlogMenuItem";
import { useTranslation } from "react-i18next";

const BlogSideBar = (props) => {
    const { t } = useTranslation();
    return (
        <div className="flex flex-col md:flex-row h-full md:h-full">
            <div className="bg-gray-800 text-gray-100 flex-shrink-0 w-full h-full">
                <div className="flex items-center h-10 border-b border-gray-700">
                    <svg
                        className="ml-2 w-3 h-3 md:w-5 md:h-5 cursor-pointer"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 14"
                        onClick={() => props.closeSideBar()}
                    >
                        <path
                            stroke="currentColor"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                        />
                    </svg>{" "}
                    <span className="flex mx-auto text-sm md:text-lg font-bold uppercase">
                        blogs
                    </span>
                </div>
                <ul className="py-2 px-1 md:py-4 md:px-2 space-y-6">
                    <BlogMenuItem
                        onClickItem={props.onChangeComponent}
                        itemName={t("dash.blg.item1")}
                        icon="add"
                        activeItem={props.currentCmp === "create"}
                    />
                    <BlogMenuItem
                        onClickItem={props.onChangeComponent}
                        itemName={t("dash.blg.item2")}
                        icon="edit"
                        activeItem={props.currentCmp === "edit"}
                    />
                    <BlogMenuItem
                        onClickItem={props.onChangeComponent}
                        itemName={t("dash.blg.item3")}
                        icon="pub"
                        activeItem={props.currentCmp === "published"}
                    />
                    <BlogMenuItem
                        onClickItem={props.onChangeComponent}
                        itemName={t("dash.blg.item4")}
                        icon="ban"
                        activeItem={props.currentCmp === "blocked"}
                    />
                </ul>
            </div>
            <div className="flex-1 overflow-y-auto">
                {/* Content of the page */}
            </div>
        </div>
    );
};

export default BlogSideBar;
