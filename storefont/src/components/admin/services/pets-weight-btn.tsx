'use client';

import {Button} from "@/components/ui/button";
import * as React from "react";
import { Dumbbell } from 'lucide-react';
import {PetsWeightShell} from "@/components/shells/pets-weight-shell"
import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
} from "@/components/ui/sheet"


export  function PetsWeightBtn() {

    const [open, setOpen] = React.useState(false);


    return (
        <>
            <div className="flex justify-end">
                <Button variant="default" onClick={() => setOpen(true)} >
                        <Dumbbell className="mr-2 h-4 w-4" />Your pets weight
                </Button>
            </div>

                    <Sheet open={open} onOpenChange={setOpen}>
                        <SheetContent side="bottom">
                           <div className="h-[80vh]">
                               <SheetHeader>
                                   <SheetTitle >Pets Weight</SheetTitle>
                               </SheetHeader>
                               <div className="grid gap-4 py-4">
                                    <PetsWeightShell />
                               </div>
                           </div>
                        </SheetContent>
                    </Sheet>

        </>
    )
}