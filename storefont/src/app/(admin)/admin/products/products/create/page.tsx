import * as React from "react";
import {Shell} from "@/components/shells/shell";
import ProductNew from "@/components/forms/product-new";

export default function ProductCreatePage() {
    return (
        <>
            <Shell variant="markdown" as="div">
                <ProductNew />
            </Shell>
        </>
    )
}