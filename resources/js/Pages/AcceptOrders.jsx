import { useGetOrdersCat } from "@/hooks";
import React from "react";
import { Head } from "@inertiajs/react";
import { useState, useEffect } from "react";
import { isEmpty } from "lodash";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import OrderCatCard from "@/Components/Order/OrderCatCard";
import ReactPaginate from "react-paginate";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer, toast } from "react-toastify";

const AcceptOrder = ({ auth, totalOrders, staff }) => {
    const itemsPerPage = 6;
    const [itemOffset, setItemOffset] = useState(1);
    const [currentOrder, setCurrentOrder] = useState([]);
    const pageCount = Math.ceil(totalOrders / itemsPerPage);
    let category = "Software Development";
    switch (staff.expertise) {
        case "AI":
            category = "Artificial intelligence";
            break;
        case "GD":
            category = "Game Development";
            break;
        case "SM":
            category = "Server Management";
            break;
        default:
            break;
    }
    const {
        data: orders,
        isLoading,
        isFetching,
    } = useGetOrdersCat(itemOffset, staff.expertise);

    useEffect(() => {
        if (!isEmpty(orders) && !isFetching && !isLoading) {
            setCurrentOrder(orders.data);
        }
    }, [isFetching, isLoading]);

    const handlePageChange = (selectedItem) => {
        setItemOffset(selectedItem.selected + 1);
    };

    return (
        <AuthenticatedLayout user={auth.user}>
            <Head title="Accept Order" />
            <ToastContainer position="top-center" />
            <div className="min-h-screen overflow-hidden py-8 sm:py-10">
                <div className="mx-auto max-w-7xl mt-10 px-6 lg:px-8">
                    <div className="mx-5 text-4xl text-center text-gray-200 border-b-2 border-gray-400 pb-8">
                        <h2>
                            <b>{category} Orders</b>
                        </h2>
                    </div>
                    <div className="">
                        {isLoading ? (
                            <p>Loading ...</p>
                        ) : (
                            !isEmpty(orders) && (
                                <ul className="h-full py-2 max-w-5xl mx-8 mx-auto">
                                    {currentOrder.map((order) => (
                                        <OrderCatCard order={order} />
                                    ))}
                                    <ReactPaginate
                                        breakLabel="..."
                                        nextLabel="next >"
                                        onPageChange={(selectedItem) => {
                                            handlePageChange(selectedItem);
                                        }}
                                        pageRangeDisplayed={4}
                                        pageCount={pageCount}
                                        marginPagesDisplayed={2}
                                        renderOnZeroPageCount={null}
                                        previousLabel="< prev"
                                        containerClassName={`flex justify-between pt-4 text-gray-300 mx-auto ${
                                            pageCount > 6 ? "w-1/2" : "w-1/3"
                                        }`}
                                        disabledClassName="cursor-not-allowed"
                                        activeClassName="bg-primary rounded-full px-2 text-white font-bold"
                                    />
                                </ul>
                            )
                        )}
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
};

export default AcceptOrder;
