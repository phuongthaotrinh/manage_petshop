'use client'
import * as React from "react";
import Pusher from "pusher-js";
import {toast} from "react-hot-toast";
import {useQueryClient} from "@tanstack/react-query";
import {useRouter} from "next/navigation";
import { ArrowRightCircle } from 'lucide-react';
import {QUERY_KEYS} from "@/actions/queryKeys";

let pusher = new Pusher(process.env.NEXT_PUBLIC_PUSHER_KEY!!, {
    cluster: process.env.NEXT_PUBLIC_PUSHER_CLUSTER!!
});

export default function PusherProviders({children}: { children: React.ReactNode }) {

    const queryClient = useQueryClient();

    // React.useEffect( () => {
    //
    //         let channel = pusher.subscribe("my-channel");
    //
    //         channel.bind("my-event",  function (data: any) {
    //             queryClient.fetchQuery({
    //                 queryKey: [QUERY_KEYS.SERVICES__GET_ALL_SERVICE_OF_PETS]
    //             });
    //             if(data?.message){
    //                 toast.custom((t) => (
    //                     <div
    //                         className={`${
    //                             t.visible ? 'animate-enter' : 'animate-leave'
    //                         } max-w-md w-full bg-white shadow-lg rounded-lg pointer-events-auto flex ring-1 ring-black ring-opacity-5`}
    //                     >
    //                         <div className="flex-1 w-0 p-4">
    //                             <div>
    //                                 <div className="ml-3 flex-1">
    //                                     <p className="text-sm font-medium text-gray-900">
    //                                         New update price of pet service
    //                                     </p>
    //                                     <p className="mt-1 text-sm text-gray-500">
    //                                        Checkout now!
    //                                     </p>
    //                                 </div>
    //                             </div>
    //                         </div>
    //                         <div className="flex border-l border-gray-200">
    //                             <button
    //                                 onClick={() => toast.dismiss(t.id)}
    //                                 className="w-full border border-transparent rounded-none rounded-r-lg p-4 flex items-center justify-center text-sm font-medium text-indigo-600 hover:text-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
    //                             >
    //                                 Close
    //                             </button>
    //                         </div>
    //                     </div>
    //                 ))
    //             }
    //         });
    //
    //
    //
    //
    //         return () => {
    //             pusher.unsubscribe("my-channel");
    //         };
    //
    // },[])

    return (
        <>
            {children}
        </>
    )
}