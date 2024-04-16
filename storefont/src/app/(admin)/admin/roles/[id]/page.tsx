import {Shell} from "@/components/shells/shell";
import {PageHeader, PageHeaderDescription, PageHeaderHeading, PageHeaderShell} from "@/components/common/page-header";
import * as React from "react";
import {RoleDetailTemplate} from "@/components/role-template";

interface IParams{
    params: {id: string}
}
export default function RoleIDPage({params}: IParams) {

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
                <RoleDetailTemplate id={params.id.toString()} />
            </Shell>

        </>
    )
}