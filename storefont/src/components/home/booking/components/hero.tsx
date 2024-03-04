import React from "react";
import {stores} from "@/constants/fakeData";
import {} from 'lucide-react'
export function HeroBooking() {
    return (
        <div className="p-[30px] space-y-5">
            <div>
                <div
                    className="text-center w-full relative capitalize text-dreamOrange text-3xl font-[1100] font-lemon tracking-wide select-text">
                    ĐẶT LỊCH NGAY QUA HOTLINE
                </div>

                <p className="text-lg my-12">Quý khách vui lòng đặt lịch với chúng tôi trước khi đưa thú cưng tới sử dụng dịch vụ để đảm bảo chúng tôi
                    luôn sắp xếp nhân sự để phục vụ quý khách tốt nhất</p>
            </div>

            <div className="store space-y-5">
                {stores.map((item,index) => (
                    <div className="conten_info flex items-center gap-12" key={index}>
                        <div className="item-info">
                            <img src="//bizweb.dktcdn.net/100/467/317/themes/881347/assets/icon_home.png?1701914025229" alt="icon" className="w-[75px] h-[75px]" />
                            <div className="chinhanh_inf">
                                CHI NHÁNH {index + 1}
                            </div>
                        </div>
                        <div className="info-cn max-w-[330px] text-xl text-dream">
                            <ul className="list-disc"><li className="max-w-sm">Địa chỉ: {item.name}</li></ul>
                        </div>
                    </div>
                ))}
            </div>

            <div>
                <div
                    className=" w-full relative text-dream text-xl font-[1100] font-lemon tracking-wide select-text">
                    ĐẶT LỊCH NGAY QUA HOTLINE
                </div>
            </div>
        </div>
    )
}