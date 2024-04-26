import * as z from "zod";


export const formRoleValid = z.object({
    name: z.string().min(2, {
        message: "Role name must be at least 2 characters.",
    }),
    permissions:z.array(z.string()).nonempty({
        message: "Permissions must be at least 1 item"
    }),
    perSingle:z.array(z.any()),
});

export type formRoleValidType = z.infer<typeof formRoleValid>;

export const formRoleCreateInit = {
    name: "",
    permissions: [],
    perSingle: []
}