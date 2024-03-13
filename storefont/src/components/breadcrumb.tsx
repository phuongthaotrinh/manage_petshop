 import {cn} from "@/lib/utils"


export interface BreadcrumbType {
    name: string,
    href?: string,
    isCurrent:boolean
}
interface BreadcrumbProps {
    data:BreadcrumbType[] | Omit<BreadcrumbType, "href">
}


export function Breadcrumb({data}:{data:BreadcrumbProps[]}) {
    return (
        <>

            <nav className="flex" aria-label="Breadcrumb">
                <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
                    {data && data?.map((i:any, j:any) => (
                        <li key={j}>
                            <div className="flex items-center">
                                {j !== 0 &&  <svg className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 6 10">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 9 4-4-4-4"/>
                                </svg>}

                                    <a href={i?.href} className={cn("ms-1 text-sm font-medium  md:ms-2",{
                                        "text-gray-700": !i.isCurrent,
                                        "text-dreamOrange": i.isCurrent,
                                        'text-muted-foreground hover:text-blue-600 ':i?.href
                                    })}>
                                        {i?.name}
                                    </a>
                            </div>
                        </li>
                    ))}
                </ol>
            </nav>

        </>
    )
}