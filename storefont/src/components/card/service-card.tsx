import Link from "next/link";

interface IServiceCard {
    item:any
}
export function ServiceCard ({item}:IServiceCard) {
    return (
        <>
            <div className="keen-slider__slide">
                <div className="text-center w-full grid place-items-center">
                    <Link href={item.link} title={item.title}>
                        <img src={`/images/${item.image}`} alt={item.title}
                             className="max-w-[233px] h-[233px] object-cover"/>
                    </Link>
                </div>
                <div className="space-y-5 p-2 ">
                    <h3 className="capitalize font-bold text-center text-lg hover:text-dreamOrange">
                        <Link href={item.link} title={item.title}>
                            {item.title}
                        </Link>
                    </h3>
                    <p className="text-base font-medium text-center">
                        {item.desc}
                    </p>
                </div>
            </div>
        </>
    )
}