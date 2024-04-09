import {Shell} from "@/components/shells/shell";
import {PageHeader, PageHeaderDescription, PageHeaderHeading, PageHeaderShell} from "@/components/common/page-header";
import * as React from "react";
import {ScheduleShellTemplate} from "@/components/shells/schedule-shell";

export default function SchedulePage() {
    return (
        <>
            <Shell variant="sidebar" as="div">
                <PageHeaderShell separated>
                    <PageHeader className="flex-1">
                        <PageHeaderHeading size="sm">Schedule</PageHeaderHeading>
                        <PageHeaderDescription size="sm">
                            Manage all user schedule
                        </PageHeaderDescription>
                    </PageHeader>
                </PageHeaderShell>
                <ScheduleShellTemplate />
            </Shell>

        </>
    )
}