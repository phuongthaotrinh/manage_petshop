import {atomWithStorage} from "jotai/utils";
import { atom, useAtom, useSetAtom } from "jotai"
export const cartProduct = atomWithStorage("cart",[]);


export function useCart() {
    return useSetAtom(cartProduct)
}