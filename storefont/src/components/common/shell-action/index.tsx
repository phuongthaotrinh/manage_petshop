import React, { createRef } from "react";
import Link from "next/link";
import clsx from "clsx";
import { buttonVariants } from "@/components/ui/button";
import { MoveLeft } from "lucide-react";

interface IShellBack {
    type?: "link" | "action";
    href?: any;
    actionName: string;
    icon?: React.ComponentType<{ className?: string }>;
    actionVoid?: () => void;
    flex?: 'start' | undefined
}

export function ShellAction({
                                href,
                                flex,
                                actionName,
                                icon: Icon = MoveLeft,
                                type,
                                actionVoid,
                                ...props

                            }: IShellBack) {
    const isLink = type === "link" || !type;
    const buttonRef = createRef<HTMLDivElement>();
    const id = React.useId()
    const buttonProps = {
        ref: buttonRef,
        className: clsx(
            buttonVariants({
                variant: "outline",
                size: "sm",
                className: "h-8",
            })
        ),
    };

    const renderContent = (
        <>
            <Icon className="mr-2 h-4 w-4" aria-hidden="true" />
            {actionName}
        </>
    );

    return isLink && href ? (
        <Link key={id} aria-label="back" href={href} className={clsx("flex w-full space-x-1", {  "justify-end":!flex })}>
            <div {...buttonProps}>{renderContent}</div>
        </Link>
    ) : (
        <div key={id} onClick={actionVoid} className={clsx("cursor-pointer space-x-1", buttonProps.className)} {...props}>
            {renderContent}
        </div>
    );
}
