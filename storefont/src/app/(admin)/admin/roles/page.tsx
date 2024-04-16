import {Shell} from "@/components/shells/shell";
import {PageHeader, PageHeaderDescription, PageHeaderHeading, PageHeaderShell} from "@/components/common/page-header";
import * as React from "react";
import {RoleTemplate} from "@/components/shells/roles-shell";

export default function RolePage() {
    return (
        <>
            <Shell variant="sidebar" as="div">
                <PageHeaderShell separated>
                    <PageHeader className="flex-1">
                        <PageHeaderHeading size="sm">Roles</PageHeaderHeading>
                        <PageHeaderDescription size="sm">
                            Manage all Role and role&apos;s permissions
                        </PageHeaderDescription>
                    </PageHeader>
                </PageHeaderShell>
               <RoleTemplate />
            </Shell>

        </>
    )
}