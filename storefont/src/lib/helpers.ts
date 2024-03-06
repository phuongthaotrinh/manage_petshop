import * as z from "zod";
import {toast} from "react-hot-toast";
import axios, {AxiosError} from "axios";
import {UseFormReturn} from "react-hook-form";

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
        if (err.response) {
            const message = err.response.data.error || err.response.data.message;
            return toast.error(message)
        } else {
            return toast.error(err.message)
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
     if(price == "undefined") return
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
    return `${(bytes / Math.pow(1024, i)).toFixed(decimals)} ${
        sizeType === "accurate" ? accurateSizes[i] ?? "Bytest" : sizes[i] ?? "Bytes"
    }`
}


export const setValuesOfForm = (data:any, form:UseFormReturn<any>) => {
    Object.keys(data).forEach(key => {
        form.setValue(key, data[key]);
    });
};

export function truncate(str: string, length: number) {
    return str.length > length ? `${str.substring(0, length)}...` : str
}


export function generateUniqueId () {
    const numberR = Math.floor(Math.random() * 100).toString();
    const now = Date.now()

    return `${numberR}_${now}`
}
