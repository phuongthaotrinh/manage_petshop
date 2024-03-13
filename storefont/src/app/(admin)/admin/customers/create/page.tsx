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

    const form = useForm<Omit<ICustomers, "_id">>({
        resolver: zodResolver(formSchema),
        defaultValues: intialValue,
        mode: "onChange"
    });

    const [date, setDate] = React.useState<Date>();
    const [images, setImages] = React.useState<string[]>([])
    const [isPending, startTransition] = React.useTransition();
    const [userProvince, setUserProvince] = React.useState({})




    const onSubmit =  (values: Omit<ICustomers, "_id">) => {

        if (date) values.dob = date;
        console.log('payload', values);

    };

    const updateProvince = (value:any) => {
        const payload = {...userProvince, ...value};
        setUserProvince(payload)
    }




    const reset = () => {
        form.reset(intialValue);

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
                            updateProvince={updateProvince}
                            userProvince={userProvince}
                            isEditMode={false}

            />
        </Shell>
    )
}