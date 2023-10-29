import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useGetUserActivity } from "@/hooks";
import { Head } from "@inertiajs/react";
import { isEmpty } from "lodash";

export default function Dashboard({ auth }) {
    const {
        data: activities,
        isLoading,
        isRefetching,
    } = useGetUserActivity(auth.user.id);

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Dashboard" />
            <div className="py-10">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white dark:bg-gray-800 overflow-hidden shadow-sm sm:rounded-lg">
                        <div className="p-6 text-gray-900 dark:text-gray-100">
                            Welcome Dear {auth.user.name} :)
                        </div>
                    </div>
                </div>
                <div className="mx-auto max-w-7xl px-6 lg:px-8 py-10">
                    <div class="px-4 sm:px-0">
                        <h3 class="font-semibold leading-7 text-gray-300 text-2xl">
                            User Information
                        </h3>
                    </div>
                    <div class="mt-6 border-t border-gray-500">
                        <dl class="divide-y divide-gray-500">
                            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt class="text-md leading-6 text-gray-400 font-serif">
                                    Full name
                                </dt>
                                <dd class="mt-1 text-sm leading-6 text-blue-500 sm:col-span-2 sm:mt-0">
                                    {auth.user.name}
                                </dd>
                            </div>
                            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt class="text-md leading-6 text-gray-400 font-serif">
                                    Application for
                                </dt>
                                <dd class="mt-1 text-sm leading-6 text-blue-500 sm:col-span-2 sm:mt-0">
                                    {auth.user.job_title}
                                </dd>
                            </div>
                            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt class="text-md leading-6 text-gray-400 font-serif">
                                    Email address
                                </dt>
                                <dd class="mt-1 text-sm leading-6 text-blue-500 sm:col-span-2 sm:mt-0">
                                    {auth.user.email}
                                </dd>
                            </div>
                            <div class="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                                <dt class="text-md leading-6 text-gray-400 font-serif">
                                    About
                                </dt>
                                <dd class="mt-1 text-sm leading-6 text-blue-500 sm:col-span-2 sm:mt-0">
                                    {auth.user.about == "null"
                                        ? "Author of Semicolon Weblog"
                                        : auth.user.about}{" "}
                                </dd>
                            </div>
                        </dl>
                    </div>
                </div>
                <div className="py-10 sm:py-16">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <dl className="grid grid-cols-1 gap-x-8 gap-y-16 text-center lg:grid-cols-3 bg-gray-900 py-10 rounded-lg">
                            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                                <dt className="text-base leading-7 text-gray-400 font-serif">
                                    Average views of blogs
                                </dt>
                                {!isLoading ? (
                                    <dd className="order-first text-3xl font-semibold tracking-tight text-gray-300 sm:text-5xl">
                                        {activities.avgViews}
                                    </dd>
                                ) : (
                                    <></>
                                )}
                            </div>
                            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                                <dt className="text-base leading-7 text-gray-400 font-serif">
                                    Favoriate Category
                                </dt>
                                {!isLoading ? (
                                    <dd className="order-first text-3xl font-semibold tracking-tight text-gray-300 sm:text-5xl">
                                        {activities.favoriteCategory.name}
                                    </dd>
                                ) : (
                                    <></>
                                )}
                            </div>
                            <div className="mx-auto flex max-w-xs flex-col gap-y-4">
                                <dt className="text-base leading-7 text-gray-400 font-serif">
                                    Number of published posts
                                </dt>
                                {!isLoading ? (
                                    <dd className="order-first text-3xl font-semibold tracking-tight text-gray-300 sm:text-5xl">
                                        {activities.numberOfBlogs}
                                    </dd>
                                ) : (
                                    <></>
                                )}
                            </div>
                        </dl>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
