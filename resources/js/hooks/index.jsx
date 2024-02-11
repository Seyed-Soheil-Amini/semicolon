import { isEmpty } from "lodash";
import * as api from "../api";

import {
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery,
} from "react-query";

const useAllBlogs = (id) => {
    return useQuery("blogs", () => api.getAllBlogsOfUser(id), {
        refetchInterval: 10 * 60000,
        refetchOnWindowFocus: false,
        refetchOnMount: false,
        retryOnMount: false,
    });
};

const useVerifiedBlogs = (id) => {
    return useQuery("verifiedBlogs", () => api.getVerifiedBlogsOfUser(id));
};

const useBlockedBlogs = (id) => {
    return useQuery("blockedBlogs", () => api.getBlockedBlogsOfUser(id));
};

const useCreateBlog = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (blog) => api.createBlog(blog),
        onSuccess: (data) => {
            const blogs = queryClient.getQueryData("blogs");
            if (isEmpty(blogs)) queryClient.refetchQueries("blogs");
            else queryClient.setQueryData("blogs", [...blogs, data.data]);
        },
    });
};

const useUpdateBlog = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (blog) => api.updateBlog(blog),
        onSuccess: () => {
            queryClient.refetchQueries("blogs");
        },
    });
};

const useDeleteBlog = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => api.deleteBlog(id),
        onSuccess: () => {
            queryClient.refetchQueries("blogs");
        },
    });
};

const useTogglePublish = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => api.togglePublishBlog(id),
        onSuccess: () => {
            queryClient.refetchQueries("blogs");
        },
    });
};

const useGetCategories = () => {
    return useQuery("categories", api.getCategories, {
        refetchInterval: 15 * 60000,
        refetchOnWindowFocus: false,
    });
};

const useGetPendingBlogs = () => {
    return useQuery("pendingBlogs", api.getPendingBlogs, {
        refetchInterval: 5 * 60000,
        refetchOnWindowFocus: false,
    });
};

const useVerifyBlogs = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (ids) => api.verifyBlogs(ids),
        onSuccess: () => {
            queryClient.refetchQueries("pendingBlogs");
        },
    });
};

const useBlockBlogs = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (ids) => api.blockBlogs(ids),
        onSuccess: () => {
            queryClient.refetchQueries("pendingBlogs");
        },
    });
};

const useRandomBlogs = (filter) => {
    const queryClient = useQueryClient();
    var blogs = Object;
    var queryKey = "";
    switch (filter) {
        case "oldest":
            blogs = queryClient.getQueryData("oldestBlogs");
            queryKey = "oldestBlogs";
            break;
        case "popular":
            blogs = queryClient.getQueryData("popularBlogs");
            queryKey = "popularBlogs";
            break;
        case "newest":
            blogs = queryClient.getQueryData("newestBlogs");
            queryKey = "newestBlogs";
            break;
        default:
            blogs = queryClient.getQueryData("randomBlogs");
            queryKey = "randomBlogs";
            break;
    }
    return useInfiniteQuery({
        queryKey: [queryKey],
        queryFn: (pageParam) => api.getRandomBlogs(pageParam, filter),
        getNextPageParam: (lastPage, pages) => lastPage.next_cursor,
        refetchOnReconnect: true,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        retryOnMount: false,
        keepPreviousData: true,
    });
};

const useAddView = (fp, blogId) => {
    return api.addView(fp, blogId);
};

const useToggleLike = (blogId, fingerprint) => {
    return api.toggleLike(blogId, fingerprint);
};

const useGetUserActivity = (userId) => {
    return useQuery("userActivity", () => api.getUserActivity(userId), {
        refetchInterval: 5 * 60000,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        retryOnMount: false,
    });
};

const useGetUsers = () => {
    return useQuery("users", () => api.getUsersForAdmin(), {
        refetchInterval: 5 * 60000,
        refetchOnWindowFocus: false,
        refetchOnMount: true,
        retryOnMount: false,
    });
};

const useDeleteUsers = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (usersId) => api.deleteUsers(usersId),
        onSuccess: () => {
            queryClient.refetchQueries("users");
        },
    });
};

const useUpdateUser = (user) => {
    return api.updateUser(user);
};

const useStoreMessage = (message) => {
    return api.createMessage(message);
};

const useGetMessages = () => {
    return useInfiniteQuery({
        queryKey: ["messages"],
        queryFn: (pageParam) => api.getMessages(pageParam),
        getNextPageParam: (lastPage, pages) => lastPage.next_cursor,
        refetchOnReconnect: true,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        retryOnMount: false,
        keepPreviousData: true,
        refetchInterval: 10 * 60000,
    });
};

const useDeleteMessages = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (ids) => api.deleteMessages(ids),
        onSuccess: () => {
            queryClient.refetchQueries("messages");
        },
    });
};

const useSendOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (order) => api.sendOrder(order),
        onSuccess: (data) => {
            const orders = queryClient.getQueryData("orders");
            if (isEmpty(orders)) queryClient.refetchQueries("orders");
            else queryClient.setQueryData("orders", [...orders, data.data]);
        },
    });
};

const useUpdateOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (order, id) => api.updateOrder(order, id),
        onSuccess: (data) => {
            queryClient.refetchQueries("orders");
        },
    });
};

const useDeleteOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => api.deleteOrder(id),
        onSuccess: (data) => {
            queryClient.refetchQueries("orders");
        },
    });
};

const useRandomOrders = (expertise) => {
    const queryClient = useQueryClient();
    var orders = Object;
    var queryKey = "";
    switch (expertise) {
        case "soft":
            blogs = queryClient.getQueryData("softOrders");
            queryKey = "softOrders";
            break;
        case "server":
            blogs = queryClient.getQueryData("serverOrders");
            queryKey = "serverOrders";
            break;
        case "ai":
            blogs = queryClient.getQueryData("aiOrders");
            queryKey = "aiOrders";
            break;
        default:
            blogs = queryClient.getQueryData("gaveOrders");
            queryKey = "gaveOrders";
            break;
    }
    return useInfiniteQuery({
        queryKey: [queryKey],
        queryFn: (pageParam) => api.getRandomOrders(pageParam, expertise),
        getNextPageParam: (lastPage, pages) => lastPage.next_cursor,
        refetchOnReconnect: true,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        retryOnMount: false,
        keepPreviousData: true,
    });
};

const useCreateProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (project) => api.createProject(project),
        onSuccess: (data) => {
            const projects = queryClient.getQueryData("projects");
            if (isEmpty(projects)) queryClient.refetchQueries("projects");
            else queryClient.setQueryData("projects", [...projects, data.data]);
        },
    });
};

const useCompleteProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id, rate) => api.completeProject(id, rate),
        onSuccess: (data) => {
            const projects = queryClient.getQueryData("projects");
            if (isEmpty(projects)) queryClient.refetchQueries("projects");
            else {
                const project = projects.map((prj) => prj.id != id);
                queryClient.setQueriesData("projects", project);
            }
        },
    });
};

const useCreateMailbox = () => {
    return api.createMailbox();
};

const useGetOrdersOfUser = () => {
    const queryKey = "ordersOfUser";
    return useInfiniteQuery({
        queryKey: [queryKey],
        queryFn: (pageParam) => api.getAllOrders(pageParam),
        getNextPageParam: (lastPage, pages) => lastPage.next_cursor,
        refetchOnReconnect: true,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        retryOnMount: false,
        keepPreviousData: true,
    });
};

const useSendPaid = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (staffId, prjTitle) => api.sendPaidMail(staffId, prjTitle),
        onSuccess: (data) => {
            queryClient.refetchQueries("mails");
        },
    });
};

const useReadMail = (id) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => api.readMail(id),
        onSuccess: (data) => {
            const mails = queryClient.getQueryData("mails");
            const otherMails = mails.map((mail) => mail.id != id);
            const readMail = mails.map((mail) => mail.id == id)[0];
            readMail.isRead = true;
            queryClient.removeQueries("mails");
            queryClient.setQueriesData("mails", [...otherMails, readMail]);
        },
    });
};

export {
    useAllBlogs,
    useVerifiedBlogs,
    useBlockedBlogs,
    useCreateBlog,
    useUpdateBlog,
    useDeleteBlog,
    useTogglePublish,
    useGetCategories,
    useGetPendingBlogs,
    useVerifyBlogs,
    useBlockBlogs,
    useRandomBlogs,
    useAddView,
    useToggleLike,
    useGetUserActivity,
    useGetUsers,
    useDeleteUsers,
    useUpdateUser,
    useStoreMessage,
    useGetMessages,
    useDeleteMessages,
    useSendOrder,
    useDeleteOrder,
    useUpdateOrder,
    useRandomOrders,
    useCreateProject,
    useCompleteProject,
    useCreateMailbox,
    useGetOrdersOfUser,
    useSendPaid,
    useReadMail,
};
