'use client'
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {PawPrint} from "lucide-react";
import * as React from "react";
import {usePathname} from "next/navigation";

export default function PetsRedirectBtn() {
    const pathname = usePathname()

    return (
        <>
            <div className="flex justify-end">
                <Button variant="default"  >
                    <Link href={`${pathname}/pets`} className="flex">
                        <PawPrint className="mr-2 h-4 w-4" />Your Pets
                    </Link>
                </Button>
            </div>
        </>
    )
}