'use client';

import {UseFormReturn} from "react-hook-form";
import {brandValidType} from "@/validations/brands";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@/components/ui/select";
import {Icons} from "@/components/common/icon";
import {Switch} from "@/components/ui/switch";
import {Button} from "@/components/ui/button";
import * as React from "react";
import {Textarea} from "@/components/ui/textarea";
import {Uploads} from "@/components/common/uploads";
import {RenderImage} from "@/components/common/render-image";
import {PawPrint} from "lucide-react";
import {Tree} from "@/components/tree-select";
import {data} from "@/components/sub_category_template";
import {useGetCategories} from "@/actions/queries/brand&categories";

interface BrandFormsProps {
    form: UseFormReturn<brandValidType> | any,
    onSubmit:(values:brandValidType) => void,
    images:string[],
    setImages?:any
}


export function BrandForms ({form , onSubmit, images, setImages}:BrandFormsProps) {

    return (
            <>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">

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
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Brand Name</FormLabel>
                                    <FormControl>
                                        <Input placeholder="cat.." {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                            control={form.control}
                            name="status"
                            render={({ field }) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
                                    <div className="space-y-0.5">
                                        <FormLabel>Status</FormLabel>
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
                            name="desc"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Desc</FormLabel>
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
                        <Button type="submit">Submit</Button>
                    </form>
                </Form>

            </>
        )
}