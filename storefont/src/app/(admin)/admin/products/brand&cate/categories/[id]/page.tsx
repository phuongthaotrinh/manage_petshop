'use client'
import {Shell} from "@/components/shells/shell";
import {PageHeader, PageHeaderDescription, PageHeaderHeading, PageHeaderShell} from "@/components/common/page-header";
import * as React from "react";
import {useParams} from "next/navigation"
import {BrandForms} from "@/components/forms/brand-form";
import {toast} from "react-hot-toast";
import {useForm} from "react-hook-form";
import {brandValidType, defaultBrand, formSchema} from "@/validations/brands";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    useCreateBrand,
    useCreateCategory,
    useGetBrandsDetail, useGetCategoryDetail,
    useUpdateBrand, useUpdateCategory
} from "@/actions/queries/brand&categories";
import {startTransition} from "react";
import {catchError, setValuesOfForm} from "@/lib/helpers";

export default function BrandCreateOrUpdate(){
    const {id} = useParams();
    const [images, setImages]  = React.useState<string[]>([]);
    const { mutateAsync:createFn } = useCreateCategory();
    const {mutateAsync:updateFn} = useUpdateCategory()
    const {data, isPending} = useGetCategoryDetail(id.toString())

    const form = useForm<brandValidType>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultBrand
    })

    React.useEffect(() => {
        if(id !=="create" && data){
            setValuesOfForm(data, form);
            setImages(data?.images)
        }
    },[data, id])

    const onSubmit = (value:any) => {
        value.images = images
        if(id === "create") {
            startTransition(() => {
                toast.promise(createFn(value), {
                    loading: "Loading...",
                    success:() => {
                        form.reset();
                        setImages([])
                        return "Create success"
                    },
                    error:(err) => catchError(err)
                })
            })
        }else{
            startTransition(() => {
                toast.promise(updateFn({...value,id:id}), {
                    loading: "Updating...",
                    success:() => {
                        return "Update success"
                    },
                    error:(err) => catchError(err)
                })
            })
        }
    }
    return (
        <Shell variant="markdown" as="div">
            <PageHeaderShell separated>
                <PageHeader className="flex-1">
                    <PageHeaderHeading size="sm">Categories</PageHeaderHeading>
                    <PageHeaderDescription size="sm">
                        {id == "create" ? "Create" : `Update`} category
                    </PageHeaderDescription>
                </PageHeader>

            </PageHeaderShell>
            <BrandForms form={form} onSubmit={onSubmit} images={images} setImages={setImages} />
        </Shell>
    )
}