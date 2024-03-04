import {PageHeader, PageHeaderHeading, PageHeaderDescription, PageHeaderShell} from "@/components/common/page-header";
import * as React from "react";
import { Shell } from "@/components/shells/shell";
import StoreInfoForm from "@/components/forms/store-info-form";
export default function StorePagePayment() {
    return (
        <Shell variant="sidebar" as="div">
            <PageHeaderShell separated>
                <PageHeader className="flex-1">
                    <PageHeaderHeading size="sm">Payment</PageHeaderHeading>
                    <PageHeaderDescription size="sm">
                        Manage your payment
                    </PageHeaderDescription>
                </PageHeader>
            </PageHeaderShell>
            <div>
                Payment
            </div>
        </Shell>

    )
}