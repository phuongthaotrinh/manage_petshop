import * as z from "zod";

export const formSchema = z.object({
    _id:z.string(),
    username: z
        .string()
        .min(2, {
            message: "Username must be at least 2 characters.",
        })
        .max(30, {
            message: "Username must not be longer than 30 characters.",
        }),
    fullName: z
        .string()
        .min(2, {
            message: "Username must be at least 2 characters.",
        })
        .max(30, {
            message: "Username must not be longer than 30 characters.",
        }),
    phoneNumber: z.string(),
    role: z.string(),
    dob: z.date({
        required_error: "A date of birth is required.",
    }).optional(),
    images: z.any().optional(),

    city: z.string(),
    district: z.string(),
    ward: z.string(),

    email: z
        .string({
            required_error: "Please select an email to display.",
        })
        .email(),
    password: z.string().min(4),
    bio: z.string().max(160).optional(),
    socials: z
        .array(
            z.object({
                url: z.string(),
            })
        )
        .optional(),
    status:z.string(),

});


export type ICustomers = z.infer<typeof formSchema>

export const intialValue: Partial<ICustomers> = {
        username: "",
        phoneNumber: "",
        role:"",
        images: [],
        city: "",
        ward: "",
        district: "",
        email: "",
        password: "",
        dob: new Date("2023-01-23"),
        bio: "",
        socials: [],
        fullName: "",
        status:""
}