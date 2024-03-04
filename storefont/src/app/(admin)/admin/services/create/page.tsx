"use client"

import {ServiceForms} from "@/components/forms/service-forms";
import {PageHeader, PageHeaderDescription, PageHeaderHeading} from "@/components/common/page-header";
import * as React from "react";
import {DataTableSkeleton} from "@/components/common/data-table/components/data-table-skeleton";
import { Shell } from "@/components/shells/shell"
import toast from "react-hot-toast";
import {catchError} from "@/lib/helpers";
import {useCreateServices} from "@/actions/queries/services";
import {useForm} from "react-hook-form";
import {z} from "zod";
import {defaultVal, formSchema} from "@/validations/services";
import {zodResolver} from "@hookform/resolvers/zod";

export default function ServiceCreatePage() {
    const [isPending, startTransition] = React.useTransition();
    const {mutateAsync:createFn} = useCreateServices();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultVal
    })

    const onSubmit = (values:any) => {
        values.userId = "65b6815887653b571e30ccb3";
        startTransition(() => {
            toast.promise((createFn(values)),{
                loading:"Loading...",
                success:(data:any) => {
                    form.reset();
                    console.log("data", data)
                    return "Success!"
                },
                error:(err) => catchError(err)
            })
        })
    }
    return (
        <>
            <Shell variant="markdown" as="div">
                <PageHeader separated>
                    <PageHeaderHeading size="sm">Services</PageHeaderHeading>
                    <PageHeaderDescription size="sm">
                        Create new service
                    </PageHeaderDescription>
                </PageHeader>
                <React.Suspense fallback={<DataTableSkeleton columnCount={6} />}>
                    <ServiceForms onSubmit={onSubmit} mode="create" form={form}/>
                </React.Suspense>

            </Shell>
        </>
    )

}