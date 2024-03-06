interface IServiceCard {
    item:any
}
export function ServiceCard ({item}:IServiceCard) {
    return (
        <div className="text-center">

                <div className=" w-full grid place-items-center">
                    <div title={item.title}>
                        <img src={`/images/${item.image}`} alt={item.title}
                             className="max-w-[233px] h-[233px] object-cover"/>
                    </div>
                </div>
                <div className="space-y-5 p-2 grid place-items-center ">
                    <h3 className="capitalize font-bold text-center text-lg hover:text-dreamOrange cur">
                        <p title={item.title}>
                            {item.title}
                        </p>
                    </h3>
                    <p className="text-base font-medium text-center max-w-[250px]">
                        {item.desc}
                    </p>
                </div>
        </div>
    )
}