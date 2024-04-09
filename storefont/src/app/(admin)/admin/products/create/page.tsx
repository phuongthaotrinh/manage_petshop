import * as React from "react";
import {Shell} from "@/components/shells/shell";
import ProductNew from "@/components/forms/product-new/index2";

export default function ProductCreatePage() {
    return (
        <>
            <Shell variant="sidebar"  className="p-0 md:p-0">
                <ProductNew />
            </Shell>
        </>
    )
}