"use client"

import * as React from "react"

import {cn} from "@/lib/utils"
import {Icons} from "@/components/common/icon"
import {Button} from "@/components/ui/button"
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from "@/components/ui/form"
import {Input} from "@/components/ui/input";


interface UserAuthFormProps {
    mode: 'signin' | 'signup',
    form:any,
    onSubmit:(values:any) => void
}


export function UserAuthForm({mode,form,onSubmit, ...props}: UserAuthFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);

    return (
        <>

            <div className={cn("grid gap-6")} {...props}>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)}>
                        <div className="grid gap-2">
                            <div className="grid gap-1">
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="shadcn" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({field}) => (
                                        <FormItem>
                                            <FormLabel>Password</FormLabel>
                                            <FormControl>
                                                <Input placeholder="******" {...field} />
                                            </FormControl>
                                            <FormMessage/>
                                        </FormItem>
                                    )}
                                />
                                {mode === "signup" && (
                                    <>
                                        <FormField
                                            control={form.control}
                                            name="verify"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Verify password</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="******" {...field} />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name="name"
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>Username</FormLabel>
                                                    <FormControl>
                                                        <Input placeholder="John Doe" {...field} />
                                                    </FormControl>
                                                    <FormMessage/>
                                                </FormItem>
                                            )}
                                        />
                                    </>
                                )}
                            </div>


                            <Button disabled={isLoading} type="submit">
                                {isLoading && (
                                    <Icons.spinner className="mr-2 h-4 w-4 animate-spin"/>
                                )}
                                Sign In with Email
                            </Button>
                        </div>
                    </form>
                </Form>




                <div className="relative">
                    <div className="absolute inset-0 flex items-center">
                        <span className="w-full border-t"/>
                    </div>
                    <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Or continue with
                  </span>
                            </div>
                        </div>

                <div className="grid space-y-1">
                    <Button variant="outline" type="button" disabled={isLoading}>
                        {isLoading ? (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin"/>
                        ) : (
                            <Icons.googleColor className="mr-2 h-4 w-4"/>
                        )}{" "}
                        GitHub
                    </Button>
                    <Button variant="outline" type="button" disabled={isLoading} className="m-0">
                        {isLoading ? (
                            <Icons.spinner className="mr-2 h-4 w-4 animate-spin"/>
                        ) : (
                            <Icons.facebookSolid className="mr-2 h-4 w-4"/>
                        )}{" "}
                        Facebook
                    </Button>
                </div>
            </div>
        </>
    )
}