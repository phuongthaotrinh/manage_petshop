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
import {Option} from "@/components/common/multi-select/fancy-multi-and-combobox";
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

export interface FormItems {
    generalInfo:{
        name:string,
        sub_title:string,
        handle:string,
        meterial:string,
        description:string,
        discount_able:boolean

    },
    organize:{
        brand_id: string,
        category_ids: any[],
        tags:any[]
    },
    variants:
        {
            name: string,
            value:Option[]
        } [],
    productVariants:
        {
            name: string,
            price: string,
            data:[],
            meterial: string,
            quantity_in_stock: number,
            sku:string,
            EAN:string,
            UPC:string,
            barcode:string

        }[],
    thumbnail: FileWithPreview[] | null,
    galleries: FileWithPreview[] | null


}
export const initialValues: FormItems = {
    generalInfo:{
        name:"",
        sub_title:"",
        handle:"",
        meterial:"",
        description:"",
        discount_able:true
    },
    organize:{
        brand_id: "",
        category_ids: [],
        tags:[]
    },
    variants:[],
    productVariants : [  ],
    thumbnail:[],
    galleries:[]

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


    const close = () => {
            router.back();
            setFormData(initialValues);
    }

    const publish  = () => {
        formData.thumbnail = thumbnail;
        formData.galleries = galleries
        console.log("publish Fnc", formData)

    }
    const saveAsDraf  = () => {
        console.log("saveAsDraf Fnc", formData)
    }

    const updateForm = (fieldToUpdate: any) => {
        const payload = {...formData, ...fieldToUpdate};
        setFormData(payload);
    }

    return (
        <>
            <section>

                <form  className="w-full flex flex-col justify-between h-full">
                    <section id="button_control" className="mb-8 relative">
                        <div className=" flex justify-between">
                            <Button variant="link" type="button" onClick={() => close()}>
                                <X className="w-6 h-6"/>
                            </Button>
                            <div className="space-x-2">
                                <Button variant="ghost" type="button" disabled={!formData.generalInfo.name}  size="sm" onClick={() => saveAsDraf()}>Save as draft</Button>
                                <Button variant="default" type="button" disabled={!formData.generalInfo.name} size="sm" onClick={() => publish()}>Publish product</Button>
                            </div>
                        </div>
                        <div className="border my-2"></div>
                    </section>

                    <AnimatePresence mode="wait" >
                        <Accordion type="multiple"  className="w-full space-y-14">
                            <AccordionItem value="item-1">
                                <AccordionTrigger className="py-0">
                                <span className="font-semibold text-base relative
                                      after:relative after:bottom-0 after:left-2 after:content-['*']
                                      after:text-2xl after:text-red-600 ">
                                    General information
                                </span>
                                </AccordionTrigger>
                                <AccordionContent>
                                    <span>To start selling, all you need is a name and a price.</span>
                                    <div className="p-2">
                                        <GeneralInfomation formData={formData} updateForm={updateForm} />
                                    </div>
                                </AccordionContent>
                            </AccordionItem>

                            {/* Organize */}
                            <AccordionItem value="item-2">
                                <AccordionTrigger className="py-0">
                                <span className="font-semibold text-base relative">
                                    Organize
                                </span>
                                </AccordionTrigger>
                                <AccordionContent className="h-auto mb-15 pb-5">
                                    <span>To start selling, all you need is a name and a price.</span>
                                    <div className="p-2">
                                        <Organize updateForm={updateForm} formData={formData} setOpen={setOpen} open={open} />
                                    </div>
                                </AccordionContent>
                            </AccordionItem>


                            {/* Variants */}
                            <AccordionItem value="item-3">
                                <AccordionTrigger className="py-0">
                                <span className="font-semibold text-base relative ">
                                    Variants
                                </span>
                                </AccordionTrigger>
                                <AccordionContent className="h-auto mb-15 pb-5">
                                    <span>
                                        Add variations of this product. <br/>
                                        Offer your customers different options for color, format, size, shape, etc.
                                    </span>
                                    <div className="p-2 space-y-5">
                                        <Variants updateForm={updateForm } formData={formData} setFormData={setFormData} />
                                        <ProductVariants formData={formData} updateForm={updateForm}/>

                                    </div>
                                </AccordionContent>
                            </AccordionItem>


                            {/* Thumbnail */}
                            <AccordionItem value="item-4">
                                <AccordionTrigger className="py-0">
                                <span className="font-semibold text-base relative">
                                    Thumbnail
                                </span>
                                </AccordionTrigger>
                                <AccordionContent className="h-auto mb-15 pb-5">
                                    <span>Used to represent your product during checkout, social sharing and more.</span>
                                    <div className="p-2">
                                        <div id="content2" className="my-5 space-y-5">
                                            <>
                                                {thumbnail?.length ? (
                                                    <div className="flex items-center gap-2">
                                                        <RenderImage images={thumbnail?.map((i:any) => i?.preview)} setImages={setThumbnail} isPreviewMode={false} />
                                                    </div>
                                                ) : null}
                                                <FileDialog
                                                    name="thumbnail"
                                                    maxFiles={1}
                                                    maxSize={1024 * 1024 * 4}
                                                    files={thumbnail}
                                                    setFiles={setThumbnail}
                                                    disabled={isUploading}
                                                    isUploading={isUploading}
                                                />

                                            </>
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>



                            {/* Media */}
                            <AccordionItem value="item-5">
                                <AccordionTrigger className="py-0">
                                <span className="font-semibold text-base relative">
                                    Media
                                </span>
                                </AccordionTrigger>
                                <AccordionContent className="h-auto mb-15 pb-5">
                                    <span>Add images to your product.</span>
                                    <div className="p-2">
                                        <div id="content2" className="my-5 space-y-5">
                                            <>
                                                {galleries?.length ? (
                                                    <div className="flex items-center gap-2">
                                                        <RenderImage images={galleries?.map((i:any) => i?.preview)} setImages={setGalleries} isPreviewMode={false} />
                                                    </div>
                                                ) : null}
                                                <FileDialog
                                                    name="gallaries"
                                                    maxFiles={10}
                                                    maxSize={1024 * 1024 * 4}
                                                    files={galleries}
                                                    setFiles={setGalleries}
                                                    disabled={isUploading}
                                                    isUploading={isUploading}
                                                />

                                            </>
                                        </div>
                                    </div>
                                </AccordionContent>
                            </AccordionItem>



                        </Accordion>

                    </AnimatePresence>
                </form>
            </section>

        </>
    )
}