'use client';


import React from "react";
import {type FormItems} from "@/components/forms/product-new";
import {Popover, PopoverContent, PopoverTrigger} from "@/components/ui/popover";
import {Button} from "@/components/ui/button";
import {CaretSortIcon, CheckIcon} from "@radix-ui/react-icons";
import {Command, CommandEmpty, CommandGroup, CommandInput, CommandItem} from "@/components/ui/command";
import {cn} from "@/lib/utils";
import MultipleSelector from "@/components/common/multi-select/fancy-multi-and-combobox";
import {useGetBrands, useGetCategories} from "@/actions/queries/brand&categories";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label"
import {Tree, TreeDataItem} from "@/components/tree-select";
import {findParentAndCheckChildren} from "@/lib/helpers";
import {CategoryItem} from "@/types/products";


type IGeneralInfomation = {
    updateForm: (fieldToUpdate: Partial<FormItems>) => void;
    formData:FormItems,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
    open:boolean
};


export function Organize ({updateForm,formData,setOpen, open}:IGeneralInfomation) {
    const {data:categories} = useGetCategories();
    const {data:brands} = useGetBrands();
    const [openCate, setOpenCate] = React.useState(false);
    const [choose, setChoose] = React.useState<TreeDataItem | undefined>(undefined);
    const [step, setStep] = React.useState<CategoryItem[]>([]);
    const [name, setName] = React.useState<string>("");
    const [hasChildren, setHasChildren] = React.useState<boolean>(false);

    const close = () => {
        setOpenCate(false);
        setName("")
    }

    React.useMemo(() => {
        const {parents, hasChildren, parentNames} = findParentAndCheckChildren(categories!,choose?._id!);
        setHasChildren(hasChildren);
        setStep(parents);
        const res  = (choose && parentNames.length > 0) ? `${parentNames}/${choose?.name}` : !choose ? "" :`${choose?.name}`
        setName(res)
    },[choose,categories])

    console.log("choose", choose)

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
                           <>
                               <div className="w-full border rounded-md h-9 font-medium cursor-pointer" onClick={() => setOpenCate(true)}>
                                   <div className="h-full pl-2 flex items-center">
                                       {choose ?  choose?.name :"Choose category"}
                                   </div>
                               </div>
                               <Dialog  open={openCate} onOpenChange={close}>
                                   <DialogContent className="w-[60vw] min-w-[60vw] min-h-80 h-auto">
                                       <DialogHeader>
                                           <Tree data={categories}
                                                 onSelectChange={(item) =>{
                                                     setChoose(item);
                                                     console.log("tree", item)
                                                 } }
                                                 className="w-full box-border h-full"

                                           />
                                       </DialogHeader>
                                       <DialogDescription className="font-semibold text-dreamOrange">{name} </DialogDescription>
                                       <DialogFooter>
                                           <Button type="button" variant="link" className="no-underline" onClick={close}>Cancel</Button>
                                           <Button type="submit" disabled={hasChildren} variant="orange" onClick={
                                               () => {
                                                   updateForm({organize: {...formData.organize, category_ids: choose!?._id}});
                                                   close()

                                               }
                                           }>Save</Button>
                                       </DialogFooter>
                                   </DialogContent>
                               </Dialog>
                           </>




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