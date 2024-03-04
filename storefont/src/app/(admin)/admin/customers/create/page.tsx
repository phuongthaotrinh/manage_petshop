"use client";
import {PageHeader, PageHeaderHeading, PageHeaderDescription} from "@/components/common/page-header";
import {CustommersForm} from "@/components/forms/custommers-form";
import {useForm} from "react-hook-form";
import {formSchema, ICustomers, intialValue} from "@/validations/customers";
import {zodResolver} from "@hookform/resolvers/zod";
import * as React from "react";
import {toast} from "react-hot-toast";
import {Shell} from "@/components/shells/shell";
import {useRouter} from "next/navigation";
import {catchError} from "@/lib/helpers";


export default function CustomerCreatePage() {

    const router = useRouter()
    const form = useForm<Omit<ICustomers, "_id">>({
        resolver: zodResolver(formSchema),
        defaultValues: intialValue,
        mode: "onChange"
    });

    const [date, setDate] = React.useState<Date>();
    const [citySelect, setCitySelect] = React.useState<string>("");
    const [districtSelect, setDistrictSelect] = React.useState<string>("")
    const [wardSelect, setWardSelect] = React.useState<string>("")
    const [images, setImages] = React.useState<string[]>([])
    const [isPending, startTransition] = React.useTransition()

    const onSubmit =  (values: Omit<ICustomers, "_id">) => {

        if (date) values.dob = date;
        console.log('payload', values);

    };





    const reset = () => {
        form.reset(intialValue);
        setCitySelect("");
        setDistrictSelect("");
        setWardSelect("");
        setImages([])
    }


    return (
        <Shell variant="sidebar" as="div">
               <PageHeader  separated>
                   <PageHeaderHeading size="sm">Customers</PageHeaderHeading>
                   <PageHeaderDescription size="sm">
                       Create customers
                   </PageHeaderDescription>
               </PageHeader>

            <CustommersForm onSubmit={onSubmit}
                            reset={reset} date={date} setDate={setDate}
                            form={form} images={images} setImages={setImages}
                            citySelect={citySelect} districtSelect={districtSelect}
                            setDistrictSelect={setDistrictSelect} setWardSelect={setWardSelect}
                            setCitySelect={setCitySelect}
                            wardSelect={wardSelect}
                            isEditMode={false}

            />
        </Shell>
    )
}