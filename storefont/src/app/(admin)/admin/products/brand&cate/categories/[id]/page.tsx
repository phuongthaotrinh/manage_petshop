'use client'
import {Shell} from "@/components/shells/shell";
import {PageHeader, PageHeaderDescription, PageHeaderHeading, PageHeaderShell} from "@/components/common/page-header";
import * as React from "react";
import {useParams, usePathname, useRouter} from "next/navigation";
import {useForm} from "react-hook-form";
import { defaultBrand, formSchema, brandValidType} from "@/validations/brands";
import {zodResolver} from "@hookform/resolvers/zod";
import {
    useCreateCategory,
    useGetCategoryDetail,
    useUpdateCategory
} from "@/actions/queries/brand&categories";
import {catchError, setValuesOfForm} from "@/lib/helpers";
import {CategoryForms} from "@/components/forms/category-form";
import {Tree, TreeDataItem} from "@/components/tree-select";
import {PawPrint} from "lucide-react";
import {Button} from "@/components/ui/button";
import {
    ResizableHandle,
    ResizablePanel,
    ResizablePanelGroup,
} from "@/components/ui/resizable"
import {toast} from "react-hot-toast";

export default function BrandCreateOrUpdate(){

    const {id} = useParams();
    const [images, setImages]  = React.useState<string[]>([]);
    const { mutateAsync:createFn } = useCreateCategory();
    const {mutateAsync:updateFn} = useUpdateCategory()
    const {data:detail, isPending} = useGetCategoryDetail(id.toString());
    const [itemSelected,setItemSelected] = React.useState<TreeDataItem | undefined>()
    const [parentInCreate,setParentInCreate] = React.useState<any>();
    const [_, startTransition] = React.useTransition()


    const [parentSelected, setParentSelected] = React.useState<any>();
    const router = useRouter();





    React.useLayoutEffect(() => {
        if(itemSelected && itemSelected._id !== id){
            router.push(`/admin/products/brand&cate/categories/${itemSelected?._id}`);
        }
    },[itemSelected, id])


    const form = useForm<brandValidType>({
        resolver: zodResolver(formSchema),
        defaultValues: defaultBrand,
        mode:"onTouched"
    })

    React.useEffect(() => {
        if(id !=="create" && detail){
            setValuesOfForm(detail, form);
            setImages(detail?.images)
        }
    },[detail, id])

    const onSubmit = (value:any) => {
        value.images = images;

        if(id=="create") {
            value.parent = parentInCreate ? parentInCreate?._id : null;
            startTransition(() => {
                        toast.promise(createFn(value), {
                            loading: "Loading...",
                            success:() => {
                                form.reset();
                                setImages([])
                                return "Create success"
                            },
                            error:(err) => catchError(err)
                        })
                    })

        }else{
            value.id = id;
            console.log('submit', value)
        }



        // if(id === "create") {
        //     startTransition(() => {
        //         toast.promise(createFn(value), {
        //             loading: "Loading...",
        //             success:() => {
        //                 form.reset();
        //                 setImages([])
        //                 return "Create success"
        //             },
        //             error:(err) => catchError(err)
        //         })
        //     })
        // }else{
        //     startTransition(() => {
        //         toast.promise(updateFn({...value,id:id}), {
        //             loading: "Updating...",
        //             success:() => {
        //                 return "Update success"
        //             },
        //             error:(err) => catchError(err)
        //         })
        //     })
        // }
    }


    const handleUpdate = (value:any) => {
        router.push(`/admin/products/brand&cate/categories/${value?._id}`);
    }




    return (
        <Shell variant="sidebar" as="div">
            <PageHeaderShell separated>
                <PageHeader className="flex-1">
                    <PageHeaderHeading size="sm">Categories</PageHeaderHeading>
                    <PageHeaderDescription size="sm">
                        {id == "create" ? "Create" : `Update`} category
                    </PageHeaderDescription>

                </PageHeader>
                <Button variant="link" onClick={() => router.back()}>
                    Back
                </Button>
            </PageHeaderShell>

            {id !=="create" && detail ? (



                <ResizablePanelGroup  direction="horizontal"  >
                    <ResizablePanel defaultSize={75}>
                       <div className={"w-full p-4"}>
                           <CategoryForms form={form}
                                          onSubmit={onSubmit}
                                          images={images}
                                          setImages={setImages}
                                          showImage={true}
                                          categories={[]}
                                          setParentSelected={setParentSelected}
                                          mode="edit"
                           />
                       </div>
                    </ResizablePanel>
                    <ResizableHandle withHandle />
                    <ResizablePanel defaultSize={25}>

                        <Tree
                            data={[detail]}
                            initialSlelectedItemId="f12"
                            onSelectChange={(item) => {
                                setItemSelected(item)
                            }}
                            className="h-auto min-h-screen"
                            folderIcon={PawPrint}
                            itemIcon={PawPrint}

                        />

                    </ResizablePanel>
                </ResizablePanelGroup>
            ):
                <CategoryForms form={form}
                               onSubmit={onSubmit}
                               images={images}
                               setImages={setImages}
                               showImage={true}
                               categories={[]}
                               setParentSelected={setParentSelected}
                               mode="create"
                               setParentInCreate={setParentInCreate}
                />
            }


        </Shell>
    )
}