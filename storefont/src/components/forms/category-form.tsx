'use client';

import {UseFormReturn} from "react-hook-form";
import {brandValidType} from "@/validations/brands";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Switch} from "@/components/ui/switch";
import {Button} from "@/components/ui/button";
import * as React from "react";
import {Textarea} from "@/components/ui/textarea";
import {Uploads} from "@/components/common/uploads";
import {RenderImage} from "@/components/common/render-image";
import {PawPrint} from "lucide-react";
import {Tree} from "@/components/tree-select";
import {useGetCategories} from "@/actions/queries/brand&categories";
import { Checkbox } from "@/components/ui/checkbox"

interface BrandFormsProps {
    form: UseFormReturn<brandValidType> | any,
    onSubmit:(values:brandValidType) => void,
    images:string[],
    setImages?:any,
    showImage?:boolean,
    categories:any[] | undefined,
    setParentSelected: React.Dispatch<any>,
    mode: "create" | "edit",
    setParentInCreate?: React.Dispatch<any>,
}


export function CategoryForms ({form , onSubmit, images, setImages,showImage=true, categories, setParentInCreate,mode}:BrandFormsProps) {
    const [open, setOpen] = React.useState<boolean>(false)
    const {data} = useGetCategories();

    return (
        <>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    {showImage ?
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
                        /> : null}

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

                   <div className="space-y-3">
                           <div className="flex items-center space-x-2">
                               <Checkbox id="terms" defaultChecked={true} onClick={() => setOpen(!open)} />
                               <label
                                   htmlFor="terms"
                                   className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                               >
                                   As a single category
                               </label>
                           </div>
                           {mode === "create"  &&
                               <div className="border rouded-sm">
                                   {data && open && (
                                      <React.Fragment>
                                          <p className="font-semibold text-sm pl-4">Choose parent</p>

                                          <Tree
                                              data={data}
                                              initialSlelectedItemId="f12"
                                              onSelectChange={(item) => {
                                                  setParentInCreate && setParentInCreate(item)
                                              }}
                                              className="min-w-28"
                                              folderIcon={PawPrint}
                                              itemIcon={PawPrint}

                                          />

                                      </React.Fragment>
                                   )}
                               </div>
                           }
                   </div>

                    <Button type="submit">Submit</Button>
                </form>
            </Form>

        </>
    )
}