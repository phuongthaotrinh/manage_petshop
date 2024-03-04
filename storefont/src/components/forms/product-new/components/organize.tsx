'use client';

import {Label} from "@/components/ui/label";
import React, {useState} from "react";
import {type FormItems} from "@/components/forms/product-new";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {CaretSortIcon, CheckIcon} from "@radix-ui/react-icons";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem} from "@/components/ui/command";
import {cn} from "@/lib/utils";
import MultipleSelector from "@/components/common/multi-select/fancy-multi-and-combobox";
import {Brands} from "@/types/brand";
import * as APIService from "@/actions/apis/brand&categories";


type IGeneralInfomation = {
    updateForm: (fieldToUpdate: Partial<FormItems>) => void;
    formData:FormItems,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    open:boolean
};


export function Organize ({updateForm,formData,setOpen, open}:IGeneralInfomation) {
    const [brands, setBrands] = useState<Brands[]>([]);
    const [categories, setCategories] = useState<any[]>([])

    React.useEffect(() => {
        (async () => {
            Promise.all([APIService.getAllBrands(), APIService.getAllCategories()]).then((data: any) => {
                setBrands(data[0]);
                setCategories(data[1])
            })
        })()
    }, [])
    return (
        <>
            <div id="content2" className="my-5 space-y-5">
                <div id="brand_n_cate" className="grid grid-cols-2 gap-3">
                    <div className="space-y-2 grid ">
                        <Label className="font-semibold text-muted-foreground">
                            Brands
                        </Label>
                        <Popover open={open} onOpenChange={setOpen}>
                            <PopoverTrigger asChild>
                                <Button
                                    variant="outline"
                                    role="combobox"
                                    aria-expanded={open}
                                    className="w-[200px] justify-between"
                                >
                                    {formData.organize.brand_id && brands
                                        ? brands.find((b) =>b.id === formData.organize.brand_id)?.name
                                        : "Select brand..."}
                                    <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-[200px] p-0">
                                <Command>
                                    <CommandInput placeholder="Search framework..." className="h-9" />
                                    <CommandEmpty>No brand found.</CommandEmpty>
                                    <CommandGroup>
                                        {brands && brands.map((b) => (
                                            <CommandItem
                                                key={b._id}
                                                value={b._id}
                                                onSelect={(currentValue) => {
                                                    const check = currentValue === formData.organize.brand_id ? "" : currentValue
                                                    // setValue(check)
                                                    setOpen(false)
                                                    updateForm({organize: {...formData.organize, brand_id: check}})
                                                }}
                                            >
                                                {b.name}
                                                <CheckIcon
                                                    className={cn(
                                                        "ml-auto h-4 w-4",
                                                        formData.organize.brand_id  === b._id ? "opacity-100" : "opacity-0"
                                                    )}
                                                />
                                            </CommandItem>
                                        ))}
                                    </CommandGroup>
                                </Command>
                            </PopoverContent>
                        </Popover>

                    </div>
                    <div className="space-y-2 grid ">
                        <Label className="font-semibold text-muted-foreground">
                            Categories
                        </Label>

                        {
                            categories && (
                                <MultipleSelector
                                    value={formData.organize.category_ids ? formData.organize.category_ids : []}
                                    onChange={(e) => {
                                        updateForm({organize: {...formData.organize, category_ids: e}})
                                    }}
                                    options={categories?.map((i,j) => {
                                        return {
                                            value: i?._id,
                                            label: i?.name
                                        }
                                    })}
                                    hidePlaceholderWhenSelected
                                    placeholder="Select categories you like..."
                                    emptyIndicator={
                                        <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                                            no results found.
                                        </p>
                                    }
                                />
                            )
                        }
                    </div>
                </div>


                <div id="tags">
                    <div className="space-y-2 grid ">
                        <Label className="font-semibold text-muted-foreground">
                            Tags
                        </Label>

                        <MultipleSelector
                            value={formData.organize.tags}
                            onChange={(e) => {
                                updateForm({organize: {...formData.organize, tags: e}})
                            }}
                            creatable={true}
                        />

                    </div>
                </div>


            </div>
        </>
    )
}