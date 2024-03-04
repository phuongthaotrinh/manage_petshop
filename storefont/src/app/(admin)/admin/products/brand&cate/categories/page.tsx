import {PageHeader, PageHeaderDescription, PageHeaderHeading, PageHeaderShell} from "@/components/common/page-header";
import {Shell} from "@/components/shells/shell";
import * as React from "react";
import {CategoriesShell} from "@/components/shells/categories-shell";

export default function CategoriesPage() {
    return (
        <Shell variant="sidebar" as="div">
            <PageHeaderShell separated>
                <PageHeader className="flex-1">
                    <PageHeaderHeading size="sm">Categories</PageHeaderHeading>
                    <PageHeaderDescription size="sm">
                        Manage your categories
                    </PageHeaderDescription>
                </PageHeader>
            </PageHeaderShell>
            <CategoriesShell />
        </Shell>
    )
}