import { isEmpty } from "lodash";
import * as api from "../api";

import {
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery,
} from "react-query";

import qs from "qs";

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
            queryClient.setQueryData("blogs", [...blogs, data.data]);
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
        refetchOnMount: false,
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
};
