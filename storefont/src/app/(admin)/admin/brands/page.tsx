
import {Shell} from "@/components/shells/shell";
import * as React from "react";
import {BrandsShell} from "@/components/shells/brands-shell";
import {PageHeader, PageHeaderDescription, PageHeaderHeading, PageHeaderShell} from "@/components/common/page-header";
import {Button} from "@/components/ui/button";
import Link from "next/link";
export default function BrandsPages() {
    return (
        <>
            <Shell variant="sidebar" as="div">
                <PageHeaderShell separated>
                    <PageHeader className="flex-1">
                        <PageHeaderHeading size="sm">Brands</PageHeaderHeading>
                        <PageHeaderDescription size="sm">
                            Manage your brands
                        </PageHeaderDescription>
                    </PageHeader>
                </PageHeaderShell>
                <BrandsShell />
            </Shell>
        </>
    )
}

