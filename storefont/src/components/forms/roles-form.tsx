import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import * as React from "react";
import { Checkbox } from "@/components/ui/checkbox"
import { ReloadIcon } from "@radix-ui/react-icons";
import { Skeleton } from "@/components/ui/skeleton"
import { groupByPermissions } from "@/lib/helpers";



export function RolesForm({ form, onSubmit, permissions, status, createRoleStt, selectAll, setSelectAll}: any) {
    const convertPermissions = groupByPermissions(permissions);
    const [isIndeterminate, setIsIndeterminate] = React.useState<boolean>(false);
    const memoFormPermission = React.useMemo(() => {
        return form.watch("permissions")?.length
    }, [form.watch("permissions")])

    React.useEffect(() => {
        if (memoFormPermission === 0) {
            setIsIndeterminate(false);
        } else if (memoFormPermission === permissions.length) {
            setIsIndeterminate(false);
            setSelectAll(true);
        } else {
            setIsIndeterminate(true);
            setSelectAll(false);
        }
    }, [memoFormPermission, selectAll]);
    const handleSelectAll = () => {
        if (!selectAll) {
            const allPermissionIds = permissions &&  permissions?.map((permission: any) => permission._id);
            form.setValue("permissions",allPermissionIds);
        } else {
            form.setValue("permissions", []);
        }
        setSelectAll(!selectAll);
    };
    return (
        <>
            <Form {...form}  >
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="name" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    {status === "pending" && (
                        <>Loading....</>
                    )}
                    {status === "error" && (
                        <>Something went wrong....</>
                    )}
                    {status === "success" && permissions ? (
                        <FormField
                            control={form.control}
                            name="permissions"
                            render={() => (
                                <FormItem>
                                    <div className="mb-4">
                                        <FormLabel className="text-base">Permissions</FormLabel>
                                        <FormDescription>
                                            Select the permissions you want to display in the role.
                                        </FormDescription>
                                    </div>


                                    
                                    <Checkbox
                                    checked={selectAll || (isIndeterminate ? "indeterminate" : false)}
                                    // onCheckedChange={() => {
                                    //     setSelectAll(!selectAll);
                                    // }}
                                    onCheckedChange={handleSelectAll}

                                />





                                    {convertPermissions && convertPermissions?.map((i: any, j: any) => {
                                        const name = Object.keys(i) as any
                                        return (
                                            <div key={j} className="grid grid-cols-6  gap-3 items-center ">
                                                <b className="">{name}</b>
                                                <div className="col-span-5 flex items-center gap-3">{(i?.[name] as any[]) && i[name]?.map((item: any, jj: any) => {
                                                    return (
                                                        <div className="flex items-center" key={jj}>
                                                            <FormField
                                                                key={item._id}
                                                                control={form.control}
                                                                name="permissions"
                                                                render={({ field }) => {
                                                                    // @ts-ignore
                                                                    return (
                                                                        <FormItem
                                                                            key={item._id}
                                                                            className="flex flex-row items-start space-x-3 space-y-0"
                                                                        >
                                                                            <FormControl>
                                                                                <Checkbox
                                                                                    //@ts-ignore
                                                                                    checked={field.value?.includes(item._id)}
                                                                                    onCheckedChange={(checked) => {
                                                                                        return checked
                                                                                            ? field.onChange([...field.value, item._id])
                                                                                            : field.onChange(
                                                                                                field.value?.filter(
                                                                                                    (value: any) => value !== item._id
                                                                                                )
                                                                                            )
                                                                                    }}
                                                                                />
                                                                            </FormControl>
                                                                            <FormLabel className="font-normal">
                                                                                {item.perName}
                                                                            </FormLabel>
                                                                        </FormItem>
                                                                    )
                                                                }}
                                                            />
                                                        </div>
                                                    )
                                                })}</div>

                                            </div>
                                        )
                                    })}
                                    {/* {permissions.map((item:{_id:string, name:string}) => (
                                        <FormField
                                            key={item._id}
                                            control={form.control}
                                            name="permissions"
                                            render={({ field }) => {
                                                // @ts-ignore
                                                return (
                                                    <FormItem
                                                        key={item._id}
                                                        className="flex flex-row items-start space-x-3 space-y-0"
                                                    >
                                                        <FormControl>
                                                            <Checkbox
                                                                //@ts-ignore
                                                                checked={field.value?.includes(item._id)}
                                                                onCheckedChange={(checked) => {
                                                                    return checked
                                                                        ? field.onChange([...field.value, item._id])
                                                                        : field.onChange(
                                                                            field.value?.filter(
                                                                                (value:any) => value !== item._id
                                                                            )
                                                                        )
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">
                                                            {item.name}
                                                        </FormLabel>
                                                    </FormItem>
                                                )
                                            }}
                                        />
                                    ))} */}


                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    ) : null}




                    <Button type="submit"
                        disabled={createRoleStt === "pending" || status === "pending"}>
                        {createRoleStt === "pending" ? <>  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Please wait</> : "Submit"}

                    </Button>
                </form>
            </Form>


        </>
    )
}