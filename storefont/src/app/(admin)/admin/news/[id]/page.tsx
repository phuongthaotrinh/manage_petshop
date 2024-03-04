'use client';

import React from "react";
import {PageHeader, PageHeaderDescription, PageHeaderHeading, PageHeaderShell} from "@/components/common/page-header";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {newsSchema, intialValue, InferNews} from "@/validations/news";
import {NewsForm} from "@/components/forms/news-form";
import {Shell} from "@/components/shells/shell";
import {toast} from "react-hot-toast";
import {catchError, setValuesOfForm} from "@/lib/helpers";
import { useGetPostById, useUpdatePost} from "@/actions/queries/news";
import {ShellAction} from "@/components/common/shell-action";
import {useRouter} from "next/navigation";
import NewsSkeLoading from "@/components/skeletons/news-ske";


interface IParams{
        params: {id: string}
}

interface Option {
    readonly label: string;
    readonly value: string;
}

export default function NewsPage({params}:IParams) {
    const router = useRouter();

    const {data:postDetail, isPending} = useGetPostById(params.id);
    const {mutateAsync} = useUpdatePost(params.id)

    const [isCreateMode, setIsCreateMode] = React.useState<boolean>(false);
    const [images, setImages] = React.useState<string[]>([]);
    const [content, setContent] = React.useState<string>("");
    const [tags, setTags] = React.useState<readonly Option[]>([]);
    const [_, startTransition] = React.useTransition()

    const form = useForm<InferNews>({
        resolver: zodResolver(newsSchema),
        defaultValues:postDetail ? postDetail : intialValue
    });

    const onSubmit = (values:any) =>{
            values.tags = tags as Option[];
            values.content = content;
            values.images = images;
            values.id = params.id;
            values.user_id ="65a7a0caa86e9068034a22ee";
            startTransition(() => {
               toast.promise(mutateAsync(values), {
                   loading: "Loading...",
                   success: "success",
                   error:(err) => catchError(err)
               })
            })
    }

    React.useEffect(() => {
        if(postDetail) {
            setImages(postDetail?.images);
            setContent(postDetail?.content);
            setTags(postDetail?.tags);
            setValuesOfForm(postDetail, form)
        }
    },[postDetail])

    const reset = () =>{
        form.reset(intialValue);
        setImages([])
        setContent("");
        setTags([])
    }



    {isPending && <NewsSkeLoading />}
        return (
            <Shell variant="sidebar" as="div">
                <PageHeaderShell separated>
                    <PageHeader className="flex-1">
                        <PageHeaderHeading size="sm">Update News</PageHeaderHeading>
                        <PageHeaderDescription size="sm">
                            Manage your news
                        </PageHeaderDescription>
                    </PageHeader>
                        <ShellAction actionName="Back" actionVoid={() => router.back()} />
                </PageHeaderShell>
                   <NewsForm form={form} onSubmit={onSubmit} tags={tags}
                             setTags={setTags} content={content} setContent={setContent}
                             reset={reset} images={images} setImages={setImages}
                             isPending={isPending}
                             mode="detail"
                             params={params.id}
                   />
            </Shell>
        )
}