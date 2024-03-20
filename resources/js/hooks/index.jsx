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
        onSuccess: () => {
            queryClient
                .getQueryCache()
                .getAll()
                .forEach((query) => {
                    if (
                        Array.isArray(query.queryKey) &&
                        query.queryKey[0] === "orderOfUser"
                    ) {
                        queryClient.refetchQueries(query.queryKey);
                    }
                });
        },
    });
};

const useUpdateOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (order) => api.updateOrder(order),
        onSuccess: () => {
            queryClient
                .getQueryCache()
                .getAll()
                .forEach((query) => {
                    if (
                        Array.isArray(query.queryKey) &&
                        query.queryKey[0] === "orderOfUser"
                    ) {
                        queryClient.refetchQueries(query.queryKey);
                    }
                });
        },
    });
};

const useDeleteOrder = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => api.deleteOrder(id),
        onSuccess: () => {
            queryClient
                .getQueryCache()
                .getAll()
                .forEach((query) => {
                    if (
                        Array.isArray(query.queryKey) &&
                        query.queryKey[0] === "orderOfUser"
                    ) {
                        queryClient.refetchQueries(query.queryKey);
                    }
                });
        },
    });
};

const useGetOrdersCat = (pageNumber, expertise) => {
    const queryKey = "ordersBasedOnCategory";
    return useQuery({
        queryKey: [queryKey, pageNumber],
        queryFn: () => api.getAllOrdersBasedOnCategory(pageNumber, expertise),
        keepPreviousData: true,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
    });
};

const useCreateProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (project) => api.createProject(project),
        onSuccess: (data) => {
            const projects = queryClient.getQueryData("projects");
            const orders = queryClient.getQueryData("ordersBasedOnCategory");
            if (isEmpty(projects)) queryClient.refetchQueries("projects");
            else queryClient.setQueryData("projects", [...projects, data.data]);
            if (isEmpty(projects))
                queryClient.refetchQueries("ordersBasedOnCategory");
            else
                queryClient.setQueryData("ordersBasedOnCategory", [
                    ...orders,
                    data.data,
                ]);
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

const useGetOrdersOfUser = (pageNumber) => {
    const queryKey = "orderOfUser";
    return useQuery({
        queryKey: [queryKey, pageNumber],
        queryFn: () => api.getAllOrdersOfUser(pageNumber),
        keepPreviousData: true,
        // refetchOnMount: true,
        // refetchOnWindowFocus: true,
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

const useCheckOrderAcceptable = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => api.checkOrderAccetable(id),
        onSuccess: (data) => {
            queryClient.refetchQueries("orders");
        },
    });
};

const useGetStaffInfo = (id) => {
    return api.getInfoOfStaff(id);
};

const usePaidPrePayment = (id) => {
    return api.paidPrePayment(id);
};

const useRemoveProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => api.removeProject(id),
        onSuccess: (data) => {
            queryClient.refetchQueries("projects");
        },
    });
};

const useCheckRemainingTime = (prjId) => {
    return useQuery({
        queryKey: `remainingTime-${prjId}`,
        queryFn: (id) => api.checkRemainingTime(id),
        refetchInterval: 2 * 60000,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    });
};

const useGetMails = () => {
    return useQuery({
        queryKey: "mails",
        queryFn: (id) => api.getMails(id),
        refetchInterval: 1 * 60000,
        refetchOnMount: true,
        refetchOnWindowFocus: true,
        refetchOnReconnect: true,
    });
};

const useUpgradeToStaff = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (ids) => api.upgradeToStaff(ids),
        onSuccess: (data) => {
            queryClient.refetchQueries("users");
        },
    });
};

const useDowngradeFromStaff = (id) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => api.downgradeFromStaff(id),
        onSuccess: (data) => {
            const users = queryClient.getQueryData("users");
            const otherusers = users.map((user) => user.id != id);
            const user = users.map((user) => user.id == id)[0];
            user.isStaff = false;
            queryClient.removeQueries("users");
            queryClient.setQueriesData("users", [...otherusers, user]);
        },
    });
};

const useUpgradeToAdmin = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (ids) => api.upgradeToAdmin(ids),
        onSuccess: (data) => {
            queryClient.refetchQueries("users");
        },
    });
};

const useDowngradeFromAdmin = (id) => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => api.downgradeFromAdmin(id),
        onSuccess: (data) => {
            const users = queryClient.getQueryData("users");
            const otherusers = users.map((user) => user.id != id);
            const user = users.map((user) => user.id == id)[0];
            user.isAdmin = false;
            queryClient.removeQueries("users");
            queryClient.setQueriesData("users", [...otherusers, user]);
        },
    });
};

const useGetAllProject = () => {
    const queryKey = "allProjects";
    return useInfiniteQuery({
        queryKey: [queryKey],
        queryFn: (pageParam) => api.getAllProject(pageParam),
        getNextPageParam: (lastPage, pages) => lastPage.next_cursor,
        refetchInterval: 10 * 60000,
        refetchOnReconnect: true,
        refetchOnMount: true,
        refetchOnWindowFocus: false,
        retryOnMount: false,
        keepPreviousData: true,
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
    useGetOrdersCat,
    useCreateProject,
    useCompleteProject,
    useCreateMailbox,
    useGetOrdersOfUser,
    useSendPaid,
    useReadMail,
    useCheckOrderAcceptable,
    useGetStaffInfo,
    usePaidPrePayment,
    useRemoveProject,
    useCheckRemainingTime,
    useGetMails,
    useUpgradeToStaff,
    useDowngradeFromStaff,
    useUpgradeToAdmin,
    useDowngradeFromAdmin,
    useGetAllProject,
};
