"use client";

import {DataTableSkeleton} from "@/components/common/data-table/components/data-table-skeleton";

const detail ={
    "username": "thaotp2109@gmail.com",
    "fullName": "Phuongthao Trinh",
    "phoneNumber": "0327072255",
    "roleId": "2",
    "dob": "2024-01-02T17:00:00.000Z",
    "images": [
        "https://res.cloudinary.com/dr9ebt5bg/image/upload/v1704736094/services-4_nsvdsf.jpg",
        "https://res.cloudinary.com/dr9ebt5bg/image/upload/v1704736095/services-3_aabonm.png"
    ],

    "city": "15",
    "district": "139",
    "ward": "4609",

    "email": "thaotp2109@gmail.com",
    "password": "dsfsdfsdfsdfsdf",
    "bio": "dsadasdasdasd",
    "socials": [
        {
            "url": "https://ui.shadcn.com/examples/forms2"
        },
        {
            "url": "https://ui.shadcn.com/examples/forms1"
        }
    ]
}

import {PageHeader, PageHeaderDescription, PageHeaderHeading} from "@/components/common/page-header";
import {CustommersForm} from "@/components/forms/custommers-form";
import {useForm} from "react-hook-form";
import {formSchema, ICustomers, intialValue} from "@/validations/customers";
import {zodResolver} from "@hookform/resolvers/zod";
import * as React from "react";
import {toast} from "react-hot-toast";
import {Shell} from "@/components/shells/shell";

export default function CustomerDetailPage() {


    const [date, setDate] = React.useState<Date>();
    const [citySelect, setCitySelect] = React.useState<string>("");
    const [districtSelect, setDistrictSelect] = React.useState<string>("")
    const [wardSelect, setWardSelect] = React.useState<string>("")
    const [images, setImages] = React.useState<string[]>([])
    const [data, setData] = React.useState(JSON.parse(JSON.stringify(detail)));

    const form = useForm<ICustomers>({
        resolver: zodResolver(formSchema),
        defaultValues: data,
        mode: "onChange"
    });

    React.useEffect(() => {
        if(data) {
            setImages(data.images);
            setCitySelect(data.city);
            setDistrictSelect(data.district);
            setWardSelect(data.ward);
            setDate(data.dob);
        }
    },[])


    const onSubmit = (values: ICustomers) => {

        values.city =citySelect;
        values.district =districtSelect;
        values.ward =wardSelect;
        values.images = images;

        if (date) values.dob = date;

        toast(JSON.stringify(values, undefined, 2));
        console.log(values)
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
                    Detail customers
                </PageHeaderDescription>
            </PageHeader>
                {/*<CustommersForm*/}
                {/*    onSubmit={onSubmit}*/}
                {/*    reset={reset}*/}
                {/*    date={date}*/}
                {/*    setDate={setDate}*/}
                {/*    form={form}*/}
                {/*    images={images}*/}
                {/*    setImages={setImages}*/}
                {/*    citySelect={citySelect}*/}
                {/*    districtSelect={districtSelect}*/}
                {/*    setDistrictSelect={setDistrictSelect}*/}
                {/*    setWardSelect={setWardSelect}*/}
                {/*    setCitySelect={setCitySelect}*/}
                {/*    wardSelect={wardSelect}*/}
                {/*    isEditMode={true}*/}
                {/*/>*/}

        </Shell>
    )
}