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

export default function UpdateProfileInformation({
    mustVerifyEmail,
    status,
    className = "",
}) {
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
            pending: "Updating...",
            success: {
                render({ data }) {
                    setData(data);
                    setProcessing(false);
                    return "Your information has been successfully saved.";
                },
            },
            error: {
                render({ data }) {
                    if (data.response && data.response.status === 404) {
                        return "User not found";
                    } else {
                        return "Unfortunately, there is a problem in the process of updating your information.";
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
                    Drag and drop an image here, or click to select a file
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
                        Profile Information
                    </h2>

                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        Update your account's profile information and email
                        address.
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

                        {/* <InputError className="mt-2" message={errors.name} /> */}
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

                        {/* <InputError className="mt-2" message={errors.email} /> */}
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

                        {/* <InputError
                            className="mt-2"
                            message={errors.jobTitle}
                        /> */}
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
                        {/* <InputError className="mt-2" message={errors.about} /> */}
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
                                Your email address is unverified.
                                <Link
                                    href={route("verification.send")}
                                    method="post"
                                    as="button"
                                    className="underline text-sm text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:focus:ring-offset-gray-800"
                                >
                                    Click here to re-send the verification
                                    email.
                                </Link>
                            </p>

                            {status === "verification-link-sent" && (
                                <div className="mt-2 font-medium text-sm text-green-600 dark:text-green-400">
                                    A new verification link has been sent to
                                    your email address.
                                </div>
                            )}
                        </div>
                    )}

                    <div className="flex items-center gap-4">
                        <PrimaryButton disabled={processing}>
                            Save
                        </PrimaryButton>
                    </div>
                </form>
            </section>
        </>
    );
}
