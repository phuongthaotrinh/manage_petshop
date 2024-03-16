'use client'
import Link from "next/link"

import {cn} from "@/lib/utils"
import {buttonVariants} from "@/components/ui/button"
import {UserAuthForm} from "@/components/forms/user-auth-form"
import {useForm} from "react-hook-form";
import {ILoginForm, intialValue, signInSchema} from "@/validations/auth-form";
import {zodResolver} from "@hookform/resolvers/zod";
import {toast} from "react-hot-toast";
import {useManualLogin} from "@/actions/queries/customers";
import React from "react";
import http from '@/lib/http'
import {useRouter} from "next/navigation";
import { useQueryClient } from '@tanstack/react-query'




const authApiRequest = {
    login: (body: any ) => http.post<any>('auth/login', body),
    register: (body: any) =>
      http.post<any>('/auth/register', body),
      auth: (body: { accessToken: string, role:string }) =>
      http.post('api/auth', body, {
        baseUrl: ''
      })
  }


export default function Signin() {
    const [_, startTransition] = React.useTransition();

    const [loading, setLoading] = React.useState(false);
    const queryClient = useQueryClient();




    const router = useRouter()
    const {mutateAsync} = useManualLogin()
    const form = useForm<ILoginForm>({
        resolver: zodResolver(signInSchema),
        defaultValues:intialValue
    });


    async function onSubmit(values: ILoginForm) {
    
        if (loading) return
        setLoading(true);
        toast('loginning....')
        
    try {
        const result = await authApiRequest.login(values);
        const res = await authApiRequest.auth({ accessToken: result.payload.accessToken , role: result.payload.user.role});
        toast.sucess('login suceess, wait 3s....')

        if(res.payload) {
            if(["Customers","Guest"].includes(res.payload?.role))  router.push('/')
            else  router.push('/admin/store/info')
            
        }
       
      } catch (error: any) {
        console.log("adad", error)
      } finally {
        setLoading(false)
      }
    }    

    return (
        <>
            <div className="md:hidden">
            </div>
            <div
                className="container relative hidden h-screen min-h-[] flex-col items-center justify-center md:grid lg:max-w-none lg:grid-cols-2 lg:px-0">
                <Link
                    href="/signup"
                    className={cn(
                        buttonVariants({variant: "ghost"}),
                        "absolute right-4 top-4 md:right-8 md:top-8"
                    )}
                >
                    Register
                </Link>
                <div className="relative hidden h-full flex-col bg-muted p-10 text-white lg:flex dark:border-r">
                    <div className="absolute inset-0 bg-zinc-900"/>
                </div>
                <div className="lg:p-8">
                    <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
                        <div className="flex flex-col space-y-2 text-center">
                            <h1 className="text-2xl font-semibold tracking-tight">
                                Login
                            </h1>
                            <p className="text-sm text-muted-foreground">
                                Enter your email below to login to your account
                            </p>
                        </div>
                        <UserAuthForm mode="signin" form={form} onSubmit={onSubmit} />
                        <p className="px-8 text-center text-sm text-muted-foreground">
                            By clicking continue, you agree to our{" "}
                            <Link
                                href="/terms"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Terms of Service
                            </Link>{" "}
                            and{" "}
                            <Link
                                href="/privacy"
                                className="underline underline-offset-4 hover:text-primary"
                            >
                                Privacy Policy
                            </Link>
                            .
                        </p>
                    </div>
                </div>
            </div>
        </>
    )
}