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
                            <li className="flex py-6">
                                <div className="w-2/3">
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
                                            The maximum and minimum amount of
                                            the project should be between{" "}
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
                                            The duration of the software project
                                            should be more than{" "}
                                            <b className="text-white">1</b> day.
                                        </li>
                                        <li className="text-sm pb-1">
                                            Your order must have a title and it
                                            is recommended that a complete
                                            description of the project be given
                                            in the section.
                                        </li>
                                    </ul>
                                </div>
                                <div className="mx-auto my-auto">
                                    <img
                                        width="100"
                                        height="100"
                                        src="https://img.icons8.com/ios/100/1d4ed8/rules.png"
                                        alt="rules"
                                        className=" animate-bounce"
                                    />
                                </div>
                            </li>
                            <li className="flex py-6">
                                <div className="w-2/3">
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
                                            Conditions for starting the project
                                        </b>
                                    </div>
                                    <ul className="ps-5 mt-2 space-y-1 list-disc list-inside">
                                        <li className="text-sm pb-1">
                                            After the project is approved by the
                                            site specialist, you need to pay its
                                            advance to start the project.
                                        </li>
                                        <li className="text-sm pb-1">
                                            After the project is approved, you
                                            have only 5 days to pay, otherwise
                                            the project will be deleted.
                                        </li>
                                        <li className="text-sm pb-1">
                                            The delivery of the project takes
                                            place outside the site and in the
                                            form of e-mail or GitHub.
                                        </li>
                                    </ul>
                                </div>
                                <div className="mx-auto my-auto">
                                    <img
                                        width="100"
                                        height="100"
                                        src="https://img.icons8.com/ios/100/1d4ed8/project.png"
                                        alt="project"
                                        className="animate-bounce"
                                    />
                                </div>
                            </li>
                            <li className="text-red-600">
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
                        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                                <tr>
                                    <th scope="col" className="px-6 py-3">
                                        Product name
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <div className="flex items-center">
                                            Color
                                            <a href="#">
                                                <svg
                                                    className="w-3 h-3 ms-1.5"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                                </svg>
                                            </a>
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <div className="flex items-center">
                                            Category
                                            <a href="#">
                                                <svg
                                                    className="w-3 h-3 ms-1.5"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                                </svg>
                                            </a>
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <div className="flex items-center">
                                            Price
                                            <a href="#">
                                                <svg
                                                    className="w-3 h-3 ms-1.5"
                                                    aria-hidden="true"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="currentColor"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                                                </svg>
                                            </a>
                                        </div>
                                    </th>
                                    <th scope="col" className="px-6 py-3">
                                        <span className="sr-only">Edit</span>
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        Apple MacBook Pro 17"
                                    </th>
                                    <td className="px-6 py-4">Silver</td>
                                    <td className="px-6 py-4">Laptop</td>
                                    <td className="px-6 py-4">$2999</td>
                                    <td className="px-6 py-4 text-right">
                                        <a
                                            href="#"
                                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                        >
                                            Edit
                                        </a>
                                    </td>
                                </tr>
                                <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        Microsoft Surface Pro
                                    </th>
                                    <td className="px-6 py-4">White</td>
                                    <td className="px-6 py-4">Laptop PC</td>
                                    <td className="px-6 py-4">$1999</td>
                                    <td className="px-6 py-4 text-right">
                                        <a
                                            href="#"
                                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                        >
                                            Edit
                                        </a>
                                    </td>
                                </tr>
                                <tr className="bg-white dark:bg-gray-800">
                                    <th
                                        scope="row"
                                        className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                                    >
                                        Magic Mouse 2
                                    </th>
                                    <td className="px-6 py-4">Black</td>
                                    <td className="px-6 py-4">Accessories</td>
                                    <td className="px-6 py-4">$99</td>
                                    <td className="px-6 py-4 text-right">
                                        <a
                                            href="#"
                                            className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                                        >
                                            Edit
                                        </a>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </AuthenticatedLayout>
        </>
    );
};

export default Orders;
