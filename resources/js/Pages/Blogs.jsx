import EditBlog from "@/Components/Blog/EditBlog";
import PublishedBlog from "@/Components/Blog/PublishedBlog";
import CreateBlog from "@/Components/Blog/CreateBlog";
import BlogSideBar from "@/Components/BlogMenu";
import BlockedBlog from "@/Components/Blog/BlockedBlog";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { isEmpty } from "lodash";

export default function Blogs({ auth }) {
    const [currentComponent, setcurrentComponent] = useState(() => {
        const lastComponent = JSON.parse(localStorage.getItem("lastComponent"));
        return isEmpty(lastComponent) ? "create" : lastComponent;
    });

    useEffect(() => {
        return () => {
            localStorage.setItem(
                "lastComponent",
                JSON.stringify(currentComponent)
            );
        };
    }, [currentComponent]);

    function handleCreateNewBlogWhenEmpty() {
        // alert("test");
        setcurrentComponent("create");
    }

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Blogs" />
            <div className="container-fluid h-auto flex">
                <div className="w-5/6 h-100 pt-6">
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
                <div className="w-1/6 h-100 bg-zinc-200">
                    <BlogSideBar
                        onChangeComponent={setcurrentComponent}
                        currentCmp={currentComponent}
                    />
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
