import Link  from "next/link"

export default function DiscountPage () {
    return (
        <>
            <Link href={`/admin/discount/create`}>
                Create Discount
            </Link>

        </>
    )
}