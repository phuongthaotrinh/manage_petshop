import * as z from "zod";

export const formSchema = z.object({
    name: z.string().min(3, {
        message: "Username must be at least 3 characters.",
    }),
    status: z.boolean(),
    desc: z.string(),
    userId:z.string(),
    minTimeToDo: z.nullable(z.string()),
});




export const defaultVal = {
    name: "",
    status: true,
    desc: "",
    weightId:"",
    userId:"",
    minTimeToDo:null
}

export type servicesValidType = z.infer<typeof formSchema>;
