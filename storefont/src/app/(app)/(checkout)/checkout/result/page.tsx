'use client';
import React,{useEffect} from "react";
import {getVnpayIpn} from "@/actions/queries/payment";
import {Shell} from "@/components/shells/shell";
import Link from "next/link";

export default function PaymentResultPage() {
    const urlSearchParams = new URLSearchParams(window.location.search);
    const queryParams = urlSearchParams.size !== 0 && Object.fromEntries(urlSearchParams.entries());
    const [data, setData]  = React.useState<{statusCode :string, message: string} | null>(null)

    useEffect(() => {
        if(queryParams && urlSearchParams && urlSearchParams.size !== 0) {
            (async () => {
                await getVnpayIpn(queryParams).then(({data}) => {
                    setData(data)
                })
            })()
        }
        else{
            setData({statusCode: "00", message: "Order success !"})
        }

    }, []);




    return (
        <Shell variant="sidebar">
            {data &&
                <>
                    <div className="grid place-items-center space-y-5">
                        *
                        {["00","07"].includes(data.statusCode) ?
                            <img src="/images/payment-success.jpg" alt="payment-success" className="h-72 object-cover"/>:
                            <img src="/images/payment-fail.jpg" alt="payment-success" className="h-72 object-cover"/>
                        }

                        <h3 className="font-bold text-2xl"> {data.message} </h3>
                        <p>
                            Go back <Link href="/" className="text-dreamOrange font-semibold text-lg hover:underline">Home</Link> or continue shopping
                        </p>
                    </div>
                </>
            }

        </Shell>
    )
}