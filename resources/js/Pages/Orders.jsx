import React, { useEffect } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";

const Orders = ({ auth, orders }) => {
    useEffect(() => {
        console.log(orders);
    }, []);
    return (
        <>
            <AuthenticatedLayout user={auth.user}>
                <Head title="Orders" />
                <div className="overflow-hidden py-8 sm:py-10">
                    <div className="mx-auto max-w-7xl px-6 lg:px-8">
                        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
                            <div className="lg:pr-8 lg:pt-4">
                                <div className="lg:max-w-lg">
                                    <p className="mt-2 text-3xl font-bold text-gray-300 sm:text-4xl">
                                        Orders
                                    </p>
                                    <p className="mt-6 text-lg leading-8 text-gray-400">
                                        Project Ordering
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
};

export default Orders;
