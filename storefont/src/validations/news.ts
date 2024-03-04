import * as z from "zod";

export const newsSchema = z.object({
    name: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    images: z.array(z.string()),
    preview:z.string().min(10, {
        message: "preview must be at least 10 characters.",
    }).optional(),
    content:z.string(),
    tags:z.array(z.any()),
    status: z.boolean()
});

export type InferNews = z.infer<typeof newsSchema>;

export const intialValue = {
    name:"",
    images:[],
    tags:[],
    preview:"",
    content:"",
    status: true,
}
