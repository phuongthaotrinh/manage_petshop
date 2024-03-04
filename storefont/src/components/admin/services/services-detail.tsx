'use client'

import {useGetDetailServiceById, useGetPets} from "@/actions/queries/services";
import * as React from "react";
import {ServiceForms} from "@/components/forms/service-forms";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {defaultVal, formSchema} from "@/validations/services";
import {zodResolver} from "@hookform/resolvers/zod";

export function ServicesDetailTemplate({ params }: { params: { service_id: string } }) {
    const { data, isLoading } = useGetDetailServiceById(params.service_id);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: data? data : defaultVal,

    });

    const onSubmit = async (values:any) => {
        values.userId = "65b6815887653b571e30ccb3";
        console.log('onSubmit',values)
    }

    return (
        <>
            {data && !isLoading ? (
                <div className="">
                   <ServiceForms mode="edit" data={data} form={form} onSubmit={onSubmit} />
                </div>
            ) : (
                <>Loadingg</>
            )}
        </>
    )
}
