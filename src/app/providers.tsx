"use client";

import { trpc } from "@/utils/trpc";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import { useState } from "react";
import superjson from "superjson";

export function TRPCProvider({ children }: { children: React.ReactNode }) {
    const [queryClient] = useState(() => new QueryClient());
    const [trpcClient] = useState(() =>
        (trpc as any).createClient({
            transformer: superjson,
            links: [
                httpBatchLink({
                    url: "/api/trpc",
                }),
            ],
        })
    );

    const TRPC = trpc as any;

    return (
        <TRPC.Provider client={trpcClient} queryClient={queryClient}>
            <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
        </TRPC.Provider>
    );
}
