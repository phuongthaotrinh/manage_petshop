import {PetsShell} from "@/components/shells/pets-shell"
import {Shell} from "@/components/shells/shell";
import {PageHeader, PageHeaderDescription, PageHeaderHeading, PageHeaderShell} from "@/components/common/page-header";
import * as React from "react";
import {PetsWeightBtn} from "@/components/admin/services/pets-weight-btn";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {MoveLeft} from "lucide-react";

export default function PetPages() {

    return (
        <>
            <Shell variant="sidebar" as="div">
                <PageHeaderShell separated>
                    <PageHeader className="flex-1">
                        <PageHeaderHeading size="sm">Pets</PageHeaderHeading>
                        <PageHeaderDescription size="sm">
                            Manage your pets and price
                        </PageHeaderDescription>
                    </PageHeader>
                    <div className="flex items-center justify-end gap-3">
                        <PetsWeightBtn />
                        <Button variant="outline">
                            <Link href="/admin/services" className="flex items-center gap-3">
                                <MoveLeft className="flex items-center mr-2"/>Back
                            </Link>
                        </Button>
                    </div>
                </PageHeaderShell>
                <PetsShell />
            </Shell>
            
        </>
    )
}