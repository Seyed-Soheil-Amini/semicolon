import React from "react";
import Modal from "react-modal";
import { isEmpty } from "lodash";
import { useForm } from "react-hook-form";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer, toast } from "react-toastify";
import clsBtn from "../../../../public/images/ordering/close-window-96.png";

const AcceptOrderModal = ({order,handleClose}) => {
    const {
        register,
        watch,
        formState: { errors },
        handleSubmit: submit,
    } = useForm();

    const handleCloseWindow = () => {
        handleClose();
    };

    const handleSubmit = (event) => {
        
    }

    const resolveCategory = (codeCategory) =>{
        switch(codeCategory){
            case "AI":
                return "Artificial intelligence";
            case "GD":
                return "Game Development";
            case "SM":
                return "Server Management";
            default:
                return "Software Development";
        }
    }

    return (
        <>
            <Modal
                isOpen={true}
                className="overflow-auto max-h-90vh h-6.5/7 w-4/5 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-800 rounded-md px-5 py-1 w-400 max-w-full"
            >
                <button className="" onClick={() => handleCloseWindow()}>
                    <img src={clsBtn} className="w-12 h-8" />
                </button>
                <div className="container-fluid flex gap-x-6 mt-2">
                    <div className="flex flex-col px-5 py-2.5 bg-gray-700 text-gray-100 rounded-lg">
                        <div className="text-3xl font-serif">Title</div>
                        <b className="font-medium">{order.title}</b>
                    </div>
                    <div className="flex flex-col px-5 py-2.5 bg-gray-700 text-gray-100 rounded-lg">
                        <div className="text-3xl font-serif">Category</div>
                        <b className="font-medium">
                            {resolveCategory(order.category)}
                        </b>
                    </div>
                </div>
                {/* <form
                    onSubmit={submit(handleSubmit)}
                    encType="multipart/form-data"
                    className="flex-md-row h-full w-full fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-gray-100 rounded-md px-5 py-1 w-400 max-w-full"
                ></form> */}
            </Modal>
        </>
    );
}
 
export default AcceptOrderModal;