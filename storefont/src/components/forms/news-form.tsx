'use client';

import {Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Button} from "@/components/ui/button";
import {Uploads} from "@/components/common/uploads";
import {RenderImage} from "@/components/common/render-image";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {CreatableInput} from "@/components/common/creatable-input";
import {Switch} from "@/components/ui/switch";
import {TextEditor} from "@/components/common/text-editor";
import React, {startTransition} from "react";
import {Icons} from "@/components/common/icon";
import {toast} from "react-hot-toast";
import {catchError} from "@/lib/helpers";
import {useDeletePost} from "@/actions/queries/news";
import {useRouter} from "next/navigation";

interface IParams {
    form:any,
    onSubmit:any,
    tags:any,
    setTags:any,
    content:any,
    setContent:any,
    reset:any,
    images:any,
    setImages:any,
    isPending?:any,
    mode?:"create" | "detail",
    params?:string
}
export function NewsForm ({form,onSubmit,tags,setTags,content,setContent,reset,images,setImages,isPending,mode,params}:IParams) {
    const router = useRouter();
    const {mutateAsync} = useDeletePost()



    return (
        <>
           <Form {...form} >
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                                <div className="flex items-center gap-3">
                                    {mode == "detail" && params && (
                                        <Button
                                            type="button"
                                            variant="destructive"
                                            disabled={isPending}
                                            onClick={()  => {

                                                startTransition(() => {
                                                    toast.promise(mutateAsync({postId:params}),{
                                                        loading:"deleting...",
                                                        success:() => {
                                                            router.back()
                                                           return "delete success!"
                                                        },
                                                        error:(err) => catchError(err)
                                                    })
                                                })
                                            }}

                                        >
                                            {isPending && <Icons.spinner/>}Delete
                                        </Button>
                                    )}
                                    <Button
                                        type="submit"
                                        className="shad-button_primary whitespace-nowrap"
                                        disabled={isPending}
                                    >
                                        {isPending && <Icons.spinner/>}Submit
                                    </Button>
                                    <Button
                                        type="button"
                                        variant="outline"
                                        disabled={isPending}
                                        onClick={() => reset()}
                                    >
                                        {isPending && <Icons.spinner/>}Reset
                                    </Button>

                                </div>
                                <div className="grid md:grid-cols-2 sx:grid-cols-1 gap-6">
                                    <div className="space-y-3 ">
                                        <FormField
                                            control={form.control}
                                            name="images"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Media</FormLabel>
                                                    <div>
                                                        <Uploads value={images} max={2} onChange={(value:any) => {
                                                            if (value !== null && value !== undefined) {
                                                                const newImages = [...images, value] as any
                                                                setImages(newImages);
                                                            }
                                                        }} />
                                                    </div>
                                                    <RenderImage images={images} setImages={setImages} isPreviewMode={false} />
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Post name </FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="Tên người đặt lịch" {...field} />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />


                                        <FormField
                                            control={form.control}
                                            name="preview"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Preview</FormLabel>
                                                    <FormControl>
                                                        <Textarea
                                                            placeholder="Tell us a little bit about yourself"
                                                            className="resize-none"
                                                            {...field}
                                                        />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="tags"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Post Tag </FormLabel>
                                                        <CreatableInput value={tags} setValue={setTags}  />
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                    <div className="space-y-3">
                                        <FormField
                                            control={form.control}
                                            name="status"
                                            render={({ field }) => (
                                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                                    <div className="space-y-0.5">
                                                        <FormLabel>Post status</FormLabel>
                                                        <FormDescription>
                                                            If status is true, this post will render in client page
                                                        </FormDescription>
                                                    </div>
                                                    <FormControl>
                                                        <Switch
                                                            checked={field.value}
                                                            onCheckedChange={field.onChange}
                                                        />
                                                    </FormControl>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="content"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Post content </FormLabel>
                                                    <TextEditor content={content} setContent={setContent}/>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />


                                    </div>
                                </div>

                            </form>
                        </Form>
        </>
    )
}