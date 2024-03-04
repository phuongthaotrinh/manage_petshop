import {PageHeader, PageHeaderDescription, PageHeaderHeading} from "@/components/common/page-header";
import {UserTableShell} from "@/components/shells/user-shell";
import * as React from "react";
import {DataTableSkeleton} from "@/components/common/data-table/components/data-table-skeleton";
import {Shell} from "@/components/shells/shell";


export default function CustomersPage() {

    return (
        <>
            <Shell variant="sidebar" as="div">
                <PageHeader  separated>
                    <PageHeaderHeading size="sm">Customers</PageHeaderHeading>
                    <PageHeaderDescription size="sm">
                        Detail customers
                    </PageHeaderDescription>
                </PageHeader>
                    <React.Suspense fallback={<DataTableSkeleton columnCount={6} />}>
                    <UserTableShell/>
                  </React.Suspense>
            </Shell>
        </>
    )
}
