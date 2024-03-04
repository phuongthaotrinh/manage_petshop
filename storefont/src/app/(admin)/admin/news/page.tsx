import {PageHeader, PageHeaderDescription, PageHeaderHeading} from "@/components/common/page-header";
import * as React from "react";
import {DataTableSkeleton} from "@/components/common/data-table/components/data-table-skeleton";
import {NewsShell} from "@/components/shells/news-shell"
import {Shell} from "@/components/shells/shell"

export default function NewsPage() {
    return (
        <Shell variant="sidebar" as="div">
            <PageHeader  separated>
                <PageHeaderHeading size="sm">News</PageHeaderHeading>
                <PageHeaderDescription size="sm">
                    Manage your post
                </PageHeaderDescription>
            </PageHeader>
                <NewsShell />
        </Shell>
    )
}