'use client'
import type { FileWithPreview } from "@/types";
import * as React from "react";
import Image from "next/image";
import { MediumZoom } from "@/components/common/zoom";
import { FileDialog } from "@/components/common/uploads/file-dialog";
import {FormItems} from "@/components/forms/product-new/index2";



type IUploadThumbnail = {
    updateForm: (fieldToUpdate: Partial<FormItems>) => void;
    formData:FormItems,
    isUploading:boolean,
    files: FileWithPreview[] | null,
    setFiles: React.Dispatch<React.SetStateAction<FileWithPreview[] | null>>

};
export function UploadThumbnail({updateForm, formData,isUploading, files,setFiles }: IUploadThumbnail) {

    const [isPending, startTransition] = React.useTransition()


    React.useMemo(() => {
        if(files) {
            updateForm({thumbnail:[...formData.thumbnail!!, files[0]]})
        }
    },[files])

    return (
        <div>
            {files?.length ? (
                            <div className="flex items-center gap-2">
                                {files?.map((file, i) => (
                                    <MediumZoom key={i}>
                                        <Image
                                            src={file.preview}
                                            alt={file.name}
                                            className="size-20 shrink-0 rounded-md object-cover object-center"
                                            width={80}
                                            height={80}
                                        />
                                        <></>
                                    </MediumZoom>
                                ))}
                            </div>
                        ) : null}
                            <FileDialog
                                name="images"
                                maxFiles={1}
                                maxSize={1024 * 1024 * 2}
                                files={files}
                                setFiles={setFiles}
                                isUploading={isUploading}
                                disabled={isPending}
                            />

        </div>
    )
}