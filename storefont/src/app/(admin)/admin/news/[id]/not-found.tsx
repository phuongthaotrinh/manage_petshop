import { ErrorCard } from "@/components/card/error-card"
import { Shell } from "@/components/shells/shell"

interface ProductNotFoundProps {
    params: {
        id: string
    }
}

export default function ProductNotFound({ params }: ProductNotFoundProps) {
    const storeId = Number(params.id)

    return (
        <Shell variant="centered" className="max-w-md">
            <ErrorCard
                title="Post not found"
                description="The product may have expired or you may have already updated your product"
                retryLink={`/dashboard/stores/${storeId}/products`}
                retryLinkText="Go to Products"
            />
        </Shell>
    )
}