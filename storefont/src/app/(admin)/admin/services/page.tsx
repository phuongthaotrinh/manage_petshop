import {PageHeader, PageHeaderHeading, PageHeaderDescription, PageHeaderShell} from "@/components/common/page-header";
import * as React from "react"
import {ServiceShellTemplate} from "@/components/shells/services-shell";
import { Shell } from "@/components/shells/shell"
import PetsRedirectBtn from "@/components/admin/services/pets-redirect-btn";
import {PetsWeightBtn} from "@/components/admin/services/pets-weight-btn";
import {Tabs, TabsContent, TabsList, TabsTrigger} from "@/components/ui/tabs";
import {ServiceComboShell} from "@/components/shells/services-shell/service-combo-shell";

export default function ServicesPage() {
    return (
        <>
        <Shell variant="sidebar" as="div">
            <div className="w-full">
                <Tabs defaultValue="service" >
                    <TabsList>
                        <TabsTrigger value="service">Service</TabsTrigger>
                        <TabsTrigger value="combo">Service Combo</TabsTrigger>
                    </TabsList>
                    <TabsContent value="service">
                        <Shell variant="sidebar" as="div" >
                            <PageHeaderShell separated>
                                <PageHeader className="flex-1">
                                    <PageHeaderHeading size="sm">Services</PageHeaderHeading>
                                    <PageHeaderDescription size="sm">
                                        Manage your services
                                    </PageHeaderDescription>
                                </PageHeader>
                                <div className="flex items-center justify-end gap-3">
                                    {/*<PetsWeightBtn />*/}
                                    <PetsRedirectBtn />
                                </div>
                            </PageHeaderShell>
                            <ServiceShellTemplate />
                        </Shell>

                    </TabsContent>
                    <TabsContent value="combo">
                        <ServiceComboShell />
                    </TabsContent>
                </Tabs>
            </div>
        </Shell>
        </>
    )
}