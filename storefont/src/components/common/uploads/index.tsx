"use client";


import * as React from "react";
import {Button} from "@/components/ui/button";
import {CldUploadWidget} from "next-cloudinary";
import {ImagePlus} from "lucide-react";
import {toast} from "react-hot-toast"

interface ImageUploadProps {
    onChange: (value: string) => void;
    max:number,
    value:string[]
}

export function Uploads({onChange, max, value }: ImageUploadProps) {

    const onUpload = (result: any) => {
        onChange(result?.info.secure_url);
    };

    return (
        <>
            <CldUploadWidget onUpload={onUpload} uploadPreset="c8zrj0fl">
                {({open}) => {
                    const onClick = () => {

                        if(max === value?.length) {
                            toast.error(`Đăng tối đa ${max} ảnh`)
                        }else{
                            open();
                        }
                    };

                    return (
                        <>
                            <Button
                                type="button"
                                onClick={onClick}
                                variant="outline"
                                disabled={(max === value?.length)}
                            >
                                <div className="flex items-center h-fit">
                                    <ImagePlus className="h-4 w-4 mr-2"/>
                                    <span className="text-primary"> Upload an Image</span>
                                </div>
                            </Button>

                        </>
                    );
                }}
            </CldUploadWidget>
        </>


    )
}