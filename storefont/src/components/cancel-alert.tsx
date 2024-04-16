'use client';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle
} from "@/components/ui/alert-dialog"
import * as React from "react";

interface CancelAlertProps {
    title:string,
    desc?:string,
    cancelBtnText?:string,
    actionBtnText?:string,
    handleOk?:() => void,
    open:boolean,
    setOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export function CancelAlert({title, desc, cancelBtnText, actionBtnText,handleOk, open, setOpen}:CancelAlertProps) {

    return (
        <AlertDialog open={open}>
            <AlertDialogContent>
                <AlertDialogHeader>
                    <AlertDialogTitle>{title}</AlertDialogTitle>
                    {desc  && <AlertDialogDescription>{desc}</AlertDialogDescription>}
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={() =>setOpen(false)}>{cancelBtnText ? cancelBtnText : "Cancel"}</AlertDialogCancel>
                    <AlertDialogAction onClick={handleOk}>
                        {actionBtnText ? actionBtnText: "OK"}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
