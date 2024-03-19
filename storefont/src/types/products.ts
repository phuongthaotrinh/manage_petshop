import {ShareResponse} from "@/types/index";


//PRODUCT ATTRIBUTE

export interface Attribute {
    name: string,
    atbStt: boolean,
    slug: string,
    _id: string
}

export interface ProductAttribute extends ShareResponse {
    name: string,
    status: boolean,
    attributes:Attribute[]
}


export interface CategoryItem {
    _id: string;
    name: string;
    slug: string;
    status: boolean;
    images: string[];
    children: CategoryItem[];
}