
import {DiscountShell} from "@/components/shells/discount-shell";
import {Shell} from "@/components/shells/shell";
import {PageHeader, PageHeaderDescription, PageHeaderHeading} from "@/components/common/page-header";
import * as React from "react";

export default function DiscountPage () {
    return (
        <>
            <Shell variant="sidebar" as="div">
                <PageHeader  separated>
                    <PageHeaderHeading size="sm">Discount</PageHeaderHeading>
                    <PageHeaderDescription size="sm">
                        Manage your discount and voucher
                    </PageHeaderDescription>
                </PageHeader>
                <DiscountShell />
            </Shell>
        </>
    )
}