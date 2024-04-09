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
import {catchError, isArrayOfFile} from "@/lib/helpers";
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
        inventory_quantity?: number | null,
        price?: number | null,
    },
    organize:{
        brand_id: string | null,
        category_ids: string | null,
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
        status: "",
        inventory_quantity:null,
        price:null
    },
    organize:{
        brand_id: null,
        category_ids: null,
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

        if(formData.productVariants.length > 0 || formData.variants.length > 0){
            formData.generalInfo.inventory_quantity = null;
            formData.generalInfo.price = null;
        }

        startTransition(() => {
            toast.promise((mutateAsync(formData)), {
                loading: "creating...",
                error:(err) => catchError(err),
                success:(data:any) => {
                    setFormData(initialValues);
                    return "Create product successfully!"
                }
            })
        })
    }

    const updateForm = (fieldToUpdate: any) => {
        const payload = {...formData, ...fieldToUpdate};
        setFormData(payload);
    }



    const stepForm = React.useMemo(() => {

        let init = ["item-1"]
        if(formData.generalInfo.title && formData.generalInfo.subtitle){
            init = ([...init ,"item-2"])
        }

        if(formData.organize.brand_id && formData.organize.category_ids){
            init = ([...init ,"item-3"])
        }

        return init
    }, [formData]);


    return (
        <div className="">

                <form  className="w-full  h-full space-y-5 relative">
                    <div  className=" sticky h-16 bg-gray-100 top-0 w-full rounded-lg  " style={{zIndex:999}}>
                        <div className="flex items-center justify-between h-full px-8" >
                            <Button variant="link" type="button" onClick={() => close()}>
                                <X className="w-6 h-6"/>Close
                            </Button>
                            <div className="space-x-2 ">
                                <Button variant="ghost" type="button" disabled={!formData.generalInfo.title}  size="sm" onClick={() => publish("draft")}>Save as draft</Button>
                                <Button variant="default" type="button" disabled={!formData.generalInfo.title} size="sm" onClick={() => publish("published")}>Publish product</Button>
                            </div>
                        </div>

                    </div>
                   <div className="grid grid-cols-3 gap-4   px-8 w-auto z-10">
                       <div className="">
                         control widget
                       </div>
                       <div className="h-auto min-h-screen col-span-2  relative">
                           <Accordion type="multiple" defaultValue={["item-1"]}  value={stepForm}>
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
                                               {formData.variants.length === 0 && (
                                                   <div className="space-y-3 pt-3">
                                                       <div className="space-y-2">
                                                           <Label className=" after:relative after:bottom-0 after:left-2 after:content-['*']
                                                            after:text-red-600 font-semibold text-muted-foreground">
                                                               Inventory quantity
                                                           </Label>
                                                           <Input
                                                               autoFocus
                                                               type="number"
                                                               name="name"
                                                               id="name"
                                                               placeholder="Winter Jacket"
                                                               onChange={(e) => updateForm({ generalInfo:{...formData.generalInfo,inventory_quantity: +e.target.value}})}
                                                               className="w-full"

                                                           />
                                                       </div>
                                                       <div className="space-y-2">
                                                           <Label className=" after:relative after:bottom-0 after:left-2 after:content-['*']
                                                            after:text-red-600 font-semibold text-muted-foreground">
                                                              price
                                                           </Label>
                                                           <Input
                                                               autoFocus
                                                               type="number"
                                                               name="name"
                                                               id="name"
                                                               placeholder="Inventory quantity"
                                                               onChange={(e) => updateForm({ generalInfo:{...formData.generalInfo,price: +e.target.value}})}
                                                               className="w-full"

                                                           />
                                                       </div>
                                                   </div>
                                               )}
                                               <Variants updateForm={updateForm} formData={formData} setFormData={setFormData} limit={2} />
                                               {formData.variants.length > 0 && <ProductVariants updateForm={updateForm} formData={formData} />}
                                           </CardContent>
                                       </Card>
                                   </AccordionContent>
                               </AccordionItem>

                           </Accordion>
                       </div>
                   </div>

                </form>

        </div>
    )
}