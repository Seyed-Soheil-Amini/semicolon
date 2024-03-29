import React, { useState, useEffect, useCallback } from "react";
import Select from "react-select";
import { useDropzone } from "react-dropzone";
import DangerButton from "../DangerButton";
import { isEmpty } from "lodash";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer, toast } from "react-toastify";
import { WithContext as ReactTags } from "react-tag-input";
import { useCreateBlog, useGetCategories } from "@/hooks";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

const CreateBlog = () => {
    const [blog, setBlog] = useState(() => {
        const lastEdited = JSON.parse(localStorage.getItem("blogCreating"));
        return isEmpty(lastEdited)
            ? {
                  title: "",
                  category: null,
                  body: "",
                  imageBaseCode: "",
                  image: {},
                  labels: [],
              }
            : lastEdited;
    });
    const { t } = useTranslation();
    const MAX_IMAGE_SIZE = 2 * 1024 * 1024; // 2 MB
    const { data: categories } = useGetCategories();
    const {
        data,
        mutateAsync: storeBlog,
        isLoading,
        isError,
        isSuccess,
        error,
    } = useCreateBlog();

    const {
        register,
        formState: { errors },
        handleSubmit: submit,
    } = useForm();
    useEffect(() => {
        console.log(errors);
    }, [errors]);

    const Keys = {
        TAB: 9,
        SPACE: 32,
        ENTER: 13,
    };

    useEffect(() => {
        return () => {
            localStorage.setItem("blogCreating", JSON.stringify(blog));
        };
    }, [blog]);

    const handleChange = (event) => {
        const { name, value } = event;
        setBlog((prevBlog) => {
            return {
                ...prevBlog,
                [name]: value,
            };
        });
    };

    function handleSubmit(event) {
        try {
            toast.promise(async () => await Promise.resolve(storeBlog(blog)), {
                pending: t("toast.crt.pnd"),
                success: {
                    render() {
                        setBlog({
                            title: "",
                            category: null,
                            body: "",
                            imageBaseCode: "",
                            image: {},
                            labels: [],
                        });
                        return t("toast.crt.scs");
                    },
                },
                error: {
                    render({ data }) {
                        if (data.response && data.response.status === 400) {
                            return t("toast.crt.nfn");
                        } else {
                            return t("toast.crt.plb");
                        }
                    },
                },
            });
        } catch (error) {
            console.log(error);
        }
    }

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();

        reader.onload = () => {
            handleChange({ name: "imageBaseCode", value: reader.result });
            handleChange({ name: "image", value: file });
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

    const { getRootProps, getInputProps } = useDropzone({ onDrop });

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
        <div className="">
            <ToastContainer position="top-center" />
            <form
                onSubmit={submit(handleSubmit)}
                encType="multipart/form-data"
                className="mt-10"
            >
                <div
                    className="flex-row md:flex mx-5 mb-4"
                    data-te-animation-init
                    data-te-animation-start="onHover"
                    data-te-animation-reset="true"
                    data-te-animation="[fade-in_1s_ease-in-out]"
                >
                    <div className="w-6.5/7 md:w-3/4">
                        <label
                            className="block text-gray-200 text-2xl font-serif tracking-wider mb-1"
                            htmlFor="title"
                        >
                            {t("dash.blg.tit")}
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-950 text-gray-100 outline-1 leading-tight hover:bg-gray-700 focus:outline-none focus:shadow-outline focus:bg-gray-700"
                            id="title"
                            type="text"
                            placeholder="Enter title"
                            value={blog.title}
                            {...register("title", {
                                required: true,
                                maxLength: 80,
                            })}
                            aria-invalid={errors.title ? "true" : "false"}
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
                    <div className="w-6.5/7 md:ml-6 md:w-1/4">
                        <label
                            className="block text-gray-100 text-2xl font-serif tracking-wider mb-1"
                            htmlFor="category"
                        >
                            {t("dash.blg.cat")}
                        </label>
                        <Select
                            className="appearance-none rounded bg-gray-900 leading-tight focus:outline-none focus:shadow-outline"
                            id="category"
                            value={blog.category}
                            name="category"
                            options={categories}
                            required
                            onChange={(event) =>
                                handleChange({
                                    name: "category",
                                    value: event,
                                })
                            }
                            styles={{
                                control: (base) => ({
                                    ...base,
                                    backgroundColor: "#020617",
                                    ":focus": {
                                        borderColor: "#64748b",
                                        backgroundColor: "#334155",
                                    },
                                    ":hover": {
                                        borderColor: "#64748b",
                                        backgroundColor: "#334155",
                                    },
                                    width: "100%",
                                    borderColor: "#64748b",
                                }),
                                option: (base) => ({
                                    ...base,
                                    backgroundColor: "#020617",
                                    ":focus": {
                                        backgroundColor: "#334155",
                                    },
                                    ":hover": {
                                        backgroundColor: "#334155",
                                    },
                                    boxShadow: "0 0 0 1px rgba(0, 0, 0, 0.1)",
                                    padding: "8px 12px",
                                    width: "100%",
                                }),
                                singleValue: (base) => ({
                                    ...base,
                                    color: "white",
                                }),
                            }}
                        />
                    </div>{" "}
                </div>
                <div className="mx-5 mb-4 w-5/6 md:w-auto">
                    <label
                        className="block text-gray-200 text-2xl font-serif tracking-wider mb-1"
                        htmlFor="context"
                    >
                        {t("dash.blg.bdy")}
                    </label>
                    <textarea
                        className="shadow appearance-none border rounded w-full py-2 px-3 bg-gray-950 text-gray-100 leading-tight outline-1 hover:bg-gray-700 focus:outline-none focus:shadow-outline focus:bg-gray-700"
                        rows="8"
                        cols="50"
                        id="context"
                        placeholder="Enter context"
                        value={blog.body}
                        maxLength={16000}
                        required
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
                </div>
                <div className="mb-3 mx-5 w-5/6 md:w-auto">
                    <label
                        className="text-gray-200 text-2xl font-serif tracking-wider mb-1"
                        htmlFor="labels"
                    >
                        {t("dash.blg.lbl")}
                    </label>
                    <div className="flex justify-between shadow appearance-none border border-gray-500 rounded text-xs md:text-base w-full py-2 md:h-auto px-3 bg-gray-950 text-gray-100 leading-tight focus:outline-none focus:shadow-outline">
                        <ReactTags
                            tags={blog.labels}
                            suggestions={[]}
                            delimiters={[Keys.TAB, Keys.SPACE, Keys.ENTER]}
                            handleAddition={onAddLabel}
                            handleDelete={onDeleteLabel}
                            labelField={"name"}
                            placeholder={"Add a label"}
                            maxLength="20"
                            allowUnique={true}
                            inputProps={{
                                disabled: blog.labels.length >= 5,
                            }}
                            classNames={{
                                tagInputField:
                                    "bg-gray-950 hover:bg-gray-700 focus:bg-gray-700",
                            }}
                        />
                        <div
                            className="my-auto float-right text-xs md:text-base"
                            style={{ width: "fit-content" }}
                        >
                            {blog.labels.length}/5
                        </div>
                    </div>
                </div>
                <div className="mb-4 mt-20 mx-auto">
                    <label
                        className="block text-gray-200 text-2xl font-serif tracking-wider mb-3 text-center"
                        htmlFor="file"
                    >
                        {t("dash.blg.img")}
                    </label>
                    <div
                        className="flex items-center w-3/4 md:w-1/2 h-80 mb-3 border-dashed border-2 border-gray-300 rounded mx-auto text-center text-white"
                        {...getRootProps()}
                    >
                        <input type="file" name="image" {...getInputProps()} />
                        {!isEmpty(blog.image) ? (
                            <img
                                className="flex mx-auto my-auto w-4/5 h-full"
                                src={blog.imageBaseCode}
                                alt="Selected image preview"
                            />
                        ) : (
                            <p className="mx-auto my-auto text-sm md:text-base">
                                {t("dash.blg.plc")} <br />
                                {t("dash.blg.max-size-img")}
                            </p>
                        )}
                    </div>
                    {!isEmpty(blog.image) && (
                        <div className="w-20 mx-auto my-3">
                            <DangerButton
                                className="w-20 align-content-center"
                                onClick={() =>
                                    setBlog({ ...blog, image: null })
                                }
                            >
                                {t("dash.blg.btn")}
                            </DangerButton>
                        </div>
                    )}
                    <div className="flex items-center justify-center mt-10 mb-8">
                        <button
                            className="bg-orange-600 hover:bg-orange-700 text-white font-bold py-3 px-16 rounded focus:outline-none focus:shadow-outline"
                            type="submit"
                            disabled={isLoading}
                        >
                            {isLoading
                                ? t("dash.blg.saving-btn")
                                : t("dash.blg.save-btn")}
                        </button>
                    </div>
                </div>
            </form>
        </div>
    );
};

export default CreateBlog;
