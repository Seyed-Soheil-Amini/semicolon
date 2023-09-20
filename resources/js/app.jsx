import "./bootstrap";
import "../css/app.css";

import { createRoot } from "react-dom/client";
import { createInertiaApp } from "@inertiajs/react";
import { resolvePageComponent } from "laravel-vite-plugin/inertia-helpers";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false, 
            refetchOnReconnect:true,
            refetchOnMount:false,
            cacheTime: 1000 * 60 * 60 * 24 * 7,// a week
        },
    },
});

createInertiaApp({
    title: (title) => `${title}`,
    resolve: (name) =>
        resolvePageComponent(
            `./Pages/${name}.jsx`,
            import.meta.glob("./Pages/**/*.jsx")
        ),
    setup({ el, App, props }) {
        const root = createRoot(el);
        root.render(
            <QueryClientProvider client={queryClient} contextSharing={true}>
                <App {...props} />
                <ReactQueryDevtools />
            </QueryClientProvider>
        );
    },
    progress: {
        color: "#4B5563",
    },
});
