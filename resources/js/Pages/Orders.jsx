import React, { useEffect, useState } from "react";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import orderImage from "../../../public/images/rules-100.png";
import prjImage from "../../../public/images/project.png";
import OrderCard from "@/Components/Order/OrderUserCard";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer, toast } from "react-toastify";
import { useGetOrdersOfUser } from "@/hooks";
import { isEmpty } from "lodash";
import SkeletonOrder from "@/Components/Order/SkeletonOrder";
import ModalOrder from "@/Components/Order/ModalOrder";
import ReactPaginate from "react-paginate";

const Orders = ({ auth, totalOrders }) => {
    const [isOpenNew, setIsOpenNew] = useState(false);

    const itemsPerPage = 4;
    const [itemOffset, setItemOffset] = useState(1);
    const [currentOrder, setCurrentOrder] = useState([]);
    const pageCount = Math.ceil(totalOrders / itemsPerPage);

    const {
        data: orders,
        isLoading,
        isFetching,
    } = useGetOrdersOfUser(itemOffset);

    useEffect(() => {
        if (!isEmpty(orders) && !isFetching && !isLoading) {
            setCurrentOrder(orders.data);
        }
    }, [isFetching, isLoading]);

    const handlePageChange = (selectedItem) => {
        setItemOffset(selectedItem.selected + 1);
    };

    const handleCloseModal = () => {
        setIsOpenNew(false);
    };

    return (
        <>
            <AuthenticatedLayout user={auth.user}>
                <ToastContainer position="top-center" />
                <Head title="Orders" />
                <div className="px-5 py-5 min-h-screen">
                    <div className="container-fluid relative overflow-x-auto shadow-md sm:rounded-lg py-5">
                        <div className="flex flex-col text-center justify-center pb-5 mb-8">
                            <h3 className="text-2xl mx-auto text-gray-200 font-semibold w-5/6 py-2.5">
                                Leave Your Software Orders to Semicolon with
                                Peace of Mind.
                            </h3>
                            <p className="text-sm w-2/3 mx-auto">
                                Order your project in this section so that our
                                experts will approve and carry it out. Also, in
                                this section, you can edit and modify orders
                                that have not yet been confirmed and delete them
                                if you want.
                            </p>
                        </div>
                        <ul className="space-y-4 text-gray-500 list-circle dark:text-gray-400 pb-5">
                            <div className="font-semibold rounded bg-gray-800 text-blue-300 border border-blue-400 items-center justify-center">
                                <li className="flex py-2">
                                    <div className="w-2/3 p-5">
                                        <div className="flex items-center pb-3">
                                            <svg
                                                class="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                            </svg>
                                            <b className="uppercase text-md">
                                                Order entry rules
                                            </b>
                                        </div>
                                        <ul className="ps-5 mt-2 space-y-1 list-disc list-inside">
                                            <li className="text-sm pb-1">
                                                The maximum and minimum amount
                                                of the project should be between{" "}
                                                <i>
                                                    <b>100,000</b>
                                                </i>{" "}
                                                and
                                                <i>
                                                    <b>10,000,000</b>
                                                </i>{" "}
                                                Tomans.
                                            </li>
                                            <li className="text-sm pb-1">
                                                The duration of the software
                                                project should be more than{" "}
                                                <b className="text-white">1</b>{" "}
                                                day.
                                            </li>
                                            <li className="text-sm pb-1">
                                                Your order must have a title and
                                                it is recommended that a
                                                complete description of the
                                                project be given in the section.
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="mx-auto my-auto">
                                        <img
                                            width="100"
                                            height="100"
                                            src={orderImage}
                                            alt="rules"
                                        />
                                    </div>
                                </li>
                                <li className="flex py-2">
                                    <div className="w-2/3 p-5">
                                        <div className="flex items-center pb-3">
                                            <svg
                                                class="w-3.5 h-3.5 me-2 text-green-500 dark:text-green-400 flex-shrink-0"
                                                aria-hidden="true"
                                                xmlns="http://www.w3.org/2000/svg"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
                                            </svg>
                                            <b className="uppercase text-md">
                                                Conditions for starting the
                                                project
                                            </b>
                                        </div>
                                        <ul className="ps-5 mt-2 space-y-1 list-disc list-inside">
                                            <li className="text-sm pb-1">
                                                After the project is approved by
                                                the site specialist, you need to
                                                pay its advance to start the
                                                project.
                                            </li>
                                            <li className="text-sm pb-1">
                                                After the project is approved,
                                                you have only 5 days to pay,
                                                otherwise the project will be
                                                deleted.
                                            </li>
                                            <li className="text-sm pb-1">
                                                The delivery of the project
                                                takes place outside the site and
                                                in the form of e-mail or GitHub.
                                            </li>
                                        </ul>
                                    </div>
                                    <div className="mx-auto my-auto">
                                        <img
                                            width="100"
                                            height="100"
                                            src={prjImage}
                                            alt="project"
                                        />
                                    </div>
                                </li>
                            </div>
                            <li className="font-medium p-5 rounded bg-red-950 text-red-300 border border-red-400">
                                <div className="flex items-center">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        class="w-3.5 h-3.5 me-2 text-red-600 dark:text-red-600 flex-shrink-0"
                                    >
                                        <path d="M12 0C5.373 0 0 5.373 0 12s5.373 12 12 12 12-5.373 12-12S18.627 0 12 0zm0 18.75c-.69 0-1.25-.56-1.25-1.25s.56-1.25 1.25-1.25 1.25.56 1.25 1.25-.56 1.25-1.25 1.25zm1.125-9.375c0 .619-.506 1.125-1.125 1.125s-1.125-.506-1.125-1.125V6.75c0-.619.506-1.125 1.125-1.125s1.125.506 1.125 1.125v2.625z" />
                                    </svg>
                                    <b className="uppercase text-md">
                                        WARNINGS AND AVOIDANCES
                                    </b>
                                </div>
                                <ul className="ps-5 mt-2 space-y-1 list-disc list-inside">
                                    <li className="text-sm">
                                        It is not possible to cancel the project
                                        after prepayment.
                                    </li>
                                </ul>
                            </li>
                        </ul>
                        {isLoading ? (
                            <div
                                role="status"
                                className="p-4 mt-5 md:mt-10 space-y-2 rounded shadow animate-pulse dark:divide-gray-700 md:p-6 dark:border-gray-700 px-20 mx-28"
                            >
                                {[...Array(4)].map((_, index) => (
                                    <div key={index} className="p-1">
                                        <SkeletonOrder />
                                    </div>
                                ))}
                            </div>
                        ) : (
                            !isEmpty(orders) && (
                                <div className="h-full py-2 max-w-5xl px-12 mx-auto">
                                    {currentOrder.map((order) => (
                                        <OrderCard order={order} />
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
                                </div>
                            )
                        )}
                        <div className="fixed right-4 bottom-4 drop-shadow-2xl brightness-125">
                            <button
                                className="w-14 h-14 bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg"
                                onClick={() => setIsOpenNew(true)}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="w-8 h-8 text-gray-200"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth={2}
                                        d="M12 4v16m8-8H4"
                                    />
                                </svg>
                            </button>
                        </div>
                    </div>
                    {isOpenNew && (
                        <ModalOrder
                            handleClose={handleCloseModal}
                            order={{
                                title: "",
                                description: "",
                                category: "",
                                minimumPrice: "",
                                maximumPrice: "",
                                duration: "",
                            }}
                            state={"create"}
                        />
                    )}
                </div>
            </AuthenticatedLayout>
        </>
    );
};

export default Orders;
