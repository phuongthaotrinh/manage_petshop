'use client';


import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import * as React from "react";
import {Uploads} from "@/components/common/uploads";
import {RenderImage} from "@/components/common/render-image";
import {useCreateStore, useGetStore,useUpdateStore} from "@/actions/queries/store";
import {toast} from "react-hot-toast";
import {catchError, setValuesOfForm} from "@/lib/helpers";
import {formSchema, defaultValues, storeValidType} from "@/validations/store"
import {useEffect} from "react";


export default function StoreInfoForm( ) {
    const [_,startTransition] = React.useTransition();
    const {data, isPending} = useGetStore();



    const form = useForm<storeValidType>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultValues
    })

    const [images, setImages] = React.useState<string[]>([])
    const [favicon, setFavicon] = React.useState<string[]>([])
    const {mutateAsync:create} = useCreateStore();
    const {mutateAsync:update} = useUpdateStore()
    const mapWatch = form.watch('map');

    useEffect(() => {
        if(data) {
            setValuesOfForm(data, form);
            setImages(data?.logo);
            setFavicon(data?.favicon)
        }
    }, [data]);

    function onSubmit(values:any) {
        values.logo = images;
        values.favicon = favicon;

       if(data) {
           startTransition(() => {
               toast.promise(update({...values, id: data?._id}) , {
                   loading: "Update.,,",
                   success: () => {
                       return "update success"
                   },
                   error:(err) => catchError(err)
               })
           })
       }else{
           startTransition(() => {
               toast.promise(create(values) , {
                   loading: "Creating.,,",
                   success: () => {
                       setImages([]);
                       setFavicon([]);
                       form.reset();
                       return "creat success"
                   },
                   error:(err) => catchError(err)
               })
           })
       }
    }

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Store Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="shadcn" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="desc"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Description</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Tell us a little bit about yourself"
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="address"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Address</FormLabel>
                                <FormControl>
                                    <Textarea
                                        placeholder="Tell us a little bit about yourself"
                                        className="resize-none"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="map"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>MAP</FormLabel>
                                <FormControl>
                                    <Textarea

                                        placeholder="Tell us a little bit about yourself"
                                        className="resize-none min-h-[100px]"

                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    {mapWatch && <div dangerouslySetInnerHTML={{__html:mapWatch}}>

                    </div>}
                    <FormField
                        control={form.control}
                        name="logo"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Logo</FormLabel>
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
                        name="favicon"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Favicon</FormLabel>
                                <div>
                                    <Uploads value={favicon} max={2} onChange={(value:any) => {
                                        if (value !== null && value !== undefined) {
                                            const newImages = [...favicon, value] as any
                                            setFavicon(newImages);
                                        }
                                    }} />
                                </div>
                                <RenderImage images={favicon} setImages={setFavicon} isPreviewMode={false} />
                                <FormMessage/>
                            </FormItem>
                        )}
                    />
                    <Button type="submit">Submit</Button>
                </form>
            </Form>

        </>
    )
}