interface IService2Card {
    item: any
}

export function Service2Card({item}: IService2Card) {
    return (
        <>
            <div className="">
                <div className="grid place-items-center">

                    {item.isImage ? (
                        <div className=""><img src={`/images/${item.image}`} alt="" className="object-cover w-auto h-auto" /></div>
                    ) : (
                        <div className="relative max-w-[360px]">
                            <div className="absolute">
                                <img src={`/images/${item.bg}`} alt=""/>
                            </div>
                            <div className="relative pt-[55px] pb-0 px-[35px]">
                                <h3 className="font-bold text-xl text-center mb-5 text-dream ">{item.title}</h3>
                                <ul className="content space-y-4">
                                    {item.data.map((i:string,index:number) => (
                                        <li key={index} className="flex items-start gap-3">
                                            <img className="w-[20px] pt-2 " src={`/images/${item.icon}`} alt=""/>
                                            <span>{i}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    )}
                </div>

            </div>


        </>
    )
}