import * as z from "zod";
import { toast } from "react-hot-toast";
import axios, { AxiosError } from "axios";
import { UseFormReturn } from "react-hook-form";
import { CategoryItem } from "@/types/products";



export function formatDate(date: Date | string | number) {
    if (date) {
        return new Intl.DateTimeFormat("vi-VN", {
            month: "numeric",
            day: "numeric",
            year: "numeric",
        }).format(new Date(date))
    } else return
};


export function toSentenceCase(str: string) {
    return str
        .replace(/([A-Z])/g, " $1")
        .replace(/^./, (str) => str.toUpperCase())
}


export function catchError(err: unknown) {
    if (err instanceof z.ZodError) {
        const errors = err.issues.map((issue) => {
            return issue.message
        })
        return toast.error(errors.join("\n"))
    } else if (err instanceof AxiosError) {
        console.log("err", err)
        if (err.response) {
            const message = err.response.data.error || err.response.data.message;
            return toast.error(message)
        } else {
            let message = err.message

            return toast.error(message)
        }
    } else {
        return toast.error("Something went wrong, please try again later.")
    }
}
export function isArrayOfFile(files: unknown): files is File[] {
    const isArray = Array.isArray(files)
    if (!isArray) return false
    return files.every((file) => file instanceof File)
}

export function formatPrice(
    price: number | string,
    options: {
        currency?: "USD" | "EUR" | "GBP" | "BDT" | "VND"
        notation?: Intl.NumberFormatOptions["notation"]
    } = {}
) {
    const { currency = "VND", notation = "standard" } = options
    if (price == "undefined") return
    return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency,
        notation,
    }).format(Number(price))
}

export function formatNumber(
    number: number | string,
    options: {
        decimals?: number
        style?: Intl.NumberFormatOptions["style"]
        notation?: Intl.NumberFormatOptions["notation"]
    } = {}
) {
    const { decimals = 0, style = "decimal", notation = "standard" } = options

    return new Intl.NumberFormat("en-US", {
        style,
        notation,
        minimumFractionDigits: decimals,
        maximumFractionDigits: decimals,
    }).format(Number(number))
}


export function formatBytes(
    bytes: number,
    decimals = 0,
    sizeType: "accurate" | "normal" = "normal"
) {
    const sizes = ["Bytes", "KB", "MB", "GB", "TB"]
    const accurateSizes = ["Bytes", "KiB", "MiB", "GiB", "TiB"]
    if (bytes === 0) return "0 Byte"
    const i = Math.floor(Math.log(bytes) / Math.log(1024))
    return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${sizeType === "accurate" ? accurateSizes[i] ?? "Bytest" : sizes[i] ?? "Bytes"
        }`
}


export const setValuesOfForm = (data: any, form: UseFormReturn<any>) => {
    Object.keys(data).forEach(key => {
        form.setValue(key, data[key]);
    });
};

export function truncate(str: string, length: number) {
    return str.length > length ? `${str.substring(0, length)}...` : str
}


export function generateUniqueId() {
    const numberR = Math.floor(Math.random() * 100).toString();
    const now = Date.now()

    return `${numberR}_${now}`
}



///CART
const FREE_SHIP_MONEY = 800000



export const calcShippingFee = (userPrice: number) => {
    const a = 100 - ((FREE_SHIP_MONEY - userPrice) / FREE_SHIP_MONEY) * 100;
    const b = FREE_SHIP_MONEY - userPrice;

    return {
        needMore: b <= 0 ? 0 : formatPrice(b),
        percent: `${a}%`
    };
}


export function findParentAndCheckChildren(data: CategoryItem[] | null, idToFind: string | null): { parents: CategoryItem[], parentNames: string, hasChildren: boolean } {
    if (!data || !Array.isArray(data) || data.length === 0 || !idToFind) {
        return { parents: [], hasChildren: false, parentNames: '' };
    }
    let parentNames: string[] = [];
    let parents: CategoryItem[] = [];
    let hasChildren = false;

    function findParentHelper(items: CategoryItem[]): boolean {
        for (const item of items) {
            if (item._id === idToFind) {
                hasChildren = item.children.length > 0;
                return true;
            }
            if (item.children.length > 0) {
                if (findParentHelper(item.children)) {
                    parents.push(item);
                    parentNames.push(item.name);
                    return true;
                }
            }
        }
        return false;
    }

    findParentHelper(data);
    return { parents, hasChildren, parentNames: parentNames.join(' / ') };
}
interface PermissionItem {
    _id: string;
    name: string;
    status?: boolean;
    createdAt: string;
    updatedAt: string;
    id: string;
}

interface GroupedData {
    [key: string]: PermissionItem[];
}

interface ResponseItem {
    [key: string]: PermissionItem[];
}

export function groupByPermissions(data: PermissionItem[]): ResponseItem[] {
    const response: ResponseItem[] = [];
    const groupedData: GroupedData = {};
    if (!data) return [];

    data.forEach((item) => {
        const permissionName = item.name.split('.')[1];
        const perName = item.name.split('.')[2];
        if (!groupedData[permissionName]) {// @ts-ignore
            groupedData[permissionName] = new Set<string>();
        }// @ts-ignore
        groupedData[permissionName].add(perName);
    });

    const allPerNames = new Set<string>();
    for (const permissionName in groupedData) {
        for (const perName of groupedData[permissionName]) {
            // @ts-ignore
            allPerNames.add(perName);
        }
    }

    const sortedPerNames = Array.from(allPerNames);

    for (const permissionName in groupedData) {
        const permissionArray: (string | null)[] = [];
        for (const perName of sortedPerNames) {// @ts-ignore
            permissionArray.push(groupedData[permissionName].has(perName) ? perName : null);
        }
        const permissionItemArray = permissionArray.map((perName) => {
            const foundItem = data.find((item) => item.name.split('.')[1] === permissionName && item.name.split('.')[2] === perName);
            const newItem = {...foundItem, indentity:permissionName}
            return foundItem ? newItem : null;
        });// @ts-ignore
        // @ts-ignore
        const permissionObject: ResponseItem = {
            // @ts-ignore
            [permissionName]: permissionItemArray ,

        };
        response.push(permissionObject);
    }

    return response;
}

