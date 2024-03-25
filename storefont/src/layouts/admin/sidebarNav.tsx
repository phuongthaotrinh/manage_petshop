import React from 'react';
import Link from "next/link";
import { Dot, ChevronDownIcon } from "lucide-react";
import { Navigation } from "@/types"
import { cn } from "@/lib/utils";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Icons } from "@/components/common/icon";
import { motion } from 'framer-motion';



interface NavProps {
    isCollapsed: boolean;
    links: Navigation[];
}

const Nav: React.FC<NavProps> = ({ links, isCollapsed }) => {
    const [openItems, setOpenItems] = React.useState<string[]>([]);

    const handleItemClick = (href: string) => {
        if (openItems.includes(href)) {
            setOpenItems(openItems.filter(item => item !== href));
        } else {
            setOpenItems([...openItems, href]);
        }
    };

    const renderNavItem = (item: Navigation, index: number) => {
        const Icon = item.icon ? Icons[item.icon] : null;
        return (
            <motion.div key={index}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
            >
                <div
                    className={cn(
                        "flex items-center gap-2 px-2 p-1.5 cursor-pointer"
                    )}
                    onClick={() => handleItemClick(item.href || "")}

                >
                    <div className="flex gap-2 items-center flex-1">
                        {Icon && <Icon className="w-4 h-4" />}
                        {item?.href ? <Link href={item?.href}> {item?.title }</Link> :<span> {item.title}</span>}
                    </div>
                    {item.items && item.items.length > 0 && <ChevronDownIcon className="w-4 h-4" />}
                </div>
                {(openItems.includes(item.href || "")) && item.items && (
                    <div className="pl-4">
                        {renderNavItems(item.items)}
                    </div>
                )}
            </motion.div>
        );
    };

    const renderNavItems = (items: Navigation[]) => {
        return items.map((item, index) => (
            <React.Fragment key={index}>
                {renderNavItem(item, index)}
            </React.Fragment>
        ));
    };

    return (
        <div className="w-full space-y-3" data-collapsed={isCollapsed}>
            {links.map((item, index) => {
                const Icon = item.icon ? Icons[item.icon] : null;

                return (
                    <div key={index}>
                        {isCollapsed ? (
                            <div className="space-y-5 my-5">
                                <Tooltip key={index} delayDuration={0} >
                                    <TooltipTrigger asChild>
                                        <div className="w-full grid place-items-center ">
                                            {item.href ? (
                                                <Link href={item.href}>
                                                {/*   @ts-ignore */}
                                                    <Icon className="w-5 h-5"  />
                                                </Link>
                                            ) : (
                                               <>
                                                   {/*   @ts-ignore */}
                                                   <Icon className="w-5 h-5"  />

                                               </>
                                                )}
                                        </div>
                                    </TooltipTrigger>
                                    <TooltipContent side="right" >
                                        <div>
                                            {item.href ? <Link href={item.href} className="hover:underline">{item.title}</Link> : <span>{item.title}</span>}
                                            <div className=" grid h-auto min-h-10 w-auto px-2">
                                                {item.items && item.items.length > 0 && (
                                                    <>
                                                        {item.items.map((subItem, subIndex) => (
                                                            <div key={`${subIndex}.${subItem.title}`} className="flex gap-1 items-center space-y-2">
                                                                <Dot className="w-4 h-4" />
                                                                {subItem.href ? <Link className="hover:underline" href={subItem.href}>{subItem.title}</Link> : <span>{subItem.title}</span>}
                                                            </div>
                                                        ))}
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    </TooltipContent>
                                </Tooltip>
                            </div>
                        ) : (
                            renderNavItem(item, index)
                        )}
                    </div>
                )
            })}
        </div>
    );
};

export { Nav };
