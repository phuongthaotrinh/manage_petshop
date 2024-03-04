import * as z from "zod";

export const signInSchema = z.object({
    email: z
        .string({
            required_error: "Please select an email to display.",
        })
        .email(),
    password: z.string().min(6),
})

export const signUpSchema = z.object({
    password: z.string().min(6),
    verify: z.string().min(6),
    name: z.string().min(6).max(50),
    email: z
        .string({
            required_error: "Please select an email to display.",
        })
        .email(),
}).refine((data) => data.password === data.verify , {
    message: "Password dont matach",
    path: ["verify"]
})
export const intialValue = {
    name:"",
    email:"",
    password:"",
    verify:""
}
export type ILoginForm = z.infer<typeof signInSchema>;
export type IRegisterForm = Pick<ILoginForm, 'email' | 'password'>;


