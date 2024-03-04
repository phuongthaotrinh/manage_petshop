import type {Icons} from "@/components/common/icon"
import React from "react";
import { type FileWithPath } from "react-dropzone"


export interface SearchParams {
    [key: string]: string | string[] | undefined
}
export interface Option {
    label: string
    value: string
    icon?: React.ComponentType<{ className?: string }>
}

export interface DataTableSearchableColumn<TData> {
    id: keyof TData
    title: string
}

export interface DataTableFilterableColumn<TData>
    extends DataTableSearchableColumn<TData> {
    options: Option[]
}

export interface NavItem {
    title: string
    href?: string
    disabled?: boolean
    external?: boolean
    icon?: keyof typeof Icons
    label?: string
    description?: string
}

export interface NavItemWithChildren extends NavItem {
    items: NavItemWithChildren[]
}


export interface MainNavChildren {
    title: string,
    href: string,
    isSpecial?:boolean
}

export type MainNavItem = MainNavChildren;

export type SidebarNavItem = NavItemWithChildren;


export type AdminServicesType = {
    label:string,
    v:string,
    icon?: keyof typeof Icons
}

export interface ShareResponse{
    _id: string,
    updatedAt:any,
    createdAt:any,
    id:string

}

export type FileWithPreview = FileWithPath & {
    preview: string
}

interface CloudinaryResource {
    context?: {
        alt?: string;
        caption?: string;
    };
    public_id: string;
    secure_url: string;
}
