import {Form, FormControl, FormField, FormItem, FormLabel, FormMessage} from "@/components/ui/form";
import {Input} from "@/components/ui/input";
import {Button} from "@/components/ui/button";
import * as React from "react";
import {Checkbox} from "@/components/ui/checkbox"
import {ReloadIcon} from "@radix-ui/react-icons";
import {groupByPermissions} from "@/lib/helpers";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow
} from "@/components/ui/table"
import {CheckedState} from "@radix-ui/react-menu";

type CheckboxAll = "indeterminate" | true | false;

export function RolesForm({form, onSubmit, permissions, status, createRoleStt}: any) {
    const convertPermissions = groupByPermissions(permissions?.data);
    const methods = permissions?.methods;
    const countMethodValue = permissions?.countDataOfMethods

    const [isIndeterminate, setIsIndeterminate] = React.useState<boolean>(false);
    const [selectAll, setSelectAll] = React.useState<CheckboxAll>(false)
    const [chooseMethod, setChooseMethod] = React.useState<any[]>([]);
    const [checkAllDataOfMethod, setCheckAllDataOfMethod] = React.useState(false)
    const [singleCheck, setSingleCheck] = React.useState<any[]>([])


    const memoFormPermission = React.useMemo(() => {
        return form.watch("permissions")
    }, [form.watch("permissions")])

    const indeterminateValue = React.useMemo(() => {
        return memoFormPermission?.length > 0 && memoFormPermission?.length !== permissions?.data?.length;
    }, [memoFormPermission, permissions]);

    const selectAllValue = React.useMemo(() => {
        return memoFormPermission?.length === permissions?.data?.length;
    }, [memoFormPermission, permissions]);

    const singleCheckvalue = React.useMemo(() => {
        return (name: string) => {
            let status: CheckboxAll = false;
            // @ts-ignore
            const result = Object.groupBy(singleCheck, ({permissions}) => permissions);
            const transformedB: any = {};
            for (const key in result) {
                if (Object.hasOwnProperty.call(result, key)) {
                    transformedB[key] = result[key].length;
                }
            }

            if(transformedB?.[name] === undefined){
                if(chooseMethod?.includes(name) || selectAll){
                    status = true
                }else{
                    status = false
                }
            }else{
                if(transformedB?.[name] === countMethodValue?.[name]){
                    status = true
                }
                else if(transformedB?.[name] < countMethodValue?.[name]){
                    status = "indeterminate"
                }else{
                    status = false
                }
            }
            return status;
        };
    }, [singleCheck, selectAll, chooseMethod]);


    React.useEffect(() => {
        setIsIndeterminate(indeterminateValue);
        setSelectAll(selectAllValue);
    }, [memoFormPermission?.length, selectAll]);


    const handleSelectAll = () => {
        if (!selectAll) {
            const allPermissionIds = permissions && permissions?.data?.map((permission: any) => permission._id);
            form.setValue("permissions", allPermissionIds);
        } else {
            form.setValue("permissions", []);
        }
        setSelectAll(!selectAll);
    };

    React.useEffect(() => {
        let data2: (string | null)[] = [];
        chooseMethod && chooseMethod?.map((i, j) => {
            const elements = document.querySelectorAll(
                `button[data-pername="${i}"]`
            );
            elements.forEach((e) => {
                const elId = e.getAttribute("data-id");
                data2.push(elId);
            });

        });
        form.setValue("permissions", data2);
    }, [chooseMethod])


    const handleCheckSingle = (status: CheckedState, item: any) => {
        const {_id, pername} = item
        const existItem = singleCheck.find((i) => i?.value === _id);
        if (!existItem && status) {
            const newData = {
                value: _id,
                permissions: pername,
            }
            setSingleCheck([...singleCheck, newData])
        } else {
            const filterData = singleCheck.filter((i) => i.value !== _id);
            setSingleCheck(filterData)
        }
    }

    return (
        <>
            <Form {...form}  >
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="name" {...field} />
                                </FormControl>
                                <FormMessage/>
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
                                    <div
                                        className="flex items-center  space-x-2  ">
                                        <Checkbox
                                            checked={selectAll || (isIndeterminate ? "indeterminate" : false)}
                                            onCheckedChange={handleSelectAll}
                                            id="select-all"

                                        />
                                        <label
                                            htmlFor="select-all"
                                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                        >
                                            Select All
                                        </label>
                                    </div>
                                    <Table
                                        className="table w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                                        <TableHeader
                                            className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400 ">
                                            <TableRow className=" ">
                                                <TableHead></TableHead>
                                                {methods && methods?.map((i: any, j: any) => {
                                                    // @ts-ignore
                                                    const statusForSpecificName = singleCheckvalue(i) as any  ;

                                                    return (
                                                        <TableHead className="" key={j}>
                                                            <div className="grid gap-y-1.5">
                                                                {i}
                                                                <Checkbox
                                                                    id={i}
                                                                    checked={statusForSpecificName}
                                                                    onCheckedChange={(e) => {
                                                                        const existMethod = chooseMethod.find((m) => m === i);
                                                                        if (!existMethod) {
                                                                            setChooseMethod([...chooseMethod, i]);
                                                                        } else {
                                                                            const newArr = chooseMethod.filter((m) => m !== i);
                                                                            setChooseMethod(newArr);
                                                                        }
                                                                    }}
                                                                />
                                                            </div>

                                                        </TableHead>
                                                    )
                                                })}
                                            </TableRow>
                                        </TableHeader>
                                        <TableBody>
                                            {convertPermissions && convertPermissions?.map((i, j) => {
                                                const name = Object.keys(i) as any;
                                                return (
                                                    <TableRow key={`${j}.${name}`}>
                                                        <TableCell className="font-bold">{name}</TableCell>
                                                        {name && i[name]?.map((o: any, jj) => {
                                                            return (
                                                                <React.Fragment key={`${jj}.${o?._id}.${o?.name}.${j}`}>
                                                                    {o !== null ? (
                                                                        <TableCell key={`${jj}.${o?._id}.${o?.name}`}>
                                                                            <FormField
                                                                                key={o._id}
                                                                                control={form.control}
                                                                                name="permissions"
                                                                                render={({field}) => {
                                                                                    // @ts-ignore
                                                                                    return (
                                                                                        <FormItem
                                                                                            key={o._id}
                                                                                            className="flex flex-row items-start space-x-2 space-y-0 w-28 max-w-28  overflow-ellipsis truncate  "
                                                                                        >
                                                                                            <FormControl>
                                                                                                <Checkbox
                                                                                                    //@ts-ignoreP
                                                                                                    data-id={o._id}
                                                                                                    data-pername={o.pername}
                                                                                                    data-name={o.name}
                                                                                                    checked={field.value?.includes(o._id)}
                                                                                                    onCheckedChange={(checked) => {
                                                                                                        handleCheckSingle(checked, o);

                                                                                                        return checked
                                                                                                            ? field.onChange([...field.value, o._id])
                                                                                                            : field.onChange(
                                                                                                                field.value?.filter(
                                                                                                                    (value: any) => value !== o._id
                                                                                                                )
                                                                                                            )
                                                                                                    }}
                                                                                                />
                                                                                            </FormControl>

                                                                                        </FormItem>
                                                                                    )
                                                                                }}
                                                                            />
                                                                        </TableCell>
                                                                    ) : (
                                                                        <>
                                                                            <td key={jj} className="p-2">
                                                                                <Checkbox disabled={true}/>
                                                                            </td>
                                                                        </>
                                                                    )}
                                                                </React.Fragment>
                                                            )
                                                        })}


                                                    </TableRow>
                                                )


                                            })}
                                        </TableBody>
                                    </Table>
                                    <FormMessage/>
                                </FormItem>
                            )}
                        />
                    ) : null}


                    <Button type="submit" disabled={createRoleStt === "pending" || status === "pending"}>
                        {createRoleStt === "pending" ? <>  <ReloadIcon className="mr-2 h-4 w-4 animate-spin"/> Please
                            wait</> : "Submit"}
                    </Button>
                </form>
            </Form>


        </>
    )
}