import * as React from "react";
import {Shell} from "@/components/shells/shell"
import {PageHeader,PageHeaderHeading, PageHeaderDescription} from "@/components/common/page-header";
import {ServicesDetailTemplate} from "@/components/admin/services/services-detail";

interface IParams{
    params: {
        service_id: string
    }
}

export default function ServiceDetail({params}:IParams) {

    return (
        <Shell variant="markdown" as="div">
            <PageHeader separated>
                <PageHeaderHeading size="sm">Services</PageHeaderHeading>
                <PageHeaderDescription size="sm">
                    Manage your service and subscription
                </PageHeaderDescription>
            </PageHeader>
            <ServicesDetailTemplate params={params} />
        </Shell>
    )
}