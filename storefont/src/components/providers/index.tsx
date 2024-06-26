
'use client'
import { QueryClient, QueryClientProvider, HydrationBoundary } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import * as React from 'react'
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental'

export function Providers(props: { children: React.ReactNode }) {
    const [queryClient] = React.useState(
        () =>
            new QueryClient({
                defaultOptions: {
                    queries: {
                        refetchOnMount:false,
                        refetchOnReconnect: false,
                        staleTime:3000,
                    },
                },
            }),
    )

    return (
        <QueryClientProvider client={queryClient}>
            <ReactQueryStreamedHydration>
                    {props.children}
            </ReactQueryStreamedHydration>
            <ReactQueryDevtools initialIsOpen={false} />
        </QueryClientProvider>
    )
}
