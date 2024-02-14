import axios from "axios";
import { isEmpty } from "lodash";
const client = axios.create({
    baseURL: `${location.origin}/api`,
});

const getAllBlogsOfUser = async (id) => {
    const apiUrl = `/blogs/user/${id}`;
    const { data } = await client.get(apiUrl);
    return data.data;
};

const getVerifiedBlogsOfUser = async (id) => {
    const apiUrl = `/blogs/published/user/${id}`;
    const { data } = await client.get(apiUrl);
    return data;
};

const getBlockedBlogsOfUser = async (id) => {
    const apiUrl = `/blogs/blocked/user/${id}`;
    const { data } = await client.get(apiUrl);
    return data;
};

const createBlog = async (blog) => {
    const apiUrl = `/blogs/store`;
    const categoryId = blog.category.value;
    const dataBlogs = new FormData();
    dataBlogs.append("title", blog.title);
    dataBlogs.append("body", blog.body);
    dataBlogs.append("labels", JSON.stringify(blog.labels));
    if (!isEmpty(blog.imageBaseCode)) {
        typeof blog.image === "object" && dataBlogs.append("image", blog.image);
    }
    dataBlogs.append("_method", "POST");
    dataBlogs.append("categoryId", categoryId);
    const { data } = await client.post(apiUrl, dataBlogs, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return data;
};

const updateBlog = async (blog) => {
    const apiUrl = `/blogs/${blog.id}`;
    const categoryId = blog.category.value;
    const dataBlogs = new FormData();
    dataBlogs.append("title", blog.title);
    dataBlogs.append("body", blog.body);
    dataBlogs.append("labels", JSON.stringify(blog.labels));
    if (!isEmpty(blog.imageBaseCode)) {
        typeof blog.image === "object" && dataBlogs.append("image", blog.image);
    } else {
        if (!isEmpty(blog.image)) {
            dataBlogs.append("noChangeImage", true);
        }
    }
    dataBlogs.append("_method", "PUT");
    dataBlogs.append("categoryId", categoryId);
    const { data } = await client.post(apiUrl, dataBlogs, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
    return data;
};

const deleteBlog = async (id) => {
    const apiUrl = `/blogs/${id}`;
    const { data } = await client.delete(apiUrl);
    return data;
};

const getCategories = async () => {
    const apiUrl = `/categories/`;
    const { data } = await client.get(apiUrl, {
        withCredentials: true,
    });
    const preparedResponse = data.data.map((category) => ({
        value: category.id,
        label: category.name,
    }));
    return preparedResponse;
};

const togglePublishBlog = async (id) => {
    const apiUrl = `/blogs/publish/toggle/${id}`;
    const { data } = await client.get(apiUrl);
    return data;
};

const getPendingBlogs = async () => {
    const apiUrl = `/blogs/admin/verification`;
    const { data } = await client.get(apiUrl);
    return data.data;
};

const verifyBlogs = async (ids) => {
    const apiUrl = `/blogs/admin/verify`;
    const { data } = await client.post(apiUrl, { blogIds: ids });
    return data.data;
};

const blockBlogs = async (ids) => {
    const apiUrl = `/blogs/admin/block`;
    const { data } = await client.post(apiUrl, { blogIds: ids });
    return data.data;
};

const getRandomBlogs = async ({ pageParam = 0 }, filter) => {
    const apiUrl = `/randomBlogs/${filter}?cursor=${pageParam}`;
    const { data } = await client.get(apiUrl);
    return data.data;
};

const addView = async (fp, blogId) => {
    const apiUrl = `/blog/view/${blogId}/${btoa(fp)}`;
    const { data } = await client.get(apiUrl);
    return data.data;
};

const toggleLike = async (blogId, fingerprint) => {
    const apiUrl = `blog/like/${blogId}/${btoa(fingerprint)}`;
    const { data } = await client.get(apiUrl);
    return data.data;
};

const getUserActivity = async (userId) => {
    const apiUrl = `user/activity/${userId}`;
    const { data } = await client.get(apiUrl);
    return data.data;
};

const getUsersForAdmin = async () => {
    const apiUrl = `admin/users`;
    const { data } = await client.get(apiUrl);
    return data.data;
};

const deleteUsers = async (ids) => {
    const apiUrl = `admin/delete/user`;
    const dataUsers = new FormData();
    dataUsers.append("usersId", JSON.stringify(ids));
    dataUsers.append("_method", "DELETE");
    const { data } = await client.post(apiUrl, dataUsers);
    return data.data;
};

const updateUser = async (user) => {
    const apiUrl = `user/update`;
    const dataUser = new FormData();
    dataUser.append("name", user.name);
    dataUser.append("email", user.email);
    dataUser.append("jobTitle", user.jobTitle);
    dataUser.append("about", user.about);
    if (!isEmpty(user.imageBaseCode))
        typeof user.image === "object" && dataUser.append("image", user.image);
    else {
        if (!isEmpty(user.image)) dataUser.append("noChangeImage", true);
    }
    dataUser.append("_method", "PATCH");
    const { data } = await client.post(apiUrl, dataUser, {
        headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json, */*",
        },
    });
    return data.data;
};

const createMessage = async (message) => {
    const apiUrl = `message/store`;
    const { data } = await client.post(apiUrl, message);
    return data.data;
};

const getMessages = async ({ pageParam = 0 }) => {
    const apiUrl = `/message/index/?cursor=${pageParam}`;
    const { data } = await client.get(apiUrl);
    return data.data;
};

const deleteMessages = async (ids) => {
    const apiUrl = "/message/delete";
    const mesIds = new FormData();
    mesIds.append("messageIds", JSON.stringify(ids));
    mesIds.append("_method", "DELETE");
    const { data } = await client.post(apiUrl, mesIds);
    return data.data;
};

const sendOrder = async (order) => {
    const apiUrl = "/order";
    const { data } = await client.post(apiUrl, order, {
        headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json, */*",
        },
    });
    console.log(data);
    return data.data;
};

const updateOrder = async (order, id) => {
    const apiUrl = "/order/update";
    const dataOrder = new FormData();
    dataOrder.append("title", order.title);
    dataOrder.append("description", order.description);
    dataOrder.append("minimumPrice", order.minimumPrice);
    dataOrder.append("maximumPrice", order.maximumPrice);
    dataOrder.append("duration", order.duration);
    dataOrder.append("id", id);
    dataOrder.append("_method", "PUT");
    const { data } = await client.post(apiUrl, dataOrder, {
        headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json, */*",
        },
    });
    console.log(data);
    return data.data;
};

const deleteOrder = async (id) => {
    const apiUrl = "/order/remove";
    const removeOrder = new FormData();
    removeOrder.append("id", id);
    removeOrder.append("_method", "DELETE");
    const { data } = await client.post(apiUrl, removeOrder, {
        headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json, */*",
        },
    });
    console.log(data);
    return data.data;
};

const getRandomOrders = async ({ pageParam = 0 }, expertise) => {
    const apiUrl = `/staff/orders/${expertise}?cursor=${pageParam}`;
    const { data } = await client.get(apiUrl);
    return data.data;
};

const createProject = async (project) => {
    const apiUrl = "/project/";
    const { data } = await client.post(apiUrl, project, {
        headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json, */*",
        },
    });
    console.log(data);
    return data.data;
};

const completeProject = async (id, rate) => {
    const apiUrl = `/project/complete/${btoa(id)}/${rate}`;
    const { data } = await client.get(apiUrl);
    console.log(data);
    return data.data;
};

const createMailbox = async () => {
    const apiUrl = `/mailbox/`;
    const { data } = await client.get(apiUrl);
    console.log(data);
    return data.data;
};

const getAllOrders = async ({ pageParam = 0 }) => {
    const apiUrl = `/order/show?cursor=${pageParam}`;
    const { data } = await client.get(apiUrl);
    console.log(data);
    return data.data;
};

const sendPaidMail = async (staffId, prjTitle) => {
    const apiUrl = "/mail/paid";
    const { data } = await client.post(apiUrl, { staffId, prjTitle });
    console.log(data);
    return data.data;
};

const readMail = async (id) => {
    const apiUrl = `/mail/read/${id}`;
    const { data } = await client.get(apiUrl);
    console.log(data);
    return data;
};

const checkOrderAccetable = async (id) => {
    const apiUrl = `/order/check-accept/${btoa(id)}`;
    const { data } = await client.get(apiUrl);
    console.log(data);
    return data.data;
};

const getInfoOfStaff = async (id) => {
    const apiUrl = `/staff/info/${btoa(id)}`;
    const { data } = await client.get(apiUrl);
    console.log(data);
    return data.data;
};

const paidPrePayment = async (id) => {
    const apiUrl = `/project/pre-payment/${btoa(id)}`;
    const { data } = await client.get(apiUrl);
    console.log(data);
    return data.data;
};

const removeProject = async (id) => {
    const apiUrl = `/project/remove/${id}`;
    const { data } = await client.delete(apiUrl);
    console.log(data);
    return data.data;
};

const checkRemainingTime = async (id) => {
    const apiUrl = `/project/remaining-time/${btoa(id)}`;
    const { data } = await client.get(apiUrl);
    console.log(data);
    return data.data;
};

const getMails = async (id) => {
    const apiUrl = `/mailbox/get-mails/${btoa(id)}`;
    const { data } = await client.get(apiUrl);
    console.log(data);
    return data.data;
};

const upgradeToStaff = async (ids) => {
    const apiUrl = `/superadmin/upgrade/staff`;
    const userIds = new FormData();
    userIds.append("userIds", JSON.stringify(ids));
    userIds.append("_method", "PUT");
    const { data } = await client.post(apiUrl, userIds, {
        headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json, */*",
        },
    });
    console.log(data);
    return data.data;
};

const downgradeFromStaff = async (id) => {
    const apiUrl = `/superadmin/downgrade/staff/${btoa(id)}`;
    const { data } = await client.get(apiUrl);
    console.log(data);
    return data.data;
};

const upgradeToAdmin = async (ids) => {
    const apiUrl = `/admin/upgrade`;
    const dataForm = new FormData();
    dataForm.append("userId", JSON.stringify(ids));
    dataForm.append("_method", "PUT");
    const { data } = await client.post(apiUrl, dataForm, {
        headers: {
            "Content-Type": "multipart/form-data",
            Accept: "application/json, */*",
        },
    });
    console.log(data);
    return data.data;
};

const downgradeFromAdmin = async (id) => {
    const apiUrl = `/admin/downgrade/${btoa(id)}`;
    const { data } = await client.get(apiUrl);
    console.log(data);
    return data.data;
};

const getAllProject = async ({ pageParam = 0 }) => {
    const apiUrl = `/project/all?curser=${pageParam}`;
    const { data } = await client.get(apiUrl);
    console.log(data);
    return data.data;
};

export {
    getAllBlogsOfUser,
    getVerifiedBlogsOfUser,
    getBlockedBlogsOfUser,
    createBlog,
    updateBlog,
    deleteBlog,
    getCategories,
    togglePublishBlog,
    getPendingBlogs,
    verifyBlogs,
    blockBlogs,
    getRandomBlogs,
    addView,
    toggleLike,
    getUserActivity,
    getUsersForAdmin,
    deleteUsers,
    updateUser,
    createMessage,
    getMessages,
    deleteMessages,
    sendOrder,
    updateOrder,
    deleteOrder,
    getRandomOrders,
    createProject,
    completeProject,
    createMailbox,
    getAllOrders,
    sendPaidMail,
    readMail,
    checkOrderAccetable,
    getInfoOfStaff,
    paidPrePayment,
    removeProject,
    checkRemainingTime,
    getMails,
    upgradeToStaff,
    downgradeFromStaff,
    upgradeToAdmin,
    downgradeFromAdmin,
    getAllProject,
};
