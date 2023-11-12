import { isEmpty } from "lodash";
import axios from "axios";
import { useQuery, useQueryClient, useMutation, useInfiniteQuery } from "react-query";
const client = axios.create({
  baseURL: `${location.origin}/api`
});
const getAllBlogsOfUser = async (id) => {
  const apiUrl = `/blogs/user/${id}`;
  const { data } = await client.get(apiUrl);
  return data.data;
};
const createBlog = async (blog) => {
  console.log(blog);
  const apiUrl = "/blogs/";
  const categoryId = blog.category.value;
  const requestData = {
    title: blog.title,
    body: blog.body,
    categoryId,
    labels: blog.labels,
    image: blog.image || null
  };
  const { data } = await client.post(apiUrl, requestData, {
    headers: {
      "Content-Type": "multipart/form-data"
    }
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
      "Content-Type": "multipart/form-data"
    }
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
    withCredentials: true
  });
  const preparedResponse = data.data.map((category) => ({
    value: category.id,
    label: category.name
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
const toggleLike = async (blogId) => {
  const apiUrl = `blog/like/${blogId}`;
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
    if (!isEmpty(user.image))
      dataUser.append("noChangeImage", true);
  }
  dataUser.append("_method", "PATCH");
  const { data } = await client.post(apiUrl, dataUser, {
    headers: {
      "Content-Type": "multipart/form-data",
      Accept: "application/json, */*"
    }
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
const useAllBlogs = (id) => {
  return useQuery("blogs", () => getAllBlogsOfUser(id), {
    refetchInterval: 10 * 6e4,
    refetchOnWindowFocus: false,
    refetchOnMount: false,
    retryOnMount: false
  });
};
const useCreateBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (blog) => createBlog(blog),
    onSuccess: (data) => {
      const blogs = queryClient.getQueryData("blogs");
      if (isEmpty(blogs))
        queryClient.refetchQueries("blogs");
      else
        queryClient.setQueryData("blogs", [...blogs, data.data]);
    }
  });
};
const useUpdateBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (blog) => updateBlog(blog),
    onSuccess: () => {
      queryClient.refetchQueries("blogs");
    }
  });
};
const useDeleteBlog = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => deleteBlog(id),
    onSuccess: () => {
      queryClient.refetchQueries("blogs");
    }
  });
};
const useTogglePublish = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id) => togglePublishBlog(id),
    onSuccess: () => {
      queryClient.refetchQueries("blogs");
    }
  });
};
const useGetCategories = () => {
  return useQuery("categories", getCategories, {
    refetchInterval: 15 * 6e4,
    refetchOnWindowFocus: false
  });
};
const useGetPendingBlogs = () => {
  return useQuery("pendingBlogs", getPendingBlogs, {
    refetchInterval: 5 * 6e4,
    refetchOnWindowFocus: false
  });
};
const useVerifyBlogs = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (ids) => verifyBlogs(ids),
    onSuccess: () => {
      queryClient.refetchQueries("pendingBlogs");
    }
  });
};
const useBlockBlogs = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (ids) => blockBlogs(ids),
    onSuccess: () => {
      queryClient.refetchQueries("pendingBlogs");
    }
  });
};
const useRandomBlogs = (filter) => {
  const queryClient = useQueryClient();
  var queryKey = "";
  switch (filter) {
    case "oldest":
      queryClient.getQueryData("oldestBlogs");
      queryKey = "oldestBlogs";
      break;
    case "popular":
      queryClient.getQueryData("popularBlogs");
      queryKey = "popularBlogs";
      break;
    case "newest":
      queryClient.getQueryData("newestBlogs");
      queryKey = "newestBlogs";
      break;
    default:
      queryClient.getQueryData("randomBlogs");
      queryKey = "randomBlogs";
      break;
  }
  return useInfiniteQuery({
    queryKey: [queryKey],
    queryFn: (pageParam) => getRandomBlogs(pageParam, filter),
    getNextPageParam: (lastPage, pages) => lastPage.next_cursor,
    refetchOnReconnect: true,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    retryOnMount: false,
    keepPreviousData: true
  });
};
const useAddView = (ip, blogId) => {
  return addView(ip, blogId);
};
const useToggleLike = (blogId) => {
  return toggleLike(blogId);
};
const useGetUserActivity = (userId) => {
  return useQuery("userActivity", () => getUserActivity(userId), {
    refetchInterval: 5 * 6e4,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    retryOnMount: false
  });
};
const useGetUsers = () => {
  return useQuery("users", () => getUsersForAdmin(), {
    refetchInterval: 5 * 6e4,
    refetchOnWindowFocus: false,
    refetchOnMount: true,
    retryOnMount: false
  });
};
const useDeleteUsers = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (usersId) => deleteUsers(usersId),
    onSuccess: () => {
      queryClient.refetchQueries("users");
    }
  });
};
const useUpdateUser = (user) => {
  return updateUser(user);
};
const useStoreMessage = (message) => {
  return createMessage(message);
};
const useGetMessages = () => {
  return useInfiniteQuery({
    queryKey: ["messages"],
    queryFn: (pageParam) => getMessages(pageParam),
    getNextPageParam: (lastPage, pages) => lastPage.next_cursor,
    refetchOnReconnect: true,
    refetchOnMount: true,
    refetchOnWindowFocus: false,
    retryOnMount: false,
    keepPreviousData: true,
    refetchInterval: 10 * 6e4
  });
};
const useDeleteMessages = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (ids) => deleteMessages(ids),
    onSuccess: () => {
      queryClient.refetchQueries("messages");
    }
  });
};
export {
  useAddView as a,
  useToggleLike as b,
  useUpdateBlog as c,
  useGetCategories as d,
  useAllBlogs as e,
  useDeleteBlog as f,
  useTogglePublish as g,
  useCreateBlog as h,
  useStoreMessage as i,
  useGetUserActivity as j,
  useGetMessages as k,
  useDeleteMessages as l,
  useUpdateUser as m,
  useGetUsers as n,
  useDeleteUsers as o,
  useGetPendingBlogs as p,
  useVerifyBlogs as q,
  useBlockBlogs as r,
  useRandomBlogs as u
};
