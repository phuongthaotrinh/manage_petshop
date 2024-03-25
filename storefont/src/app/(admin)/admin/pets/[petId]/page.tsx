import {Shell} from "@/components/shells/shell";
import {PageHeader, PageHeaderDescription, PageHeaderHeading, PageHeaderShell} from "@/components/common/page-header";
import * as React from "react";
import PetsServiceTemplate from "@/components/admin/services/petServiceTemplate";
import Link from "next/link";
import {Button} from "@/components/ui/button";

export default function PetsService(){
    return (
        <Shell variant="default" as="div" >
            <PageHeaderShell separated>
                <PageHeader className="flex-1">
                    <PageHeaderHeading size="sm">Pets service</PageHeaderHeading>
                    <PageHeaderDescription size="sm">
                        Manage your pets and price
                    </PageHeaderDescription>
                </PageHeader>
                <Button variant="link">
                    <Link href="/admin/services/pets" className="flex items-center gap-3">
                       Back
                    </Link>
                </Button>
            </PageHeaderShell>
            <PetsServiceTemplate />
        </Shell>

    )
}