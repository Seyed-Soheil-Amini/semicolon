import React from "react";
import Modal from "react-modal";
import Select from "react-select";
import "tailwindcss/tailwind.css";
import { isEmpty } from "lodash";
import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { Dialog, Transition } from "@headlessui/react";
import { WithContext as ReactTags } from "react-tag-input";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer, toast } from "react-toastify";
import { useUpdateBlog, useGetCategories } from "@/hooks";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

const BlogEditForm = (props) => {
    const { t } = useTranslation();
    const [blog, setBlog] = useState({
        id: props.blog.id,
        title: props.blog.title,
        category: {
            value: props.blog.category.id,
            label: props.blog.category.name,
        },
        body: props.blog.body,
        image: props.blog.image,
        imageBaseCode: "",
        labels: !isEmpty(props.blog.labels) ? props.blog.labels : [],
    });

    const { data: updatedBlog, mutateAsync: updateBlog } = useUpdateBlog();
    const { data: categories } = useGetCategories();
    const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2 MB

    const {
        register,
        formState: { errors },
        handleSubmit: submit,
    } = useForm();

    const [disabledDropZone, setDisabledDropZone] = useState(
        !isEmpty(blog.image)
    );
    const [loading, setLoading] = useState(false);
    const [showPopup, setShowPopup] = useState({
        isShow: false,
        message: null,
        success: false,
        data: null,
    });

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();
        reader.onload = () => {
            handleChange({ name: "imageBaseCode", value: reader.result });
            handleChange({ name: "image", value: file });
            setDisabledDropZone(!disabledDropZone);
        };
        if (file) {
            if (file.size > MAX_IMAGE_SIZE) {
                toast.info(t("toast.edt-frm.img-size"));
                return;
            }
            if (!file.type.startsWith("image/")) {
                toast.info(t("toast.edt-frm.img-for"));
                return;
            }
            reader.readAsDataURL(file);
        }
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop,
        disabled: disabledDropZone,
    });

    function handleSubmit(event) {
        setLoading(true);
        try {
            Promise.resolve(updateBlog(blog)).then((response) => {
                setShowPopup({
                    isShow: true,
                    message: t("toast.edt-frm.scs"),
                    data: response.data.data,
                    success: true,
                });
            });
        } catch (error) {
            setShowPopup({
                isShow: true,
                message: `${t("toast.edt-frm.err")}.(error:${error})`,
                data: null,
                success: false,
            });
            console.error(error);
        } finally {
            setLoading(false);
        }
    }

    const handleChange = (event) => {
        const { name, value } = event;
        setBlog((prevBlog) => {
            return {
                ...prevBlog,
                [name]: value,
            };
        });
    };

    const handleCloseAfterSaved = () => {
        props.onSave();
        setShowPopup({
            ...showPopup,
            isShow: false,
            data: null,
            message: null,
        });
    };

    const Keys = {
        TAB: 9,
        SPACE: 32,
        ENTER: 13,
    };

    const onAddLabel = useCallback(
        (newTag) => {
            setBlog({ ...blog, labels: [...blog.labels, newTag] });
        },
        [blog]
    );

    const onDeleteLabel = useCallback(
        (tagIndex) => {
            setBlog({
                ...blog,
                labels: blog.labels.filter((_, i) => i !== tagIndex),
            });
        },
        [blog]
    );

    return (
        <>
            <ToastContainer position="top-center" />
            <Transition show={showPopup.isShow} as={React.Fragment}>
                <Dialog
                    open={showPopup.isShow}
                    onClose={handleCloseAfterSaved}
                    className="fixed z-10 inset-0 overflow-y-auto"
                >
                    <div className="flex items-center justify-center min-h-screen">
                        <Dialog.Overlay
                            className="fixed z-10 inset-y-0 bg-zinc-950 bg-opacity-30"
                            style={{ pointerEvents: "none" }}
                        />
                        <div
                            className="flex-row z-20 mx-auto bg-opacity-100 w-2/5 h-40 rounded-lg border-4 p-4"
                            style={{
                                borderColor: showPopup.success
                                    ? "#16a34a"
                                    : "#b91c1c",
                                backgroundColor: showPopup.success
                                    ? "#bbf7d0"
                                    : "#fecaca",
                            }}
                        >
                            <Dialog.Title className="text-lg font-medium mb-2">
                                Server Message
                            </Dialog.Title>
                            <Dialog.Description className="text-gray-700 mb-4">
                                {showPopup.message}
                            </Dialog.Description>
                            <div className="flex justify-end">
                                <button
                                    className="hover:bg-red-400 text-white font-bold py-2 px-3 rounded"
                                    onClick={handleCloseAfterSaved}
                                    style={{
                                        zIndex: 100,
                                        pointerEvents: "auto",
                                        backgroundColor: showPopup.success
                                            ? "#16a34a"
                                            : "#b91c1c",
                                        ":hover": {
                                            backgroundColor: showPopup.success
                                                ? "#10b981"
                                                : "#ef4444",
                                        },
                                    }}
                                >
                                    {t("dash.blg.edt-form.cls")}
                                </button>
                            </div>
                        </div>
                    </div>
                </Dialog>
            </Transition>
            <Modal
                isOpen={props.isOpen}
                className=" overflow-auto max-h-90vh h-6.5/7 w-4/5 fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-zinc-900 rounded-md px-5 py-1 w-400 max-w-full"
            >
                <form
                    onSubmit={submit(handleSubmit)}
                    encType="multipart/form-data"
                    className="flex-md-row h-full w-full fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-zinc-900 rounded-md px-5 py-1 w-400 max-w-full"
                >
                    <div className="max-h-80vh h-6.5/7 flex-md-row">
                        <h2 className="text-xl text-white font-bold mb-1">
                            {t("dash.blg.edt-form.tit")}
                        </h2>
                        <div className="flex-row mb-0 mx-auto h-3/7">
                            <label
                                className="h-1/7 block text-zinc-50 text-sm md:text-base font-bold mb-0 text-center"
                                htmlFor="file"
                            >
                                {t("dash.blg.edt-form.img-fil")}
                            </label>
                            <div
                                className="flex h-6/7 items-center w-full md:w-1/2 mb-3 border-dashed border-2 border-gray-300 rounded mx-auto my-auto text-center text-white"
                                {...getRootProps()}
                            >
                                <input
                                    type="file"
                                    name="image"
                                    {...getInputProps()}
                                />
                                {!isEmpty(blog.image) ? (
                                    <>
                                        <img
                                            className="flex mx-auto my-auto h-full w-full md:w-4/6"
                                            src={
                                                isEmpty(blog.imageBaseCode)
                                                    ? `${location.origin}/storage/${blog.image}`
                                                    : blog.imageBaseCode
                                            }
                                            alt="Selected image preview"
                                        />
                                        <div className="absolute h-2/6">
                                            <button
                                                className="align-content-center bg-red-600 px-3 text-2xl rounded-md"
                                                onClick={() => {
                                                    setBlog({
                                                        ...blog,
                                                        image: null,
                                                        imageBaseCode: "",
                                                    });
                                                    setDisabledDropZone(
                                                        !disabledDropZone
                                                    );
                                                }}
                                            >
                                                &times;
                                            </button>
                                        </div>
                                    </>
                                ) : (
                                    <p className="mx-auto my-auto text-zinc-50 text-xs md:text-sm">
                                        {t("dash.blg.edt-form.sub-img")}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="flex-row md:flex w-full text-gray-600">
                            <div className="mb-1 w-full md:w-2/4 mt-1">
                                <label
                                    htmlFor="title"
                                    className="block text-zinc-50 text-sm md:text-lg font-bold mb-1"
                                >
                                    {t("dash.blg.edt-form.sub-tit")}
                                </label>
                                <input
                                    type="text"
                                    id="title"
                                    className="form-input w-full text-xs bg-gray-300 text-gray-900 md:text-base rounded"
                                    value={blog.title}
                                    name="title"
                                    required
                                    {...register("title", {
                                        required: true,
                                        maxLength: 80,
                                    })}
                                    aria-invalid={
                                        errors.title ? "true" : "false"
                                    }
                                    onChange={(event) =>
                                        handleChange({
                                            name: "title",
                                            value: event.target.value,
                                        })
                                    }
                                />
                                {errors.title?.type === "required" && (
                                    <p
                                        role="alert"
                                        className="text-red-500 text-xs md:text-base"
                                    >
                                        * {t("dash.blg.cush.tit.req")}
                                    </p>
                                )}
                                {errors.title?.type === "maxLength" && (
                                    <p
                                        role="alert"
                                        className="text-red-500 text-xs md:text-base"
                                    >
                                        * {t("dash.blg.cush.tit.limit")}
                                    </p>
                                )}
                            </div>
                            <div className="md:ml-6 mt-1 w-full md:w-2/4">
                                <label
                                    className="block text-zinc-50 text-sm md:text-lg font-bold mb-0 md:mb-1"
                                    htmlFor="category"
                                >
                                    {t("dash.blg.edt-form.cat")}
                                </label>
                                <Select
                                    className="appearance-none border rounded bg-gray-300 text-gray-900 text-xs md:text-base leading-tight focus:outline-none focus:shadow-outline"
                                    id="category"
                                    value={blog.category}
                                    name="category"
                                    options={categories}
                                    onChange={(event) =>
                                        handleChange({
                                            name: "category",
                                            value: event,
                                        })
                                    }
                                />
                            </div>
                        </div>
                        <div className="mb-1 h-2/7 text-gray-600">
                            <label
                                htmlFor="content"
                                className="block text-zinc-50 text-sm md:text-lg font-bold mb-1"
                            >
                                {t("dash.blg.edt-form.bdy")}
                            </label>
                            <textarea
                                id="content"
                                className="form-textarea text-gray-900 bg-gray-300 tracking-tight h-full w-full text-xs md:text-base"
                                value={blog.body}
                                name="body"
                                required
                                maxLength={16000}
                                {...register("body", {
                                    required: true,
                                    maxLength: 16000,
                                    minLength: 100,
                                })}
                                aria-invalid={errors.body ? "true" : "false"}
                                onChange={(event) =>
                                    handleChange({
                                        name: "body",
                                        value: event.target.value,
                                    })
                                }
                            />
                            {errors.body?.type === "required" && (
                                <p
                                    role="alert"
                                    className="text-red-500 text-xs md:text-base"
                                >
                                    * {t("dash.blg.cush.con.req")}
                                </p>
                            )}
                            {errors.body?.type === "maxLength" && (
                                <p
                                    role="alert"
                                    className="text-red-500 text-xs md:text-base"
                                >
                                    * {t("dash.blg.cush.con.maxl")}
                                </p>
                            )}
                            {errors.body?.type === "minLength" && (
                                <p
                                    role="alert"
                                    className="text-red-500 text-xs md:text-base"
                                >
                                    * {t("dash.blg.cush.con.minl")}
                                </p>
                            )}
                            <div className="flex justify-between shadow appearance-none border rounded text-xs md:text-base w-full py-2 md:h-auto px-3 bg-gray-300 text-gray-900 leading-tight focus:outline-none focus:shadow-outline">
                                <ReactTags
                                    tags={blog.labels}
                                    suggestions={[]}
                                    delimiters={[
                                        Keys.TAB,
                                        Keys.SPACE,
                                        Keys.ENTER,
                                    ]}
                                    handleAddition={onAddLabel}
                                    handleDelete={onDeleteLabel}
                                    labelField={"name"}
                                    placeholder={"Add a label"}
                                    maxLength="20"
                                    allowUnique={true}
                                    inputProps={{
                                        disabled:
                                            !isEmpty(blog.labels) &&
                                            blog.labels.length >= 5,
                                    }}
                                />
                                <div
                                    className="my-auto float-right"
                                    style={{ width: "fit-content" }}
                                >
                                    {!isEmpty(blog.labels)
                                        ? blog.labels.length
                                        : 5}
                                    /5
                                </div>
                            </div>
                            <div className="flex justify-end mt-2">
                                <button
                                    disabled={loading}
                                    type="submit"
                                    className="flex w-auto h-1/7 bg-orange-600 hover:bg-orange-700 text-white font-bold py-1.5 px-2.5 md:py-2 md:px-4 mr-2 rounded"
                                >
                                    {loading
                                        ? t("dash.blg.edt-form.wait-btn")
                                        : t("dash.blg.edt-form.save-btn")}
                                </button>
                                <button
                                    disabled={loading}
                                    className="bg-red-500 hover:bg-red-700 text-white font-medium py-1.5 px-2.5 md:py-2 md:px-4 rounded"
                                    onClick={() => props.onClose()}
                                >
                                    {t("dash.blg.edt-form.cnl-btn")}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </Modal>
        </>
    );
};

export default BlogEditForm;
