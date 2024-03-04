'use client'

import {FormItems} from "@/components/forms/product-new";
import {TableCell,TableRow, TableHeader,TableHead,TableBody, Table} from "@/components/ui/table"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {Button} from "@/components/ui/button";
import {MoreVertical, Trash} from "lucide-react";
import * as React from "react";
import {FileEdit} from 'lucide-react';

interface ITableAddProductVariant {
    data:FormItems['productVariants'],
    setPdAttrOpen:React.Dispatch<React.SetStateAction<boolean>>,
    setDataCreateEdit:(value:any) => void
}

export function TableAddProductVariant ({data,setPdAttrOpen, setDataCreateEdit}: ITableAddProductVariant){
    return (
        <>
            {data?.length > 0 && (
                <>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Name</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Inventory</TableHead>
                                <TableHead></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data?.map((i, j) => (
                                <TableRow key={j}>
                                    <TableCell className="font-medium">{i?.title || ""}</TableCell>
                                    <TableCell className="font-medium">{i?.price || ""}</TableCell>
                                    <TableCell className="font-medium">{i?.inventory_quantity}</TableCell>
                                    <TableCell>
                                        <DropdownMenu>
                                            <DropdownMenuTrigger asChild>
                                                <Button
                                                    aria-label="Open menu"
                                                    variant="ghost"
                                                >
                                                    <MoreVertical className="h-4 w-4 text-black" aria-hidden="true"/>
                                                </Button>
                                            </DropdownMenuTrigger>
                                            <DropdownMenuContent align="end">
                                                <DropdownMenuItem
                                                    onClick={() => {
                                                        setPdAttrOpen(true);
                                                        setDataCreateEdit(i)
                                                     }}
                                                >
                                                    <div className="flex cursor-pointer gap-3">
                                                        <FileEdit className="w-4 h-4 mr-2" />  Edit
                                                    </div>
                                                </DropdownMenuItem>
                                                <DropdownMenuSeparator/>
                                                <DropdownMenuItem>
                                                    <div className=" text-red-600 flex gap-3 cursor-pointer">
                                                        <Trash className="w-4 h-4 mr-2" />  Delete
                                                    </div>

                                                </DropdownMenuItem>

                                            </DropdownMenuContent>
                                        </DropdownMenu>
                                    </TableCell>
                                </TableRow>
                            ))}


                        </TableBody>

                    </Table>

                </>
            )}

        </>
    )
}