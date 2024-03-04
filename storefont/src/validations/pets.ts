import * as z from "zod";

export const formSchema = z.object({
    name: z.string().min(2, {
        message: "Pet name must be at least 2 characters.",
    }),
    icon:z.string(),
    status:z.boolean()
});
export const formSchemaEdit = z.object({
    name: z.string().min(2, {
        message: "Pet name must be at least 2 characters.",
    }),
    icon:z.string(),
    status:z.boolean(),
    _id:z.string()
});
export const defaultPets = {
    name: "",
    icon:"",
    status:true
}
export type petsValidType = z.infer<typeof formSchema>;
export type petsEditValidType = z.infer<typeof formSchemaEdit>;
