'use client';
import {Button} from "@/components/ui/button";
import {Plus} from "lucide-react";
import {Dialog, DialogContent, DialogHeader, DialogTitle} from "@/components/ui/dialog";
import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {Input} from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectLabel,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import React from "react";
import {useForm} from "react-hook-form";
import {FormItems} from "@/components/forms/product-new";
import {TableAddProductVariant} from "@/components/forms/product-new/components/table-addProductVariant";
import {setValuesOfForm} from "@/lib/helpers";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"



function convertDataVariables(input:any) {
    const dataVariables = {};
    const data = [];
    let index = 0;
    for (const key in input) {
        if (key.startsWith('data-')) {
            const variant_name = key.substring(5);
            const variant_data = input[key];
            data.push({ variant_name, variant_data});
        } else {
            // @ts-ignore
            dataVariables[key] = input[key];
        }
    }

    return { ...dataVariables, data };
}

type IProductVariants = {
    updateForm: (fieldToUpdate: Partial<FormItems>) => void;
    formData:FormItems
};

export function ProductVariants ({formData,updateForm}:IProductVariants) {
    const [pdAttrOpen, setPdAttrOpen] = React.useState(false);
    const [dataCreateEdit, setDataCreateEdit] = React.useState<FormItems['productVariants'] | null>(null);

    const variantForm = useForm()

    const hanldePrdVariantSubmit = (values:any) => {
        const outputData = convertDataVariables(values);
        setPdAttrOpen(false);
        //@ts-ignore
        updateForm({ productVariants:[...formData.productVariants, outputData]})
        variantForm.reset();

        console.log("values", values)
    }

    React.useEffect(() => {
        if(dataCreateEdit){
            setValuesOfForm(dataCreateEdit, variantForm)
        }
    },[dataCreateEdit])

    console.log("dataCreateEdit", dataCreateEdit)
    return (
        <>
            {formData.variants?.length >= 1 ? (
                <div id="content2" className="my-5 space-y-5">
                    <div>
                        Product variants ({formData.productVariants.length})
                    </div>

                    <Button variant="secondary" type="button" className="w-full"
                            onClick={() => {
                                setPdAttrOpen(true)
                            }}
                    >
                        <Plus  className="w-4 h-4 mr-2 "/>Add an product variant
                    </Button>

                    <Dialog  open={pdAttrOpen}
                             onOpenChange={() => {
                                 variantForm.reset();
                                 setPdAttrOpen(!pdAttrOpen)
                             }}
                    >
                        <DialogContent className="min-w-[60vw] h-[90vh] max-h-[90vh] overflow-y-scroll">
                            <DialogHeader>
                                <DialogTitle>
                                    {dataCreateEdit ? `Edit ` : 'Create'} Variant
                                </DialogTitle>

                                <Form {...variantForm}>
                                    <form onSubmit={variantForm.handleSubmit(hanldePrdVariantSubmit)}>
                                        <div className="space-y-5">
                                            <Accordion type="multiple" className="w-full space-y-5"
                                                       defaultValue={["product_attributes","product_attribute_option","product_attribute_option_setting","stock_n_inventory"]}>
                                                <div className="p-2">
                                                    <AccordionItem value="product_attributes">
                                                        <AccordionTrigger>
                                                                                     <span className="font-semibold text-base relative
                                                                                          after:relative after:bottom-0 after:left-2 after:content-['*']
                                                                                          after:text-2xl after:text-red-600 ">
                                                                                             General
                                                                                     </span>
                                                        </AccordionTrigger>
                                                        <AccordionContent className="h-auto mb-15 pb-5">
                                                                                       <span>
                                                                                           Configure the general information for this variant.
                                                                                        </span>
                                                            <div id="product_attributes" className="grid grid-cols-2 gap-3">
                                                                <FormField
                                                                    control={variantForm.control}
                                                                    name="title"
                                                                    render={({ field }) => (
                                                                        <FormItem>
                                                                            <FormLabel className="font-semibold text-muted-foreground">Name</FormLabel>
                                                                            <FormControl>
                                                                                <Input
                                                                                    autoFocus
                                                                                    type="text"
                                                                                    placeholder="Green / XL"
                                                                                    className="w-full"
                                                                                    required
                                                                                    {...field}
                                                                                    value={field.value || ""}
                                                                                />
                                                                            </FormControl>
                                                                            <FormMessage />
                                                                        </FormItem>
                                                                    )}
                                                                />
                                                                <FormField
                                                                    control={variantForm.control}
                                                                    name="material"
                                                                    render={({ field }) => (
                                                                        <FormItem>
                                                                            <FormLabel className="font-semibold text-muted-foreground">meterial</FormLabel>
                                                                            <FormControl>
                                                                                <Input
                                                                                    autoFocus
                                                                                    type="text"
                                                                                    id="meterial"
                                                                                    placeholder="80% wool,20% cotton"
                                                                                    className="w-full"
                                                                                    required
                                                                                    {...field}
                                                                                    value={field.value || ""}
                                                                                />
                                                                            </FormControl>
                                                                            <FormMessage />
                                                                        </FormItem>
                                                                    )}
                                                                />

                                                            </div>
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                    <AccordionItem value="product_attribute_option">
                                                        <AccordionTrigger>
                                                                                         <span className="font-semibold text-base relative
                                                                                          after:relative after:bottom-0 after:left-2 after:content-['*']
                                                                                          after:text-2xl after:text-red-600 ">
                                                                                             Options
                                                                                     </span>
                                                        </AccordionTrigger>
                                                        <AccordionContent>
                                                            <div id="product_attribute_option">
                                                                <div className="grid grid-cols-2 gap-3">
                                                                    {formData?.variants?.map((i, j) => (
                                                                        <div key={j} >
                                                                            <FormField
                                                                                control={variantForm.control}
                                                                                name={`data-${i?.name}`}
                                                                                render={({ field }) => (
                                                                                    <FormItem>
                                                                                        <FormLabel>{i?.name}</FormLabel>

                                                                                        <Select onValueChange={field.onChange}>
                                                                                            <SelectTrigger >
                                                                                                <SelectValue placeholder={`Select ${i?.name}`}/>
                                                                                            </SelectTrigger>
                                                                                            <SelectContent>
                                                                                                <SelectGroup>
                                                                                                    <SelectLabel>{i?.name}</SelectLabel>
                                                                                                    {i?.value?.map((ii,jj) => (
                                                                                                        <SelectItem
                                                                                                            key={jj}
                                                                                                            value={ii?.value}

                                                                                                        >
                                                                                                            {ii?.label}
                                                                                                        </SelectItem>
                                                                                                    ))}

                                                                                                </SelectGroup>
                                                                                            </SelectContent>
                                                                                        </Select>
                                                                                        <FormMessage />
                                                                                    </FormItem>
                                                                                )}
                                                                            />
                                                                        </div>

                                                                    ))}
                                                                </div>
                                                            </div>
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                    <AccordionItem value="product_attribute_option_setting">
                                                        <AccordionTrigger>
                                                                                         <span className="font-semibold text-base relative
                                                                                          after:relative after:bottom-0 after:left-2 after:content-['*']
                                                                                          after:text-2xl after:text-red-600 ">
                                                                                             Pricing
                                                                                     </span>
                                                        </AccordionTrigger>
                                                        <AccordionContent className="h-auto mb-15 pb-5">
                                                            <div id="product_attribute_price">
                                                                <FormField
                                                                    control={variantForm.control}
                                                                    name="price"
                                                                    render={({ field }) => (
                                                                        <FormItem>
                                                                            <FormLabel className="font-semibold text-muted-foreground">Price</FormLabel>
                                                                            <FormControl>
                                                                                <Input
                                                                                    autoFocus
                                                                                    type="text"
                                                                                    className="w-full"
                                                                                    required
                                                                                    {...field}
                                                                                    value={field.value || ""}
                                                                                />
                                                                            </FormControl>
                                                                            <FormMessage />
                                                                        </FormItem>
                                                                    )}
                                                                />

                                                            </div>
                                                        </AccordionContent>
                                                    </AccordionItem>
                                                    <AccordionItem value="stock_n_inventory">
                                                        <AccordionTrigger>
                                                            <span className="font-semibold text-base relative"> Stock & Inventory   </span>
                                                        </AccordionTrigger>
                                                        <AccordionContent className="h-auto mb-15 pb-5">
                                                            <span>Configure the inventory and stock for this variant.</span>
                                                            <div id="product_attribute_price" className="grid grid-cols-2 gap-3">

                                                                <FormField
                                                                    control={variantForm.control}
                                                                    name="sku"
                                                                    render={({ field }) => (
                                                                        <FormItem>
                                                                            <FormLabel className="font-semibold text-muted-foreground">Stock keeping unit (SKU)</FormLabel>
                                                                            <FormControl>
                                                                                <Input
                                                                                    autoFocus
                                                                                    type="text"
                                                                                    className="w-full"
                                                                                    required
                                                                                    {...field}
                                                                                    placeholder="SUN-G, JK1234..."
                                                                                    value={field.value || ""}
                                                                                />
                                                                            </FormControl>
                                                                            <FormMessage />
                                                                        </FormItem>
                                                                    )}
                                                                />
                                                                <FormField
                                                                    control={variantForm.control}
                                                                    name="inventory_quantity"
                                                                    render={({ field }) => (
                                                                        <FormItem>
                                                                            <FormLabel className="font-semibold text-muted-foreground">Quantity in stock</FormLabel>
                                                                            <FormControl>
                                                                                <Input
                                                                                    autoFocus
                                                                                    type="number"
                                                                                    inputMode="numeric"
                                                                                    className="w-full"
                                                                                    required
                                                                                    {...field}
                                                                                    value={Number.isNaN(field.value) ? 0 : field.value}
                                                                                    placeholder="Type product inventory here."
                                                                                    onChange={(e) => field.onChange(e.target.valueAsNumber)}

                                                                                />
                                                                            </FormControl>
                                                                            <FormMessage />
                                                                        </FormItem>
                                                                    )}
                                                                />


                                                                <FormField
                                                                    control={variantForm.control}
                                                                    name="ean"
                                                                    render={({ field }) => (
                                                                        <FormItem>
                                                                            <FormLabel className="font-semibold text-muted-foreground">EAN (Barcode)</FormLabel>
                                                                            <FormControl>
                                                                                <Input
                                                                                    autoFocus
                                                                                    type="text"
                                                                                    className="w-full"

                                                                                    {...field}
                                                                                    value={field.value || ""}
                                                                                    placeholder="SUN-G, JK1234..."
                                                                                />
                                                                            </FormControl>
                                                                            <FormMessage />
                                                                        </FormItem>
                                                                    )}
                                                                />
                                                                <FormField
                                                                    control={variantForm.control}
                                                                    name="upc"
                                                                    render={({ field }) => (
                                                                        <FormItem>
                                                                            <FormLabel className="font-semibold text-muted-foreground">UPC (Barcode)</FormLabel>
                                                                            <FormControl>
                                                                                <Input
                                                                                    autoFocus
                                                                                    type="text"
                                                                                    className="w-full"
                                                                                    {...field}
                                                                                    value={field.value || ""}
                                                                                    placeholder="SUN-G, JK1234..."
                                                                                />
                                                                            </FormControl>
                                                                            <FormMessage />
                                                                        </FormItem>
                                                                    )}
                                                                />
                                                                <FormField
                                                                    control={variantForm.control}
                                                                    name="barcode"
                                                                    render={({ field }) => (
                                                                        <FormItem>
                                                                            <FormLabel className="font-semibold text-muted-foreground">Barcode</FormLabel>
                                                                            <FormControl>
                                                                                <Input
                                                                                    autoFocus
                                                                                    type="text"
                                                                                    className="w-full"
                                                                                    {...field}
                                                                                    value={field.value || ""}
                                                                                    placeholder="123456789104..."
                                                                                />
                                                                            </FormControl>
                                                                            <FormMessage />
                                                                        </FormItem>
                                                                    )}
                                                                />


                                                            </div>
                                                        </AccordionContent>
                                                    </AccordionItem>

                                                </div>
                                            </Accordion>


                                        </div>

                                        <div className={"flex gap-3 items-center my-5"}>
                                            <Button type="button" variant="destructive"
                                                    onClick={() => {
                                                        variantForm.reset();
                                                        setPdAttrOpen(!pdAttrOpen)
                                                    }}
                                            >
                                                Cancel
                                            </Button>
                                            <Button type="submit">Save</Button>
                                        </div>
                                    </form>
                                </Form>

                            </DialogHeader>
                        </DialogContent>
                    </Dialog>
                    <TableAddProductVariant data={formData.productVariants} setPdAttrOpen={setPdAttrOpen} setDataCreateEdit={setDataCreateEdit} />
                </div>
            ):(
                <div id="content2" className="my-5 space-y-5">
                    <Button variant="secondary" type="button" className="w-full"
                            disabled={true}
                    >
                        <Plus  className="w-4 h-4 mr-2 "/>Add an product variant
                    </Button>

                </div>
            )}

        </>
    )
}