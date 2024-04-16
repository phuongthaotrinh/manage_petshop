import {PageHeader, PageHeaderDescription, PageHeaderHeading} from "@/components/common/page-header";
import {Shell} from "@/components/shells/shell";
import * as React from "react";
import {DiscountDetailTemplate} from "@/components/admin/discount";

export default function DetailVoucherPage() {
    return (
        <>
            <Shell variant="sidebar" as="div">
                <PageHeader  separated>
                    <PageHeaderHeading size="sm">Detail Discount</PageHeaderHeading>
                    <PageHeaderDescription size="sm">
                        Manage your discount and voucher
                    </PageHeaderDescription>
                </PageHeader>
                <DiscountDetailTemplate />
            </Shell>

        </>
    )
}