import {UserNav} from "@/layouts/root/top-header/components/user-nav";
import {SearchHeader} from "@/layouts/root/top-header/components/search";
import {CartHeader} from "@/layouts/root/top-header/components/cart";

export default function TopHeader() {
    return (
        <div className="relative  z-[99] w-full flex justify-end p-3">
            <div className="px-2 flex items-center gap-x-4">
                <UserNav/>
                <SearchHeader/>
                <CartHeader/>

            </div>
        </div>
    )
}