    'use client'
    import {ScrollArea, ScrollBar} from "@/components/ui/scroll-area";
    import * as React from "react";
    import "react-medium-image-zoom/dist/styles.css"
    import {MediumZoom} from "@/components/common/zoom";
    import Image from "next/image";


    interface IRenderImage {
        images:string[],
        setImages:  React.Dispatch<React.SetStateAction<any[] | null>> | React.Dispatch<React.SetStateAction<string[]>>,
        isPreviewMode:boolean
    }
    export function RenderImage ({images,setImages, isPreviewMode}:IRenderImage) {
        return (
            <>
                <ScrollArea className="upload_image_render flex gap-6 w-full whitespace-nowrap rounded-md my-3 relative" >
                    <div className="flex gap-3 items-center z-999">
                        {images && images.map((item:string, index:number) => (
                            <MediumZoom key={index}>
                                <div key={index} className="inline-block h-44 w-[150px] relative border border-gray-300 p-2 rounded "
                                >
                                    <Image src={item} key={index} alt="" width={80} height={80} className="h-full w-full object-cover"/>
                                    {!isPreviewMode && (
                                        <div className="absolute top-1 -right-2 z-20"
                                             onClick={() => {
                                                 const newArr = images.filter((_,idx:number) => idx !== index);
                                                 setImages(newArr);
                                             }}>
                                            <div className="cursor-pointer w-6 h-6 rounded-full bg-dreamOrange text-white text-center ">X</div>
                                        </div>
                                    )}

                                </div>

                            </MediumZoom>
                        ))}
                    </div>
                    <ScrollBar orientation="horizontal" />
                </ScrollArea>



            </>
        )
    }