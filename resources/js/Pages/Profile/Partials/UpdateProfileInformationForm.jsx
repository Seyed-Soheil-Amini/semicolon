import InputLabel from "@/Components/InputLabel";
import PrimaryButton from "@/Components/PrimaryButton";
import TextInput from "@/Components/TextInput";
import { Link, usePage } from "@inertiajs/react";
import { useDropzone } from "react-dropzone";
import { isEmpty } from "lodash";
import { useUpdateUser } from "@/hooks";
import { useState } from "react";
import { FaUserCircle } from "react-icons/fa";
import "react-toastify/dist/ReactToastify.min.css";
import { ToastContainer, toast } from "react-toastify";
import DangerButton from "@/Components/DangerButton";
import { useTranslation } from "react-i18next";

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
}) {
    const { t } = useTranslation();
    const user = usePage().props.auth.user;
    const [processing, setProcessing] = useState(false);
    const [data, setData] = useState({
        name: user.name,
        email: user.email,
        jobTitle: user.job_title,
        about: user.about,
        image: user.image,
        imageBaseCode: "",
    });
    const MAX_IMAGE_USER_SIZE = 2 * 1024 * 1024;
    const handleChange = (event) => {
        const { name, value } = event;
        setData((prevData) => {
            return {
                ...prevData,
                [name]: value,
            };
        });
    };

    const submit = async (e) => {
        e.preventDefault();
        setProcessing(true);
        toast.promise(async () => await Promise.resolve(useUpdateUser(data)), {
            pending: t("toast.prf.upd.pnd"),
            success: {
                render({ data }) {
                    setData(data);
                    setProcessing(false);
                    return t("toast.prf.upd.scs");
                },
            },
            error: {
                render({ data }) {
                    if (data.response && data.response.status === 404) {
                        return t("toast.prf.upd.nfn");
                    } else {
                        return t("toast.prf.upd.plb");
                    }
                },
            },
        });
    };

    const onDrop = (acceptedFiles) => {
        const file = acceptedFiles[0];
        const reader = new FileReader();

        reader.onload = () => {
            handleChange({ name: "imageBaseCode", value: reader.result });
            handleChange({ name: "image", value: file });
        };

        if (file) {
            if (file.size > MAX_IMAGE_USER_SIZE) {
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

    let imageElement;

    if (!isEmpty(data.imageBaseCode)) {
        imageElement = (
            <img
                className="flex mx-auto my-auto h-full object-cover rounded-md mask-circle"
                src={data.imageBaseCode}
                alt="Selected image preview"
            />
        );
    } else if (!isEmpty(data.image)) {
        imageElement = (
            <img
                className="flex mx-auto my-auto h-full object-cover rounded-md mask-circle"
                src={`${location.origin}/storage/${data.image}`}
                alt="User image preview"
            />
        );
    } else {
        imageElement = (
            <div className="flex-col mx-auto my-auto h-full">
                <FaUserCircle className="mx-auto h-16 w-16 text-gray-300 my-auto" />
                <p className="mx-auto my-auto pt-6">
                    {t("dash.prof.upd.plc-hol")}
                </p>
            </div>
        );
    }
    return (
        <>
            <ToastContainer position="top-center" />
            <section className={className}>
                <header>
                    <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                        {t("dash.prof.upd.prf-tit")}
                    </h2>

                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {t("dash.prof.upd.prf.txt")}
                    </p>
                </header>
                <form
                    onSubmit={submit}
                    className="mt-6 space-y-6"
                    encType="multipart/form-data"
                >
                    <div>
                        <InputLabel htmlFor="name" value="Name" />

                        <TextInput
                            id="name"
                            className="mt-1 block w-full"
                            value={data.name}
                            onChange={(event) =>
                                handleChange({
                                    name: "name",
                                    value: event.target.value,
                                })
                            }
                            required
                            isFocused
                            autoComplete="name"
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="email" value="Email" />
                        <TextInput
                            id="email"
                            type="email"
                            className="mt-1 block w-full"
                            value={data.email}
                            onChange={(event) =>
                                handleChange({
                                    name: "email",
                                    value: event.target.value,
                                })
                            }
                            required
                            autoComplete="username"
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="joTitle" value="Job Title" />
                        <TextInput
                            id="jobTitle"
                            className="mt-1 block w-full"
                            value={data.jobTitle}
                            onChange={(event) =>
                                handleChange({
                                    name: "jobTitle",
                                    value: event.target.value,
                                })
                            }
                        />
                    </div>
                    <div>
                        <InputLabel htmlFor="about" value="About" />
                        <div className="font-sans relative flex items-center focus-within:text-gray-600">
                            <textarea
                                id="about"
                                name="about"
                                rows={3}
                                className="block w-full  border-gray-300 dark:border-gray-700 dark:bg-gray-950 dark:text-gray-300 focus:border-indigo-500 dark:focus:border-indigo-600 focus:ring-indigo-500 dark:focus:ring-indigo-600 rounded-md shadow-sm input-with-icon"
                                defaultValue={data.about}
                                onChange={(event) =>
                                    handleChange({
                                        name: "about",
                                        value: event.target.value,
                                    })
                                }
                            />
                        </div>
                    </div>
                    <div className="col-span-full">
                        <InputLabel htmlFor="image" value="Icon Photo" />
                        <div
                            className="mt-2 flex justify-center rounded-lg border border-dashed border-gray-900/25 cursor-pointer bg-gray-900 px-5 py-2 h-60"
                            {...getRootProps()}
                        >
                            <div className="items-center">
                                <div
                                    className={`${
                                        isEmpty(data.image) &
                                            isEmpty(data.imageBaseCode) &&
                                        "mt-6"
                                    } text-sm leading-6 text-gray-400 h-full w-full mx-auto`}
                                >
                                    <label
                                        htmlFor="file-upload"
                                        className="relative cursor-pointer rounded-md font-semibold text-indigo-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-600 focus-within:ring-offset-2 hover:text-indigo-500"
                                    ></label>
                                    <input
                                        id="file-upload"
                                        name="file-upload"
                                        type="file"
                                        className="sr-only"
                                        {...getInputProps()}
                                    />
                                    {imageElement}
                                </div>
                                <p className="text-xs leading-5 text-gray-400"></p>
                            </div>
                        </div>
                    </div>
                    {mustVerifyEmail && user.email_verified_at === null && (
                        <div>
                            <p className="text-sm mt-2 text-gray-800 dark:text-gray-200">
                                {t("dash.prof.upd.emi-vrf")}
                                <Link
                                    href={route("verification.send")}
                                    method="post"
                                    as="button"
                                    className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                                >
                                    {t("dash.prof.upd.vrf-lnk")}
                                </Link>
                            </p>

                            {status === "verification-link-sent" && (
                                <div className="mt-2 font-medium text-sm text-green-600 dark:text-green-400">
                                    {t("dash.prof.upd.vrf-res")}
                                </div>
                            )}
                        </div>
                    )}
                    <div className="flex justify-start items-center gap-4">
                        <PrimaryButton disabled={processing}>
                            {t("dash.prof.upd-usr.sav-btn")}
                        </PrimaryButton>
                        {!isEmpty(data.image) && (
                            <div>
                                <DangerButton
                                    className="align-content-center"
                                    onClick={() =>
                                        setData({
                                            ...data,
                                            image: null,
                                            imageBaseCode: "",
                                        })
                                    }
                                >
                                    {t("dash.prof.upd.rmv-btn")}
                                </DangerButton>
                            </div>
                        )}
                    </div>
                </form>
            </section>
        </>
    );
}
