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
import {Card, CardContent, CardTitle, CardHeader,CardDescription,CardFooter} from "@/components/ui/card";
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
        // startTransition(() => {
        //     toast.promise((mutateAsync(formData)), {
        //         loading: "creating...",
        //         error:"Fail",
        //         success:(data:any) => {
        //             console.log("dtaa", data);
        //             return "create success"
        //         }
        //     })
        // })
        console.log("formData",formData)
    }

    const updateForm = (fieldToUpdate: any) => {
        const payload = {...formData, ...fieldToUpdate};
        setFormData(payload);
    }


    console.log("variant", formData.productVariants)

    return (
        <div className="grid grid-cols-4 gap-4 p-5">
            <section className="w-full" >
                dow
            </section>
            <section className="col-span-3">
                <form  className="w-full flex flex-col justify-between h-full space-y-5">
                    <section id="button_control" className="mb-8 relative">
                        <div className=" flex justify-between">
                            <Button variant="link" type="button" onClick={() => close()}>
                                <X className="w-6 h-6"/>
                            </Button>
                            <div className="space-x-2">
                                <Button variant="ghost" type="button" disabled={!formData.generalInfo.title}  size="sm" onClick={() => publish("draft")}>Save as draft</Button>
                                <Button variant="default" type="button" disabled={!formData.generalInfo.title} size="sm" onClick={() => publish("published")}>Publish product</Button>
                            </div>
                        </div>
                        <div className="border my-2"></div>
                    </section>

                    <Accordion type="multiple" defaultValue={['item-1','item-2','item-3']} >
                        <AccordionItem value="item-1">
                            <AccordionTrigger>
                                    <span className="font-semibold text-base relative
                                          after:relative after:bottom-0 after:left-2 after:content-['*']
                                          after:text-2xl after:text-red-600 ">
                                        General information
                                    </span>
                            </AccordionTrigger>
                            <AccordionContent>
                                <Card>
                                    <CardContent>  <GeneralInfomation formData={formData} updateForm={updateForm} /></CardContent>
                                </Card>
                            </AccordionContent>
                        </AccordionItem>

                        <AccordionItem value="item-2">
                            <AccordionTrigger>
                                <span className="font-semibold text-base relative ">
                                    Organize
                                </span>
                            </AccordionTrigger>
                            <AccordionContent>
                                <Card>
                                    <CardContent> <Organize updateForm={updateForm} formData={formData} setOpen={setOpen} open={open} /></CardContent>
                                </Card>
                            </AccordionContent>
                        </AccordionItem>


                        <AccordionItem value="item-3">
                            <AccordionTrigger>
                                <span className="font-semibold text-base relative ">
                                    Detail
                                </span>
                            </AccordionTrigger>
                            <AccordionContent>
                                <Card>
                                    <CardContent>
                                        <Variants updateForm={updateForm } formData={formData} setFormData={setFormData} limit={2} />
                                        <ProductVariants  updateForm={updateForm} formData={formData} />
                                    </CardContent>
                                </Card>
                            </AccordionContent>
                        </AccordionItem>

                    </Accordion>
                </form>
            </section>

        </div>
    )
}