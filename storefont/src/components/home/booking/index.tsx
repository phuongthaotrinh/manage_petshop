import React from "react";
import {BookingForm} from "@/components/forms/booking-form";
import {formSchema, IBooking, initialValue} from "@/validations/booking";
import {toast} from "react-hot-toast";
import {useForm} from "react-hook-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {HeroBooking} from "@/components/home/booking/components/hero";

export function Booking () {
    const [date, setDate] = React.useState<Date>();

    const onSubmit = (values: IBooking) => {
        if(date){
            values.booking_time = date
        }
        toast(JSON.stringify(values, undefined,2))
    };

    const form = useForm<IBooking>({
        resolver: zodResolver(formSchema),
        defaultValues: initialValue
    })
    return (
        <section className="grid grid-cols-2 gap-10 container">
            <section className="booking_info">
                <HeroBooking />
            </section>
            <section className="booking_form bg-[#feeeef] rounded-lg">
                <BookingForm form={form} onSubmit={onSubmit} date={date} setDate={setDate} />
            </section>
        </section>
    )
}