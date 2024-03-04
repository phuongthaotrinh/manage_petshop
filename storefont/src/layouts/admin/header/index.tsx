import Image from "next/image";
import TeamSwitcher from "@/layouts/admin/header/components/team-switcher";
import {MainNav} from "@/layouts/admin/header/components/main-nav";
import {Search} from "@/layouts/admin/header/components/search";
import {UserNav} from "@/layouts/root/top-header/components/user-nav";


export function HeaderAdmin ({children}:{children:React.ReactNode}) {
    return (
        <>
            <div className=" flex-col md:flex">
                <div className="border-b">
                    <div className="flex h-16 items-center px-4">
                        <TeamSwitcher />
                        <MainNav className="mx-6" />
                        <div className="ml-auto flex items-center space-x-4">
                            <Search />
                            <UserNav />
                        </div>
                    </div>
                </div>
                <div >
                    {children}
                </div>
            </div>

        </>
    )
}
