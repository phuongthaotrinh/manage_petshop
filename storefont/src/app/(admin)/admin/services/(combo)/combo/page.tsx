import {Shell} from "@/components/shells/shell";
import {PageHeader, PageHeaderDescription, PageHeaderHeading, PageHeaderShell} from "@/components/common/page-header";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import {MoveLeft} from "lucide-react";
import * as React from "react";
import {ServiceComboForm} from "@/components/forms/service-combo-form";

export default function ComboPage() {
    return (
        <Shell variant="sidebar" as="div">
            <PageHeaderShell separated>
                <PageHeader className="flex-1">
                    <PageHeaderHeading size="sm">Combo Service</PageHeaderHeading>
                    <PageHeaderDescription size="sm">
                        Setting combo service
                    </PageHeaderDescription>
                </PageHeader>
                <div className="flex items-center justify-end gap-3">
                    <Button variant="outline">
                        <Link href="/admin/services" className="flex items-center gap-3">
                            <MoveLeft className="flex items-center mr-2"/>Back
                        </Link>
                    </Button>
                </div>
            </PageHeaderShell>
            <ServiceComboForm />

        </Shell>
    )
}