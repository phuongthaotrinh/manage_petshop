'use client';
import * as React from "react"
import {RolesForm} from "@/components/forms/roles-form";
import {useForm} from "react-hook-form";
import {useParams} from "next/navigation";
import {useCreateRole, useGetListPermissions} from "@/actions/queries/role&permissions";
import {toast} from "react-hot-toast";
import {formRoleCreateInit,formRoleValid,formRoleValidType} from "@/validations/roleAndPermissions";
import {zodResolver} from "@hookform/resolvers/zod";
import * as z from "zod";




export function RoleDetailTemplate ({id}:{id:any}) {
    const {data:permissions, status} = useGetListPermissions();
    const {mutateAsync, status:createRoleStt} = useCreateRole();
    const [_, startTransition] = React.useTransition()

    const [mode, setMode] = React.useState<string>("");
    const params = useParams()
    React.useEffect(() => {
        if(id === "create") setMode("create")
        else setMode("edit")
    },[id,params])

    const form = useForm({
        resolver: zodResolver(formRoleValid),
        defaultValues:formRoleCreateInit,
    })



    const onSubmit = (value:z.infer<typeof formRoleValid>) => {

                // @ts-ignore
        toast.promise((mutateAsync(value)),{
                    loading:"Creating...",
                    success:({payload}) => {
                        form.reset()
                        return payload?.message ?  payload?.message : "Create role successfully!"
                    },
                    error:(errr) => {
                        console.log("err",errr);
                        return "create role Fail"
                    }
                })


    }

    return (
          <RolesForm form={form} onSubmit={onSubmit} permissions={permissions} status={status} createRoleStt={createRoleStt}/>
    )
}