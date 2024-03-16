import * as z from "zod";

export const formSchema = z.object({
    name: z.string().min(2, {
        message: "brand name must be at least 2 characters.",
    }),
    images:z.array(z.string()),
    status:z.boolean(),
    desc:z.string()
});
export const defaultBrand = {
    name: "",
    images:[],
    status:true,
    desc:""
}

export type brandValidType = z.infer<typeof formSchema>;