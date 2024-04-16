'use client';

import * as React from "react";
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"
import {useGetScheduleList} from "@/actions/queries/schedule";

import {DataTableColumnHeader} from "@/components/common/data-table/components/column-header";
import {Badge} from "@/components/ui/badge";
import {X} from "lucide-react"
import {usePathname, useRouter} from "next/navigation";
import { ColumnDef } from "@tanstack/react-table"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox";
import {DataTableRaw} from "@/components/common/data-table/table-raw";
import {useGetAllServices} from "@/actions/queries/services";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {DotsHorizontalIcon} from "@radix-ui/react-icons";
import {CancelAlert} from "@/components/cancel-alert";

export function ScheduleShellTemplate() {
    const {data,isPending}  = useGetScheduleList();
    const {data:services, isPending: serviceStt} = useGetAllServices();
    const [selectedRowIds, setSelectedRowIds] = React.useState<number[]>([])
    const [open, setOpen]= React.useState<boolean>(false)
    const pathname = usePathname();
    const route = useRouter();
    console.log("schedule", data)




    const columns = React.useMemo<ColumnDef<any, unknown>[]>(
        () => [
            {
                id: "select",
                header: ({table}) => (
                    <Checkbox
                        checked={
                            table.getIsAllPageRowsSelected() ||
                            (table.getIsSomePageRowsSelected() && "indeterminate")
                        }
                        onCheckedChange={(value) => {
                            table.toggleAllPageRowsSelected(!!value);
                            //@ts-ignore
                            setSelectedRowIds((prev) =>
                                prev.length === data?.length ? [] : data?.map((row: { id: any }) => row.id)
                            )
                        }}
                        aria-label="Select all"
                        className="translate-y-[2px]"
                    />
                ),
                cell: ({row}) => (
                    <Checkbox
                        checked={row.getIsSelected()}
                        onCheckedChange={(value) => {
                            row.toggleSelected(!!value)
                            setSelectedRowIds((prev) =>
                                value
                                    ? [...prev, row.original.id]
                                    : prev.filter((id) => id !== row.original.id)
                            )
                        }}
                        aria-label="Select row"
                        className="translate-y-[2px]"
                    />
                ),
                enableSorting: false,
                enableHiding: false,
            },

            {
                accessorKey: "customer_phoneNumber",
                header: ({column}) => (
                    <DataTableColumnHeader column={column} title="Phone"/>
                ),
                cell: ({row}) => {
                    const id = row.original._id;
                    return (
                        <> {row.getValue("customer_phoneNumber")}  </>
                    )
                },
            },
            {
                accessorKey: "serviceData",
                header: ({column}) => (
                    <DataTableColumnHeader column={column} title="Service"/>
                ),
                cell: ({row}) => {
                    return (
                        <> <b>{row.original.pet_id.name}</b> / {row.original.serviceData.name}  </>
                    )
                },
            },
            {
                accessorKey: "services",
                filterFn: (row, id, value) => {
                    return value.includes(row.getValue(id))
                },
                header: "",
                cell: () => <></>,
                enableHiding: false,

            },
            {
                id: "service_timer",
                header: "time",
                cell: ({row}) => {
                    const data = `${row.original.dateString} ${row.original.timeString}`
                    return <>{data ? data : ""}</>
                },

            },
            {
                accessorKey: "customer_id",
                header: ({column}) => (
                    <DataTableColumnHeader column={column} title="Customer | Guest"/>
                ),
                cell: ({row}) => {
                    return (
                        <Badge variant={!row.original.customer_id ? "default" : "orange"}> {!row.original.customer_id ? "guest" : "customer"}</Badge>
                    )
                },
            },
            {
                accessorKey: "status",
                header: ({column}) => {
                    return (
                        <DataTableColumnHeader column={column} title="status"/>
                    )
                },
                cell: ({row}) =><> {row.original.status} </>
            },


            {
                id: "actions",
                cell: ({row}) => (
                    <div className="space-x-5">
                            <Button variant="link" size="icon" onClick={() => setOpen(true)}>
                                <X className="h-4 w-4" />
                            </Button>

                        {open &&
                            <CancelAlert
                                setOpen={setOpen}
                                open={open}
                                title="Reject"
                                handleOk={() => console.log("reject")}
                            />}
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <Button variant="ghost" className="h-8 w-8 p-0">
                                    <span className="sr-only">Open menu</span>
                                    <DotsHorizontalIcon className="h-4 w-4" />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                <DropdownMenuItem
                                    onClick={() => navigator.clipboard.writeText(row.original.id)}
                                >
                                    Copy payment ID
                                </DropdownMenuItem>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem>View customer</DropdownMenuItem>
                                <DropdownMenuItem>View payment details</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>

                    </div>
                ),
            },
        ],
        [data, isPending]
    )





    return (
        <>
            <div className=" h-screen p-5 rounded-md">
                {data && !isPending ? (
                    <>
                        <DataTableRaw
                            columns={columns}
                            data={data}
                            showToolbar={true}
                            searchableColumns={[
                                {
                                    id: "customer_phoneNumber",
                                    title: "Customer phone"
                                },
                            ]}
                            filterableColumns={[
                                {
                                    id: "services",
                                    title: "Services",
                                    options: (services && !serviceStt && services.length > 0) ?
                                        services?.map((i) => {
                                            return {
                                                value: i?._id.toString(),
                                                label: i?.name,
                                            }
                                        }):[]
                                }
                            ]}
                        />
                    </>
                ):<>Loading...</>}
                </div>
        </>
    )
}

