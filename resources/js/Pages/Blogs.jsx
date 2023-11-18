import EditBlog from "@/Components/Blog/EditBlog";
import PublishedBlog from "@/Components/Blog/PublishedBlog";
import CreateBlog from "@/Components/Blog/CreateBlog";
import BlogSideBar from "@/Components/BlogMenu";
import BlockedBlog from "@/Components/Blog/BlockedBlog";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { isEmpty } from "lodash";
import { FaBlog, FaEdit, FaPaperPlane, FaBan } from "react-icons/fa";

export default function Blogs({ auth }) {
    const [currentComponent, setcurrentComponent] = useState(() => {
        const lastComponent = JSON.parse(localStorage.getItem("lastComponent"));
        return isEmpty(lastComponent) ? "create" : lastComponent;
    });
    const [showSideBar, setShowSideBar] = useState(false);

    useEffect(() => {
        return () => {
            localStorage.setItem(
                "lastComponent",
                JSON.stringify(currentComponent)
            );
        };
    }, [currentComponent]);

    function handleCreateNewBlogWhenEmpty() {
        setcurrentComponent("create");
    }

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Blogs" />
            <div className="container-fluid h-auto flex">
                <div className={`${showSideBar && "w-5/6 opacity-50"} w-6.5/7 h-100 pt-6`}>
                    {currentComponent === "create" && <CreateBlog />}
                    {currentComponent === "edit" && (
                        <EditBlog
                            user={auth.user}
                            onClickCreate={handleCreateNewBlogWhenEmpty}
                        />
                    )}
                    {currentComponent === "published" && (
                        <PublishedBlog user={auth.user} />
                    )}
                    {currentComponent === "blocked" && (
                        <BlockedBlog user={auth.user} />
                    )}
                </div>
                {showSideBar ? (
                    <div className="fixed top-15 right-0 h-full w-1/3 md:w-1/6 z-50 bg-opacity-50 items-center justify-center animate-fade-left animate-once animate-delay-0 animate-duration-500">
                        <BlogSideBar
                            onChangeComponent={setcurrentComponent}
                            currentCmp={currentComponent}
                            closeSideBar={() => setShowSideBar(!showSideBar)}
                        />
                    </div>
                ) : (
                    <button
                        type="button"
                        className="fixed right-0 p-2 mt-2 ms-3 mr-2 text-sm cursor-default text-gray-300 rounded-lg bg-gray-700 focus:outline-none transition duration-300 ease-out delay-200"
                    >
                        <span className="sr-only">Open sidebar</span>
                        <svg
                            className="flex mx-auto w-3 h-3 md:w-6 md:h-6 mb-2 md:mb-4 cursor-pointer"
                            aria-hidden="true"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                            xmlns="http://www.w3.org/2000/svg"
                            onClick={() => setShowSideBar(true)}
                        >
                            <path
                                clipRule="evenodd"
                                fillRule="evenodd"
                                d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
                            />
                        </svg>
                        <div className="flex-row space-y-4 md:space-y-8 items-center">
                            <div
                                className={`border-1 border-gray-100 rounded-full ${
                                    currentComponent == "create"
                                        ? "text-gray-700 bg-gray-200"
                                        : "text-gray-200 hover:bg-gray-200 hover:text-gray-700"
                                }`}
                            >
                                <button
                                    className="p-1"
                                    onClick={() =>
                                        setcurrentComponent("create")
                                    }
                                >
                                    <FaBlog
                                        className={`w-3 w-3 md:w-6 md:h-6 pointer-events-none`}
                                        aria-hidden="true"
                                    />
                                </button>
                            </div>
                            <div
                                className={`border-1 border-gray-100 rounded-full ${
                                    currentComponent == "edit"
                                        ? "text-gray-700 bg-gray-200"
                                        : "text-gray-200 hover:bg-gray-200 hover:text-gray-700"
                                }`}
                            >
                                <button
                                    className="p-1"
                                    onClick={() => setcurrentComponent("edit")}
                                >
                                    <FaEdit
                                        className={`w-3 w-3 md:w-6 md:h-6 pointer-events-none`}
                                        aria-hidden="true"
                                    />
                                </button>
                            </div>
                            <div
                                className={`border-1 border-gray-100 rounded-full ${
                                    currentComponent == "published"
                                        ? "text-gray-700 bg-gray-200"
                                        : "text-gray-200 hover:bg-gray-200 hover:text-gray-700"
                                }`}
                            >
                                <button
                                    className="p-1"
                                    onClick={() =>
                                        setcurrentComponent("published")
                                    }
                                >
                                    <FaPaperPlane
                                        className={`w-3 w-3 md:w-6 md:h-6 pointer-events-none`}
                                        aria-hidden="true"
                                    />
                                </button>
                            </div>
                            <div
                                className={`border-1 border-gray-100 rounded-full ${
                                    currentComponent == "blocked"
                                        ? "text-gray-700 bg-gray-200"
                                        : "text-gray-200 hover:bg-gray-200 hover:text-gray-700"
                                }`}
                            >
                                <button
                                    className="p-1"
                                    onClick={() =>
                                        setcurrentComponent("blocked")
                                    }
                                >
                                    <FaBan
                                        className={`w-3 w-3 md:w-6 md:h-6 pointer-events-none`}
                                        aria-hidden="true"
                                    />
                                </button>
                            </div>
                        </div>
                    </button>
                )}
            </div>
        </AuthenticatedLayout>
    );
}
