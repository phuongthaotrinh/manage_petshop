'use client'

import * as React from "react";
import {Button} from "@/components/ui/button";
import {Input} from "@/components/ui/input";
import {Textarea} from "@/components/ui/textarea";
import {cn} from "@/lib/utils"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
    FormLabel
} from "@/components/ui/form";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons"
import {useForm} from "react-hook-form";
import {Uploads} from "@/components/common/uploads";
import {RenderImage} from "@/components/common/render-image";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from "@/components/ui/command"
import {useState} from "react";
import {Brands} from "@/types/brand";
import * as APIService from "@/actions/apis/brand&categories";
import MultipleSelector from "@/components/common/multi-select/fancy-multi-and-combobox";
import {zodResolver} from "@hookform/resolvers/zod";

export default function ProductForm  () {
    const [images, setImages] = React.useState<string[]>([]);
    const [thumbnail, setThumbnail] = React.useState<string[]>([]);
    const [brands, setBrands]  = useState<Brands[]>([]);
    const [categories, setCategories]  = useState<any[]>([])


    React.useEffect(() => {
        (async () => {
          Promise.all([APIService.getAllBrands(), APIService.getAllCategories()]).then((data:any) => {
              setBrands(data[0]);
              setCategories(data[1])
          })
        })()
    },[])


    const form = useForm<any>({
        defaultValues: {
            name: "",
            price: "",
            desc: "",
            images:"",
            brandId: "",
            categoryId: []
        },
    })

    const onSubmit = (values:any) => {
        values.categoryId = values.categoryId?.map((i:any) => i.value)
        console.log('values',values);

    };

    const reset = () => {

    }
    return (
        <>

            {/*<Form {...form}  >*/}
            {/*    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">*/}
            {/*        <div className="flex items-center gap-3">*/}
            {/*            <Button type="submit">Submit</Button>*/}
            {/*            <Button type="button" variant="outline" onClick={() => reset()}>Reset</Button>*/}
            {/*        </div>*/}
            {/*        <div className="grid md:grid-cols-2 sx:grid-cols-1 gap-6">*/}
            {/*            <div className="space-y-3 ">*/}
            {/*                <FormField*/}
            {/*                    control={form.control}*/}
            {/*                    name="name"*/}
            {/*                    render={({field}) => (*/}
            {/*                        <FormItem>*/}
            {/*                            <FormLabel>Tên sản phẩm </FormLabel>*/}
            {/*                            <FormControl>*/}
            {/*                                <Input placeholder="Tên sản phẩm" {...field} />*/}
            {/*                            </FormControl>*/}
            {/*                            <FormMessage/>*/}
            {/*                        </FormItem>*/}
            {/*                    )}*/}
            {/*                />*/}
            {/*                <FormField*/}
            {/*                    control={form.control}*/}
            {/*                    name="desc"*/}
            {/*                    render={({field}) => (*/}
            {/*                        <FormItem>*/}
            {/*                            <FormLabel>Desc</FormLabel>*/}
            {/*                            <FormControl>*/}
            {/*                                <Textarea  placeholder="Mô tả sản phẩm" {...field} />*/}
            {/*                            </FormControl>*/}
            {/*                            <FormMessage/>*/}
            {/*                        </FormItem>*/}
            {/*                    )}*/}
            {/*                />*/}


            {/*                <FormField*/}
            {/*                    control={form.control}*/}
            {/*                    name="brandId"*/}
            {/*                    render={({ field }) => (*/}
            {/*                       <>*/}
            {/*                           {brands && (*/}
            {/*                               <>*/}
            {/*                                   <FormItem className="flex flex-col">*/}
            {/*                                       <FormLabel>Brand</FormLabel>*/}
            {/*                                       <Popover>*/}
            {/*                                           <PopoverTrigger asChild>*/}
            {/*                                               <FormControl>*/}
            {/*                                                   <Button*/}
            {/*                                                       variant="outline"*/}
            {/*                                                       role="combobox"*/}
            {/*                                                       className={cn(*/}
            {/*                                                           "w-[200px] justify-between",*/}
            {/*                                                           !field.value && "text-muted-foreground"*/}
            {/*                                                       )}*/}
            {/*                                                   >*/}
            {/*                                                       {field.value*/}
            {/*                                                           ? brands.find(*/}
            {/*                                                               (b:any) => b.id === field.value*/}
            {/*                                                           )?.name*/}
            {/*                                                           : "Select brand"}*/}
            {/*                                                       <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />*/}
            {/*                                                   </Button>*/}
            {/*                                               </FormControl>*/}
            {/*                                           </PopoverTrigger>*/}
            {/*                                           <PopoverContent className="w-[200px] p-0">*/}
            {/*                                               <Command>*/}
            {/*                                                   <CommandInput*/}
            {/*                                                       placeholder="Search framework..."*/}
            {/*                                                       className="h-9"*/}
            {/*                                                   />*/}
            {/*                                                   <CommandEmpty>No brands found.</CommandEmpty>*/}
            {/*                                                   <CommandGroup>*/}
            {/*                                                       {brands.map((b:any) => (*/}
            {/*                                                           <CommandItem*/}
            {/*                                                               value={b._id}*/}
            {/*                                                               key={b._id}*/}
            {/*                                                               onSelect={() => {*/}
            {/*                                                                   form.setValue("brandId", b._id)*/}
            {/*                                                               }}*/}
            {/*                                                           >*/}
            {/*                                                               {b.name}*/}
            {/*                                                               <CheckIcon*/}
            {/*                                                                   className={cn(*/}
            {/*                                                                       "ml-auto h-4 w-4",*/}
            {/*                                                                       b.id === field.value*/}
            {/*                                                                           ? "opacity-100"*/}
            {/*                                                                           : "opacity-0"*/}
            {/*                                                                   )}*/}
            {/*                                                               />*/}
            {/*                                                           </CommandItem>*/}
            {/*                                                       ))}*/}
            {/*                                                   </CommandGroup>*/}
            {/*                                               </Command>*/}
            {/*                                           </PopoverContent>*/}
            {/*                                       </Popover>*/}
            {/*                                       <FormMessage />*/}
            {/*                                   </FormItem>*/}
            {/*                               </>*/}
            {/*                           )}*/}
            {/*                       </>*/}
            {/*                    )}*/}
            {/*                />*/}

            {/*                <FormField*/}
            {/*                    control={form.control}*/}
            {/*                    name="categoryId"*/}
            {/*                    render={({ field }) => (*/}
            {/*                        <FormItem>*/}
            {/*                            <FormLabel>Frameworks</FormLabel>*/}
            {/*                            <FormControl>*/}
            {/*                                {categories && (*/}
            {/*                                    <MultipleSelector*/}
            {/*                                        value={field.value}*/}
            {/*                                        onChange={field.onChange}*/}
            {/*                                        options={categories?.map((i,j) => {*/}
            {/*                                            return {*/}
            {/*                                                value: i?._id,*/}
            {/*                                                label: i?.name*/}
            {/*                                            }*/}
            {/*                                        })}*/}
            {/*                                        hidePlaceholderWhenSelected*/}
            {/*                                        placeholder="Select categories you like..."*/}
            {/*                                        emptyIndicator={*/}
            {/*                                            <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">*/}
            {/*                                                no results found.*/}
            {/*                                            </p>*/}
            {/*                                        }*/}
            {/*                                    />*/}
            {/*                                )}*/}
            {/*                            </FormControl>*/}
            {/*                            <FormMessage />*/}
            {/*                        </FormItem>*/}
            {/*                    )}*/}
            {/*                />*/}


            {/*            </div>*/}
            {/*            <div className="space-y-3">*/}
            {/*                <FormField*/}
            {/*                    control={form.control}*/}
            {/*                    name="images"*/}
            {/*                    render={({field}) => (*/}
            {/*                        <FormItem>*/}
            {/*                            <FormLabel>Media</FormLabel>*/}
            {/*                            <div>*/}
            {/*                                <Uploads value={images} max={2} onChange={(value:any) => {*/}
            {/*                                    if (value !== null && value !== undefined) {*/}
            {/*                                        const newImages = [...images, value] as any*/}
            {/*                                        setImages(newImages);*/}
            {/*                                    }*/}
            {/*                                }} />*/}
            {/*                            </div>*/}
            {/*                            <RenderImage images={images} setImages={setImages} isPreviewMode={false} />*/}
            {/*                            <FormMessage/>*/}
            {/*                        </FormItem>*/}
            {/*                    )}*/}
            {/*                />*/}

            {/*                <FormField*/}
            {/*                    control={form.control}*/}
            {/*                    name="price"*/}
            {/*                    render={({ field }) => {*/}
            {/*                        return (*/}
            {/*                            <FormItem>*/}
            {/*                                <FormLabel>Price</FormLabel>*/}
            {/*                                <FormControl>*/}
            {/*                                    <Input*/}
            {/*                                        placeholder="Enter price"*/}
            {/*                                        type="number"*/}
            {/*                                        {...field}*/}
            {/*                                        value={field.value}*/}
            {/*                                        onChange={field.onChange}*/}
            {/*                                    />*/}
            {/*                                </FormControl>*/}
            {/*                                <FormMessage />*/}
            {/*                            </FormItem>*/}
            {/*                        );*/}
            {/*                    }}*/}
            {/*                />*/}

            {/*            </div>*/}
            {/*        </div>*/}

            {/*    </form>*/}
            {/*</Form>*/}

        </>
    )
}