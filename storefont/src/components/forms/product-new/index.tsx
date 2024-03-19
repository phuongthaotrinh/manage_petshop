"use client";

import React from "react";

import {X} from "lucide-react";
import {Button} from "@/components/ui/button";
import {useRouter} from "next/navigation";
import {AnimatePresence} from "framer-motion";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import MultipleSelector, {Option} from "@/components/common/multi-select/fancy-multi-and-combobox";
import {GeneralInfomation} from "@/components/forms/product-new/components/general-infomation";
import {Organize} from "@/components/forms/product-new/components/organize";
import {Variants} from "@/components/forms/product-new/components/variants";
import {ProductVariants} from "@/components/forms/product-new/components/product-variants";
import {UploadMedia} from "@/components/forms/product-new/components/upload-media";
import {UploadThumbnail} from "@/components/forms/product-new/components/upload-thumbnail";
import { generateReactHelpers } from "@uploadthing/react/hooks";
import {OurFileRouter} from "@/app/api/uploadthing/core";
import {FileWithPreview} from "@/types";
import {TableAddProductVariant} from "@/components/forms/product-new/components/table-addProductVariant";
import {MediumZoom} from "@/components/common/zoom";
import Image from "next/image";
import {FileDialog} from "@/components/common/uploads/file-dialog";
import {RenderImage} from "@/components/common/render-image";
import {useCreateProduct} from "@/actions/queries/products";
import {toast} from "react-hot-toast";
import {isArrayOfFile} from "@/lib/helpers";
import {Input} from "@/components/ui/input";
import {Label} from "@/components/ui/label";
import {ProductVariantsNewTable} from "@/components/forms/product-new/components/table-product-variant";
// import {ProductVariantsNewTable} from "@/components/forms/product-new/components/table-product-variant";

export interface FormItems {
    generalInfo:{
        title:string,
        subtitle:string,
        handle:string,
        material:string,
        description:string,
        discountable:boolean,
        status: string

    },
    organize:{
        brand_id: string,
        category_ids: string,
        tags:any[]
    },
    variants:
        {
            name: string,
            value:Option[]
        } [],
    productVariants:
        {
            title: string,
            price: string,
            data:[],
            material: string,
            inventory_quantity: number,
            sku:string,
            ean:string,
            upc:string,
            barcode:string
        }[],
    price?: number | null,
    thumbnail: FileWithPreview[] | null,
    galleries: FileWithPreview[] | null


}
export const initialValues: FormItems = {
    generalInfo:{
        title:"",
        subtitle:"",
        handle:"",
        material:"",
        description:"",
        discountable:true,
        status: ""
    },
    organize:{
        brand_id: "",
        category_ids: "",
        tags:[]
    },
    variants:[],
    productVariants : [  ],
    thumbnail:[],
    galleries:[],
    price: null

}
const { useUploadThing } = generateReactHelpers<OurFileRouter>();


export default function ProductNew () {
    const router = useRouter();
    const [formData, setFormData] = React.useState<FormItems>(initialValues);
    const [open, setOpen] = React.useState(false);
    const [_, startTransition] = React.useTransition();
    const { isUploading, startUpload } = useUploadThing("productImage")
    const [thumbnail, setThumbnail] = React.useState<FileWithPreview[] | null>(null)
    const [galleries, setGalleries] = React.useState<FileWithPreview[] | null>(null)
    const {mutateAsync} = useCreateProduct()

    const close = () => {
            router.back();
            setFormData(initialValues);
    }


    const publish  = async (status: "published" | "draft") => {

        formData.thumbnail = thumbnail;
        formData.galleries = galleries;

        formData.generalInfo.status = status;

        console.log("formData",formData)
        // formData.organize.category_ids = formData.organize.category_ids.map((i:any) => i.value)

        // if (isArrayOfFile(thumbnail)) {
        //     toast.promise(
        //         startUpload(thumbnail)
        //             .then((res) => {
        //                 const formattedImages = res?.map((image) => ({
        //                     id: image.key,
        //                     name: image.key.split("_")[1] ?? image.key,
        //                     url: image.url,
        //                 }))
        //                 return formattedImages ?? null
        //             })
        //             .then((images) => {
        //                 console.log("thumbnail", images)
        //             }),
        //         {
        //             loading: "Creating...",
        //             success:(data) => {
        //                 console.log("data",data);
        //                 setFormData(initialValues);
        //                 setOpen(false);
        //                 return "Creat product success"
        //             },
        //             error: "Error uploading images.",
        //         }
        //     )
        //
        //
        //
        // } else {
        //     console.log("startUPload")
        //
        // }
    }

    const updateForm = (fieldToUpdate: any) => {
        const payload = {...formData, ...fieldToUpdate};
        setFormData(payload);
    }
    return (
        <>
            <section>

                <form  className="w-full flex flex-col justify-between h-full">
                    {/*<section id="button_control" className="mb-8 relative">*/}
                    {/*    <div className=" flex justify-between">*/}
                    {/*        <Button variant="link" type="button" onClick={() => close()}>*/}
                    {/*            <X className="w-6 h-6"/>*/}
                    {/*        </Button>*/}
                    {/*        <div className="space-x-2">*/}
                    {/*            <Button variant="ghost" type="button" disabled={!formData.generalInfo.title}  size="sm" onClick={() => publish("draft")}>Save as draft</Button>*/}
                    {/*            <Button variant="default" type="button" disabled={!formData.generalInfo.title} size="sm" onClick={() => publish("published")}>Publish product</Button>*/}
                    {/*        </div>*/}
                    {/*    </div>*/}
                    {/*    <div className="border my-2"></div>*/}
                    {/*</section>*/}


                        {/*<Accordion type="multiple"  className="w-full space-y-14">*/}
                            {/*<AccordionItem value="item-1">*/}
                            {/*    <AccordionTrigger className="py-0">*/}
                            {/*    <span className="font-semibold text-base relative*/}
                            {/*          after:relative after:bottom-0 after:left-2 after:content-['*']*/}
                            {/*          after:text-2xl after:text-red-600 ">*/}
                            {/*        General information*/}
                            {/*    </span>*/}
                            {/*    </AccordionTrigger>*/}
                            {/*    <AccordionContent>*/}
                            {/*        <span>To start selling, all you need is a name and a price.</span>*/}
                            {/*        <div className="p-2">*/}
                                        <GeneralInfomation formData={formData} updateForm={updateForm} />
                            {/*        </div>*/}
                            {/*    </AccordionContent>*/}
                            {/*</AccordionItem>*/}

                            {/* Organize */}
                            {/*<AccordionItem value="item-2">*/}
                            {/*    <AccordionTrigger className="py-0">*/}
                            {/*    <span className="font-semibold text-base relative">*/}
                            {/*        Organize*/}
                            {/*    </span>*/}
                            {/*    </AccordionTrigger>*/}
                            {/*    <AccordionContent className="h-auto mb-15 pb-5">*/}
                            {/*        <span>To start selling, all you need is a name and a price.</span>*/}
                            {/*        <div className="p-2">*/}
                                        <Organize updateForm={updateForm} formData={formData} setOpen={setOpen} open={open} />
                            {/*        </div>*/}
                            {/*    </AccordionContent>*/}
                            {/*</AccordionItem>*/}

                            {/*<AccordionItem value="item-3">*/}
                            {/*    <AccordionTrigger className="py-0">*/}
                            {/*       <span className="font-semibold text-base relative"> Variants  </span>*/}
                            {/*    </AccordionTrigger>*/}
                            {/*    */}
                            {/*    <AccordionContent className="h-auto mb-15 pb-5">*/}
                            {/*        <span>*/}
                            {/*            Add variations of this product. <br/>*/}
                            {/*            Offer your customers different options for color, format, size, shape, etc.*/}
                            {/*        </span>*/}


                            {/*            <div className="space-y-3">*/}
                                            <Variants updateForm={updateForm } formData={formData} setFormData={setFormData} limit={2} />

                                            {/*{formData.variants.length == 0 ?(*/}
                                            {/*    <>*/}
                                            {/*        <div className="gap-5 flex items-center ">*/}
                                            {/*            <Label className="after:content-['*'] after:text-red-600 after:relative after:left-0 after:pl-1">*/}
                                            {/*                Price*/}
                                            {/*            </Label>*/}
                                            {/*            <Input className="w-64 " prefix="vnd"/>*/}
                                            {/*        </div>*/}
                                            {/*        <div className="gap-5 flex items-center ">*/}
                                            {/*            <Label className="after:content-['*'] after:text-red-600 after:relative after:left-0 after:pl-1">*/}
                                            {/*                Stock*/}
                                            {/*            </Label>*/}
                                            {/*            <Input className="w-64"/>*/}
                                            {/*        </div>*/}

                                            {/*    </>*/}
                                            {/*):null}*/}


                                        {/*</div>*/}
                                        {/*<div className="my-5">*/}
                                        {/*    {formData.variants.length !== 0 &&*/}
                                        {/*         <ProductVariantsNewTable formData={formData} updateForm={updateForm}/>*/}
                                        {/*    }*/}


                                        {/*</div>*/}
                                        <ProductVariants  updateForm={updateForm} formData={formData} />


                                    {/*</div>*/}
                            {/*    </AccordionContent>*/}
                            {/*</AccordionItem>*/}


                            {/* Thumbnail */}
                            {/*<AccordionItem value="item-4">*/}
                            {/*    <AccordionTrigger className="py-0">*/}
                            {/*    <span className="font-semibold text-base relative">*/}
                            {/*        Thumbnail*/}
                            {/*    </span>*/}
                            {/*    </AccordionTrigger>*/}
                            {/*    <AccordionContent className="h-auto mb-15 pb-5">*/}
                            {/*        <span>Used to represent your product during checkout, social sharing and more.</span>*/}
                            {/*        <div className="p-2">*/}
                            {/*            <div id="content2" className="my-5 space-y-5">*/}
                            {/*                <>*/}
                            {/*                    {thumbnail?.length ? (*/}
                            {/*                        <div className="flex items-center gap-2">*/}
                            {/*                            <RenderImage images={thumbnail?.map((i:any) => i?.preview)} setImages={setThumbnail} isPreviewMode={false} />*/}
                            {/*                        </div>*/}
                            {/*                    ) : null}*/}
                            {/*                    <FileDialog*/}
                            {/*                        name="thumbnail"*/}
                            {/*                        maxFiles={1}*/}
                            {/*                        maxSize={1024 * 1024 * 4}*/}
                            {/*                        files={thumbnail}*/}
                            {/*                        setFiles={setThumbnail}*/}
                            {/*                        disabled={isUploading}*/}
                            {/*                        isUploading={isUploading}*/}
                            {/*                    />*/}

                            {/*                </>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*    </AccordionContent>*/}
                            {/*</AccordionItem>*/}



                            {/*/!* Media *!/*/}
                            {/*<AccordionItem value="item-5">*/}
                            {/*    <AccordionTrigger className="py-0">*/}
                            {/*    <span className="font-semibold text-base relative">*/}
                            {/*        Media*/}
                            {/*    </span>*/}
                            {/*    </AccordionTrigger>*/}
                            {/*    <AccordionContent className="h-auto mb-15 pb-5">*/}
                            {/*        <span>Add images to your product.</span>*/}
                            {/*        <div className="p-2">*/}
                            {/*            <div id="content2" className="my-5 space-y-5">*/}
                            {/*                <>*/}
                            {/*                    {galleries?.length ? (*/}
                            {/*                        <div className="flex items-center gap-2">*/}
                            {/*                            <RenderImage images={galleries?.map((i:any) => i?.preview)} setImages={setGalleries} isPreviewMode={false} />*/}
                            {/*                        </div>*/}
                            {/*                    ) : null}*/}
                            {/*                    <FileDialog*/}
                            {/*                        name="gallaries"*/}
                            {/*                        maxFiles={10}*/}
                            {/*                        maxSize={1024 * 1024 * 4}*/}
                            {/*                        files={galleries}*/}
                            {/*                        setFiles={setGalleries}*/}
                            {/*                        disabled={isUploading}*/}
                            {/*                        isUploading={isUploading}*/}
                            {/*                    />*/}

                            {/*                </>*/}
                            {/*            </div>*/}
                            {/*        </div>*/}
                            {/*    </AccordionContent>*/}
                            {/*</AccordionItem>*/}

                        {/*</Accordion>*/}

                </form>
            </section>

        </>
    )
}