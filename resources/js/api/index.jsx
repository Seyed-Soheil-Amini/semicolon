import axios from "axios";
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
    const apiUrl = "/blogs/";
    const categoryId = blog.category.value;
    const requestData = {
        title: blog.title,
        body: blog.body,
        categoryId: categoryId,
        labels: blog.labels,
        image: blog.image || null,
    };
    const { data } = await client.post(apiUrl, requestData, {
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
    typeof blog.image === "object" && dataBlogs.append("image", blog.image);
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

const addView = async (ip, blogId) => {
    const apiUrl = `/blog/view/${blogId}`;
    const { data } = await client.get(apiUrl);
    return data.data;
};

const toggleLike = async (blogId)=>{
    const apiUrl = `blog/like/${blogId}`;
    const {data} = await client.get(apiUrl);
    return data.data;
}

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
};
