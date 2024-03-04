import * as z from "zod";
import { format } from "date-fns";

export const formSchema = z.object({
    username: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    phoneNumber:z.string(),
    type:z.string(),
    storeId:z.string(),
    cat_service:z.string(),
    dog_service:z.string(),
    booking_time: z.any(),
});


export type IBooking = z.infer<typeof formSchema>

export const initialValue: Omit<IBooking, 'booking_time'> = {
    username: "",
    phoneNumber: "",
    type: "",
    storeId:"",
    cat_service: "",
    dog_service: "",
}