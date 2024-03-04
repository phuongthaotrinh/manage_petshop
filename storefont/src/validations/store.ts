import * as z from "zod";

export const formSchema = z.object({
    name: z.string().min(5, {
        message: "Pet name must be at least 5 characters.",
    }),
    logo: z.any().optional(),
    favicon: z.any().optional(),
    status:z.boolean(),
    address: z.string().optional(),
    desc: z.string().optional(),
    map: z.string().optional(),
});

export const defaultValues = {
    name: "",
    logo:[],
    favicon:[],
    status:true,
    address: "",
    desc: "",
    map: ""
}
export type storeValidType = z.infer<typeof formSchema>;
