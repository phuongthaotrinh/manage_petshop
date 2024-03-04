import {PageHeader, PageHeaderDescription, PageHeaderHeading} from "@/components/common/page-header";
import { ProductTableShell} from "@/components/shells/product-shell";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {Shell} from "@/components/shells/shell";
import * as React from "react";
import {rawProduct} from "@/constants/fakeData"



export default function ProductsPage() {
    return (
        <>

            <Shell variant="sidebar" as="div">
                <PageHeader separated>
                    <PageHeaderHeading size="sm">Products</PageHeaderHeading>
                    <PageHeaderDescription size="sm">
                        Manage your products
                    </PageHeaderDescription>
                </PageHeader>
                <div className="w-full">
                    <Tabs defaultValue="list" className="relative">
                        <TabsList className="relative">
                            <TabsTrigger value="list">List Products</TabsTrigger>
                            <TabsTrigger value="draf">Draf Products</TabsTrigger>
                        </TabsList>
                        <TabsContent value="list" className="relative">
                           <div className=" p-0 ">
                               <ProductTableShell data={rawProduct} />
                           </div>
                        </TabsContent>
                        <TabsContent value="draf">
                            Show Draf product table here
                        </TabsContent>
                    </Tabs>
                </div>
            </Shell>
        </>
    )
}