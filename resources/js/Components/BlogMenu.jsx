import react from "react";
import BlogMenuItem from "./BlogMenuItem";

const BlogSideBar = (props) => {
    return (
        <div className="flex flex-col md:flex-row h-full">
            <div className="bg-gray-800 text-gray-100 flex-shrink-0 w-full">
                <div className="flex items-center justify-center h-10 border-b border-gray-700">
                    <span className="text-lg font-bold uppercase">blogs</span>
                </div>
                <ul className="py-4">
                    <BlogMenuItem
                        onClickItem={props.onChangeComponent}
                        itemName="Add Blog"
                        icon="add"
                        activeItem={props.currentCmp === 'create'}
                    />
                    <BlogMenuItem
                        onClickItem={props.onChangeComponent}
                        itemName="All Blogs"
                        icon="edit"
                        activeItem={props.currentCmp === 'edit'}
                    />
                    <BlogMenuItem
                        onClickItem={props.onChangeComponent}
                        itemName="Publishing Blogs"
                        icon="pub"
                        activeItem={props.currentCmp === 'published'}
                    />
                    <BlogMenuItem
                        onClickItem={props.onChangeComponent}
                        itemName="Blocked Blogs"
                        icon="ban"
                        activeItem={props.currentCmp === 'blocked'}
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
