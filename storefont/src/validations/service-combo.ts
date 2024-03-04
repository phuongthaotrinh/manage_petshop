import * as z from "zod";



export const formSchema = z.object({
    name: z.string().min(3, {
        message: "Username must be at least 3 characters.",
    }),
    status: z.boolean(),
    desc: z.string(),
    userId:z.string(),
    serviceData:z.array(z.string()),
    images:z.array(z.any()),
    price: z.string()
});

export const defaultValue = {
    name: "",
    images:[],
    status:true,
    desc:"",
    serviceData:[],
    userId:"",
    price:""
}

